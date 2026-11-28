const supabase = require('../config/supabaseClient');
const { createAuthClient } = require('../config/supabaseClient');

// Register
const register = async (req, res) => {
  const { name, email, password, country } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required' });
  }

  try {
    // 1. Create auth user (fresh client per call)
    const { data: authData, error: authError } = await createAuthClient().auth.signUp({
      email,
      password,
    });

    if (authError) {
      return res.status(400).json({ error: authError.message });
    }

    const userId = authData.user.id;

    // 2. Insert profile row
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: userId, name, email, country, user_type: 'tourist' }]);

    if (profileError) {
      return res.status(400).json({ error: profileError.message });
    }

    return res.status(201).json({
      message: 'Registration successful. Please check your email to verify your account.',
      userId,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // 1. Sign in (fresh client per call, so the main client keeps the secret key)
    const { data, error } = await createAuthClient().auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    // 2. Get profile info
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) {
      return res.status(400).json({ error: profileError.message });
    }

    return res.status(200).json({
      message: 'Login successful',
      session: data.session,
      user: profile,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Logout
const logout = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const { error } = await supabase.auth.admin.signOut(token);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
module.exports = { register, login, logout };