const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config/db');
const secret = require('./config/secret');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: secret.secret, resave: true, saveUninitialized: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect(config.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check the connection and set up error handling
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Initialize Passport
require('./config/passport')();

// Include your routes
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Include your routes
const patientRoutes = require('./routes/patientRoutes');
app.use('/patient', patientRoutes);

const clinicalTestsRoutes = require('./routes/clinicalTests');
app.use('/api/clinical-tests', clinicalTestsRoutes);  // Update path

// Define port number
const port = process.env.PORT || 3000;
const host = 'group3-mapd713.onrender.com';

// Listen on the HTTP server
const serverInstance = server.listen(port, () => {
  console.log(`Server is running on http://${host}`);
});

module.exports = app;  // Export the Express app
