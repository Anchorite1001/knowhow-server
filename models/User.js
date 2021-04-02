const mongoose = require('mongoose');
const { Schema } = mongoose; 

const userSchema = new Schema ({
    googleId: String
});

//load the schema back into mongoose with the name 'users'
mongoose.model('users', userSchema);