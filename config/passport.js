const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
//const passport = require('passport');

const User = require('../models/user');
const config = require('../config/common').config();

module.exports = function(passport) {
  
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;

  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.getUserById(jwt_payload._doc._id).then(user => {
      if(user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }).catch(err => {
      if(err) {
        return done(err, false);
      }

    });
  }));
};
