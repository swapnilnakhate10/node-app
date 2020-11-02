let express = require('express');
let log4js = require("log4js");
let OrdersModel = require('../models/orders.model');
const logger = log4js.getLogger("Orders Dao");

module.exports = {
    insertOne : insertOne,
    findOne : findOne,
    find : find,
    findOneAndUpdate : findOneAndUpdate
};

async function insertOne(orderDetails) {
    let orderData = new OrdersModel(orderDetails);
    let newOrder = await orderData.save().catch((err) => {
        return err;
    });
    return newOrder;
}

async function findOne(query) {
    let orderDetails = await OrdersModel.findOne(query).catch((err) => {
        return err;
    });
    return orderDetails;
}

async function findOneAndUpdate(query, updateData) {
    let options = { new : true };
    let orderDetails = await OrdersModel.findOne(query, updateData, options).catch((err) => {
        return err;
    });
    return orderDetails;
}

async function find(query) {
    let orderList = await OrdersModel.find(query).catch((err) => {
        return err;
    });
    return orderList;
}
