// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const passport = require('passport');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
// router.get('/profile', passport.authenticate('jwt', { session: false }), authController.profile);

module.exports = router;
