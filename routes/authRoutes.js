// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const passport = require('passport');
const router = express.Router();

// define all routes for an api

router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/users/:userId', authController.updateUserDetails);
// router.get('/profile', passport.authenticate('jwt', { session: false }), authController.profile);

module.exports = router;
