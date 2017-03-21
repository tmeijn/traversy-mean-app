const mongoose = require('mongoose');
const bcrypt = require('bcryptjs-then');
const config = require('../config/common').config();

// User Schema

const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(v, cb) {
        User.count({email: v}, (err, count) => {
          cb(count === 0, 'Email already exists!');
        });
      }
    }
  },
  username: {
    type: String,
    required: true,
    validate: {
      validator: function(v, cb) {
        User.count({username: v}, (err, count) => {
          cb(count === 0, 'Username already exists!');
        });
      }
    }
  },
  password: {
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

// Returns a Promise with the user if found. 
module.exports.getUserById = function(id) {
  return User.findById(id).exec();
};

module.exports.getUserByUsername = function(username, callback) {
  const query = {username: username};
  User.findOne(query, callback);
};

module.exports.addUser = function(newUser) {
  return bcrypt.hash(newUser.password, 15).then(hash => {
    newUser.password = hash;
    return newUser.save();
  });
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
};