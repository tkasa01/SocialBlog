/**
 * Created by tkasa on 11/04/2018.
 */
const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs');
    config = require('../config/database');
const UserSchema = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});
const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback)
};
module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback).lean();
};
module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            if(err) throw err;
        newUser.password = hash;
        newUser.save(callback)
        })
    })
};
module.exports.comparePasswords = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) throw err;
        callback(null,isMatch);
    })
};