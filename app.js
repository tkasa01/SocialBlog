/**
 * Created by tkasa on 11/04/2018.
 */

const express = require('express');
const path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    config = require('./config/database');

mongoose.connect(config.database);
mongoose.connection.on('connected', function(){
    console.log('Connected to DB ' + config.database);
});

mongoose.connection.on('error', function(err, req, res){
    console.log('database error ' + err);
});

const app = express();
const users = require('./routes/user');
const port = 4000;
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


app.get('/', function(req, res){
    res.send("hey!!!");
});

app.use('/user', users);
app.listen(port, function(){
    console.log('Server started ' + port);
});
