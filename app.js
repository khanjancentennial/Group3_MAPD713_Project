// const express = require('express');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const flash = require('connect-flash');
// const mongoose = require('mongoose');
// const passport = require('passport');
// const config = require('./config/db'); // Import your MongoDB configuration

// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(session({ secret: 'SomeSecret', resave: true, saveUninitialized: true })); // Configure session
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());

// // Connect to MongoDB
// mongoose.connect(config.url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true, // Add this option to suppress deprecation warning
// });

// // Check the connection and set up error handling
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Initialize Passport
// require('./config/passport')();

// // Include your routes
// const authRoutes = require('./routes/authRoutes');
// app.use('/auth', authRoutes);

// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log('Server is running on port ' + port);
// });



// const express = require('express');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const flash = require('connect-flash');
// const mongoose = require('mongoose');
// const passport = require('passport');
// const config = require('./config/db'); // Import your MongoDB configuration
// const secret = require('./config/secret')

// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(session({ secret: secret, resave: true, saveUninitialized: true })); // Use the generated secret key
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());

// // Connect to MongoDB
// mongoose.connect(config.URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Check the connection and set up error handling
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Initialize Passport
// require('./config/passport')();

// // Include your routes
// const authRoutes = require('./routes/authRoutes');
// app.use('/auth', authRoutes);

// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log('Server is running on port ' + port);
// });





const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config/db'); // Import your MongoDB configuration
const secret = require('./config/secret');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: secret.secret, resave: true, saveUninitialized: true })); // Use the generated secret key
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

const port = process.env.PORT || 3000;
const host = '127.0.0.1';

const server = app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
