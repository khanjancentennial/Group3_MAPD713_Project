const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/users'); // Import the User model
const secret = require('./secret');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = function () {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err, null);
      });
  });

  // Local Strategy (for login)
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email', // Assuming email is used for login
    passwordField: 'password',
  }, (email, password, done) => {
    // Find a user by email
    User.findOne({ email }).select('+salt +hash')
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'User not found.' });
        }
        // Compare the entered password with the hashed password in the user document
        bcrypt.compare(password, user.hash)
          .then(isValidPassword => {
            if (!isValidPassword) {
              return done(null, false, { message: 'Incorrect password.' });
            }
            // Login successful, return the user
            return done(null, user);
          })
          .catch(err => {
            return done(err, false);
          });
      })
      .catch(err => {
        return done(err, false);
      });
  }));

  // JWT Strategy (for protected routes)
  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret.secret,
  }, (jwt_payload, done) => {
    // Find a user by the user ID in the JWT payload
    User.findById(jwt_payload._id)
      .then(user => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch(err => {
        return done(err, false);
      });
  }));
};
