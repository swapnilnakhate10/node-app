const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true
    },
    mobileNumber : {
        type: Number,
        required : true
    },
    password : {
        type: String,
        required : true
    }
});

module.exports = mongoose.model('User', userSchema);