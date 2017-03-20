const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');


// Config file
const common = require('./config/common');
const config = common.config();

// Server Port Number
const port = config.port || process.env.port || 3000;

// Connect to database
mongoose.connect(config.databaseURL, (err) => {
  if(err) {
    console.log('Error while connecting to database:', err.message);
  } else {
    console.log('Succesfully connected to database at', config.databaseURL)
  }
});

// Init Express Server
const app = express();

// ===========
// MIDDLEWARE
// ===========

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());



// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);



// =======
// ROUTES
// =======

// Users endpoint
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});



// Open server port
app.listen(port, () => {
  console.log('Server started on port', port);
});