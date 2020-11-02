const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    tableNumber : {
        type: Number,
        required : true
    },
    tableOrders : {
        type : Array
    },
    totalBill : {
        type: Number,
        default : 0
    },
    createdBy : {
        type : String
    },
    status : {
        type : String,
        default : "Available"
    }
});

module.exports = mongoose.model('Order', userSchema);