const express = require('express');
const router = express.Router();
const { listUsers, suspendUser, restoreUser, updateUserRole } = require('../controllers/adminController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

// මේ file එකේ ඔක්කොම routes admin ට විතරයි
router.use(verifyToken, checkRole('admin'));

router.get('/', listUsers);
router.patch('/:id/suspend', suspendUser);
router.patch('/:id/restore', restoreUser);
router.patch('/:id/role', updateUserRole);

module.exports = router;