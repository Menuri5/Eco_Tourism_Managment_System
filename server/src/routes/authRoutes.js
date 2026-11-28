const express = require('express');
const router = express.Router();
const {
  register, login, logout, forgotPassword, resetPassword,
} = require('../controllers/authController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', verifyToken, logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', verifyToken, resetPassword);

router.get('/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

router.get('/admin-only', verifyToken, checkRole('admin'), (req, res) => {
  res.json({ message: 'Welcome, admin!' });
});

module.exports = router;