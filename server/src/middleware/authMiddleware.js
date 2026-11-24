const supabase = require('../config/supabaseClient');

// Token එක verify කරලා req.user set කරනවා
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const { data, error } = await supabase.auth.getUser(token);
        if (error || !data.user) {
      console.log('verifyToken error:', error && error.message);
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
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Role check: checkRole('admin') හෝ checkRole('admin', 'system_manager')
const checkRole = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.user_type)) {
    return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
  }
  next();
};

module.exports = { verifyToken, checkRole };