const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname : {
        type: String,
        required : true
    },
    lastname : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true
    },
    mobile : {
        type: Number,
        required : true
    },
    password : {
        type: String,
        required : true
    },
    isAdmin : {
        type : Boolean,
        required : true,
        default : false
    }
},{ 
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('User', userSchema);