var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const horsesRouter = require('./routes/horses');
const cartRouter = require('./routes/cart')

var GitHubStrategy = require ('passport-github').Strategy;
const config = require('./config')

var app = express();

const helmet = require('helmet');
app.use((helmet()));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(session({
    secret: 'passport is awesome',
    resave: 'false',
    saveUninitialized: true,
}))

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new GitHubStrategy({
    clientID: config.passport.clientID,
    clientSecret: config.passport.clientSecret,
    callbackURL: config.passport.callbackUrl
},
function(accessToken, refreshToken, profile, cb) {
    console.log('function ran')
    console.log(profile)
    return cb(null, profile)
}))

passport.serializeUser(function(user, done) {
    done(null, user.id);
})

passport.deserializeUser(function (user, done) {
    done(null, user.id);
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/horses', horsesRouter)
app.use('/cart', cartRouter)

module.exports = app;
