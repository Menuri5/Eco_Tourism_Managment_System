const express = require('express');
const cors = require('cors');
const supabase = require('./config/supabaseClient');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'EcoLanka API is running' });
});

app.get('/api/test-db', async (req, res) => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    return res.status(500).json({ connected: false, error: error.message });
  }
  res.json({ connected: true, message: 'Supabase connected successfully' });
});

app.use('/api/auth', authRoutes);

module.exports = app;