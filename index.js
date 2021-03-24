const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//there are many projects with several express app but in this one there's only one 
const app = express();

passport.use(new GoogleStrategy());

//route handler
app.get('/', (req, res) => {
    res.send({ hi:'there' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);