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
// Forgot password: reset link එක email එකට යවනවා
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const redirectTo = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password`;

    const { error } = await createAuthClient().auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      console.log('forgotPassword error:', error.message);
    }

    // email එක තියෙනවද නැද්ද කියලා හෙළි නොවෙන්න හැමවිටම එකම පිළිතුර
    return res.status(200).json({
      message: 'If this email is registered, a password reset link has been sent.',
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Reset password: email link එකෙන් ආපු token එකෙන් අලුත් password එක දානවා
// (verifyToken middleware එක ඉස්සරහින් ධාවනය වෙනවා, req.user ලැබෙනවා)
const resetPassword = async (req, res) => {
  const { password } = req.body;

  if (!password || password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  try {
    const { error } = await supabase.auth.admin.updateUserById(req.user.id, { password });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
module.exports = { register, login, logout, forgotPassword, resetPassword };