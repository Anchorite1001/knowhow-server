const express = require('express');

require('./services/passport');
const authRoutes = require('./routes/authRoutes');

//there are many projects with several express app but in this one there's only one 
const app = express();

//import and execute route handlers with the express app
// can also use require('./routes/authRoutes')(app)
authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);