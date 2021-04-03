const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/User');
require('./services/passport');
const keys = require('./config/keys');
const authRoutes = require('./routes/authRoutes');


mongoose.connect(keys.mongoURL),
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    };

//there are many projects with several express app but in this one there's only one 
const app = express();

app.use(
    cookieSession({
        // how long cookie would be stored. calculate in millsecond.
        maxAge: 30 * 24 * 60 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

//import and execute route handlers with the express app
// can also use require('./routes/authRoutes')(app)
authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);