const passport = require('passport');

module.exports = (app) => {
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
}