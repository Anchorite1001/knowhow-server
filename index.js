const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('./config/keys');

//there are many projects with several express app but in this one there's only one 
const app = express();

//passportjs-callbackURL: the address the user would be send to after they grant permission for app to use their info
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        console.log('access token', accessToken);
        console.log('refresh token', refreshToken);
        console.log('profile', profile);
    })
);

//route handlers
app.get('/', (req, res) => {
    res.send({ hi:'there' });
});

//ask google to give these 2 info and get a code from google if the user permit
app.get('/auth/google', 
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

// passportJS would see the code in the url and automatically exchange that with google user info
app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;
app.listen(PORT);