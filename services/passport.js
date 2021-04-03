const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const keys = require('../config/keys');

const User = mongoose.model('users');

// turn a user record into a token / cookie. user.id is the mongo id of this record.
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//turn a token from client side to a user record
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user)
        });
});

//passportjs-callbackURL: the address the user would be send to after they grant permission for app to use their info
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        // async query, return a promise so cannot use const for its result.
        User.findOne({ googleId: profile.id })
            .then((result) => {
                if(result) {
                    //we have already got the record of this google profile
                    //done(error object, result object)
                    done(null, result);
                } else {
                    //create a new record
                    new User({ googleId: profile.id })
                        .save()
                        .then((user) => { done(null, user) });
                }
            })
    })
);