const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

module.exports.getUserById = function(id) {
  return User.findById(id).exec();
};

module.exports.getUserByUsername = function(username, callback) {
  const query = {username: username};
  User.findOne(query, callback);
};

module.exports.addUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
};