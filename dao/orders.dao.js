let express = require('express');
let log4js = require("log4js");
let OrdersModel = require('../models/orders.model');
const logger = log4js.getLogger("Orders Dao");

module.exports = {
    insertOne : insertOne,
    findOne : findOne,
    find : find,
    findOneAndUpdate : findOneAndUpdate,
    aggregate : aggregate,
    findWithPopulate : findWithPopulate
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
    let orderDetails = await OrdersModel.findOneAndUpdate(query, updateData, options).catch((err) => {
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

async function findWithPopulate(query, fields) {
    let orderList = await OrdersModel.find(query, fields).lean().catch((err) => {
        return err;
    });
    return orderList;
}

async function aggregate(pipeline) {
    let orderList = await OrdersModel.aggregate(pipeline).catch((err) => {
        return err;
    });
    return orderList;
}
