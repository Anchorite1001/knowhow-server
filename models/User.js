const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema ({
    googleId: String
});

//model name, schema
mongoose.model('users', userSchema);