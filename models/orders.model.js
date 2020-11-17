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
        default : "Occupied"
    },
    paymentMode : {
        type : String,
        default : "NA"
    }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Order', userSchema);