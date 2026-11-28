const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or Secret Key missing in .env file');
}

const options = { auth: { autoRefreshToken: false, persistSession: false } };

// DB queries සඳහා (හැමවිටම secret key එකෙන්ම)
const supabase = createClient(supabaseUrl, supabaseKey, options);

// Login/Register සඳහා, හැම call එකටම අලුත් client එකක්
const createAuthClient = () => createClient(supabaseUrl, supabaseKey, options);

module.exports = supabase;
module.exports.createAuthClient = createAuthClient;