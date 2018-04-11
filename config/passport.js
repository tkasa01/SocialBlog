/**
 * Created by tkasa on 11/04/2018.
 */
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('jwt');
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done){
        User.getUserById(jwt_payload._id, function(err, user){
            if(err){
                return done(err, false)
            }
            if(user){
                 done(null, user);
            }else{
                done(null, false);
            }
        })
    }));
};
