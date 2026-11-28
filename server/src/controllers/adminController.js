const supabase = require('../config/supabaseClient');

const VALID_ROLES = ['tourist', 'admin', 'system_manager'];
const FIELDS = 'id, name, email, country, user_type, is_active, created_at';

// GET /api/admin/users?search=&role=&status=&page=&limit=
const listUsers = async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const { search, role, status } = req.query;

  try {
    let query = supabase
      .from('profiles')
      .select(FIELDS, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);

    if (search) {
      // filter string එක කැඩෙන්න බැරි වෙන්න special characters ඉවත් කරනවා
      const safe = String(search).replace(/[%,()]/g, '').trim();
      if (safe) query = query.or(`name.ilike.%${safe}%,email.ilike.%${safe}%`);
    }
    if (role) query = query.eq('user_type', role);
    if (status === 'active') query = query.eq('is_active', true);
    if (status === 'suspended') query = query.eq('is_active', false);

    const { data, count, error } = await query;
    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json({ users: data, total: count, page, limit });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Suspend / Restore (එකම logic, is_active විතරයි වෙනස්)
const setUserStatus = (isActive) => async (req, res) => {
  const { id } = req.params;

  if (id === req.user.id) {
    return res.status(400).json({ error: 'You cannot change your own account status' });
  }

  try {
    const { data: target } = await supabase
      .from('profiles').select('id').eq('id', id).maybeSingle();
    if (!target) return res.status(404).json({ error: 'User not found' });

    // Supabase Auth එකේත් block කරනවා (login/refresh කරන්න බැරි වෙන්න)
    const { error: authError } = await supabase.auth.admin.updateUserById(id, {
      ban_duration: isActive ? 'none' : '876000h',
    });
    if (authError) return res.status(400).json({ error: authError.message });

    const { data, error } = await supabase
      .from('profiles')
      .update({ is_active: isActive })
      .eq('id', id)
      .select(FIELDS)
      .single();
    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json({
      message: isActive ? 'User restored' : 'User suspended',
      user: data,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// PATCH /api/admin/users/:id/role  body: { "user_type": "admin" }
const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { user_type } = req.body || {};

  if (!VALID_ROLES.includes(user_type)) {
    return res.status(400).json({ error: `user_type must be one of: ${VALID_ROLES.join(', ')}` });
  }
  if (id === req.user.id) {
    return res.status(400).json({ error: 'You cannot change your own role' });
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ user_type })
      .eq('id', id)
      .select(FIELDS)
      .maybeSingle();

    if (error) return res.status(400).json({ error: error.message });
    if (!data) return res.status(404).json({ error: 'User not found' });

    return res.status(200).json({ message: 'Role updated', user: data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  listUsers,
  suspendUser: setUserStatus(false),
  restoreUser: setUserStatus(true),
  updateUserRole,
};