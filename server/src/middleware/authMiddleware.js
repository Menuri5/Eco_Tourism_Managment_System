const supabase = require('../config/supabaseClient');

// ආරක්ෂකයා 1: token එක හරිද බලනවා
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access token required' });
  }

  // "Bearer " කොටස කපලා, අකුරු අතරේ ඇති අමතර spaces/quotes ඉවත් කරනවා
  const token = authHeader.slice(7).trim().replace(/^"|"$/g, '');

  // DEBUG: token එක හරි හැඩේටද බලන්න
  

  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data || !data.user) {
      // DEBUG: Supabase දුන්න හරි හේතුව
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError || !profile) {
      return res.status(401).json({ error: 'User profile not found' });
    }

    req.user = profile;
        if (profile.is_active === false) {
      return res.status(403).json({ error: 'Account suspended' });
    }
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ආරක්ෂකයා 2: role එක බලනවා
const checkRole = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.user_type)) {
    return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
  }
  next();
};

module.exports = { verifyToken, checkRole };