const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', verifyToken, logout);

// Login වෙච්ච ඕනම කෙනෙකුට
router.get('/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

// Admin ට විතරයි
router.get('/admin-only', verifyToken, checkRole('admin'), (req, res) => {
  res.json({ message: 'Welcome, admin!' });
});

module.exports = router;