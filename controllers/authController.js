const User = require('../models/users');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');
const secret = require('../config/secret')
const bcrypt = require('bcrypt');

// create token after login

const createToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
  return jwt.sign(payload, secret.secret);
};

// register new user and check all conditions

module.exports = {
  register: async (req, res) => {
    if (req.get('Content-Type') !== 'application/json') {
      return res.status(400).json({ success: false, message: 'Content-Type header must be application/json.' });
    }

    const { firstName, lastName, email, phoneNumber, password,gender,healthcareProvider } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber || !password || gender === undefined || healthcareProvider === undefined) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email already exists.' });
      }

      // Generate the salt and hash
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      // Create the user document with only salt and hash
      const newUser = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        gender,
        healthcareProvider,
        salt,
        hash,
      });

      await newUser.save();

      res.status(201).json({ success: true, message: 'User registered successfully.' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error registering user.' });
    }
  },

  // login user and check all the conditions
  login: async (req, res) => {
    passport.authenticate('local-login', { session: false }, async (err, user, info) => {
      if (err || !user) {
        console.log(user);
        console.log(err);
        return res.status(401).json({ success: false, message: 'Login failed.' });
      }
  
      const isValidPassword = await bcrypt.compare(req.body.password, user.hash);
  
      if (!isValidPassword) {
        return res.status(401).json({ success: false, message: 'Invalid password.' });
      }
  
      const token = createToken(user);
  
      // Include user details in the response
      const userWithoutSensitiveInfo = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        healthcareProvider: user.healthcareProvider
        // Include other user details as needed
      };
  
      res.json({ success: true, token, user: userWithoutSensitiveInfo });
    })(req, res);
  },
  
  updateUserDetails: async (req, res) => {
    if (req.get('Content-Type') !== 'application/json') {
      return res.status(400).json({ success: false, message: 'Content-Type header must be application/json.' });
    }

    const userId = req.params.userId;

    const { firstName, lastName, email, phoneNumber, password, gender, healthcareProvider } = req.body;

    try {
      // Find the user by ID
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }

      // Update user details
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.email = email || user.email;
      user.phoneNumber = phoneNumber || user.phoneNumber;
      user.gender = gender !== undefined ? gender : user.gender;
      user.healthcareProvider = healthcareProvider !== undefined ? healthcareProvider : user.healthcareProvider;

      if (password) {
        // If password is provided, generate salt and hash
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        user.salt = salt;
        user.hash = hash;
      }

      await user.save();

      res.status(200).json({ success: true, message: 'User details updated successfully.' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error updating user details.' });
    }
  },


  getAllUsers: async (req, res) => {
    try {
      const allUsers = await User.find();
      res.status(200).json({ success: true, data: allUsers });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error fetching all users.' });
    }
  },

  getUserById: async (req, res) => {
    const userId = req.params.userId;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error fetching user details.' });
    }
  },

  // profile: (req, res) => {
  //   res.json({ user: req.user });
  // },
};
