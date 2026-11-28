const supabase = require('../config/supabaseClient');

// GET /api/profile : තමන්ගේ profile එක
const getProfile = async (req, res) => {
  return res.status(200).json({ user: req.user });
};

// PUT /api/profile : තමන්ගේ profile එක update කරන්න
const updateProfile = async (req, res) => {
  // මේ fields විතරයි වෙනස් කරන්න පුළුවන් (user_type, email, id වෙනස් කරන්න බෑ)
  const allowed = ['name', 'country', 'preferences', 'avatar_url'];
  const updates = {};

  for (const key of allowed) {
    if (req.body[key] !== undefined) {
      updates[key] = req.body[key];
    }
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No valid fields to update' });
  }

  if (updates.name !== undefined && String(updates.name).trim() === '') {
    return res.status(400).json({ error: 'Name cannot be empty' });
  }

  if (updates.preferences !== undefined && !Array.isArray(updates.preferences)) {
    return res.status(400).json({ error: 'Preferences must be an array' });
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Profile updated', user: data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { getProfile, updateProfile };