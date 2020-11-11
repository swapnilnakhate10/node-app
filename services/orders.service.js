let express = require('express');
const config = require('config');
let log4js = require("log4js");
let ordersDao = require('../dao/orders.dao');
const logger = log4js.getLogger("Orders Service");
logger.debug("Order Service Initiated");

module.exports = {
    addUpdateOrder : addUpdateOrder,
    getOrdersOfTable : getOrdersOfTable,
    submitTableBill : submitTableBill,
    getTodaysOrders : getTodaysOrders
};

async function addUpdateOrder(orderDetails, callback) {
    logger.debug("addUpdateOrder Initiated");
    let tableNumber = orderDetails.tableNumber;
    let findTableQuery = { tableNumber : tableNumber, status : { $ne: "PAID" } };
    let findTableDetails = await ordersDao.findOne(findTableQuery);
    if(findTableDetails && findTableDetails._id) {
        logger.debug("Updating order for table No. "+tableNumber);
        let updatedData = { $set : orderDetails };
        let updatedOrders = await ordersDao.findOneAndUpdate(findTableQuery, updatedData);
        if(updatedOrders) {
            logger.debug("Order updated successfully for "+tableNumber);
            callback(null, { message : "Order updated successfully" });
        } else {
            logger.error("Failed to update order : "+tableNumber);
            callback({ message : "Failed to updated Order." }, null);
        }
    } else {
        let createdOrders = await ordersDao.insertOne(orderDetails);
        if(createdOrders) {
            logger.debug("Order created successfully for "+tableNumber);
            callback(null, { message : "Order added successfully" });
        } else {
            logger.error("Failed to create order : "+tableNumber);
            callback({ message : "Failed to create Order." }, null);
        }  
    }
}

async function getOrdersOfTable(tableNumber, callback) {
    logger.debug("get Orders Of Table Initiated");
    let findTableQuery = { tableNumber : tableNumber, status : { $ne: "PAID" } };
    let updatedOrders = await ordersDao.findOne(findTableQuery);
    if(updatedOrders && updatedOrders._id) {
        logger.debug("get Orders Of Table success : "+tableNumber);
        callback(null, updatedOrders);
    } else {
        logger.error("Error getting Orders for Table "+tableNumber);
        callback(updatedOrders, null);
    }
}

async function submitTableBill(tableNumber, paymentMode, callback) {
    logger.debug("get Orders Of Table Initiated");
    let findTableQuery = { tableNumber : tableNumber, status : { $ne: "PAID" } };
    let tableOrders = await ordersDao.findOne(findTableQuery);
    if(tableOrders && tableOrders._id) {
        logger.debug("get Orders Of Table success : "+tableNumber);
        let tableQuery = { _id : tableOrders._id }
        let updatedData = { $set : { status : "PAID" , paymentMode : paymentMode} };
        let updatedOrders = await ordersDao.findOneAndUpdate(tableQuery, updatedData);
        if(updatedOrders) {
            logger.debug("Bill paid for "+tableNumber);
            callback(null, { message : "Order updated successfully" });
        } else {
            logger.error("Failed to update order : "+tableNumber);
            callback({ message : "Failed to updated Order." }, null);
        }
    } else {
        logger.error("Error getting Orders for Table "+tableNumber);
        callback(tableOrders, null);
    }
}

async function getTodaysOrders(callback) {
    let currentDate = new Date();
    let startDate = currentDate.toLocaleDateString();
    let todaySaleQuery = { "updatedAt" : {$gte: startDate } };
    logger.debug("todaySaleQuery : ");
    logger.debug(todaySaleQuery);
    let todaySale = await ordersDao.find(todaySaleQuery);
    if(todaySale && todaySale.length > 0) {
        logger.debug("todaySale : "+todaySale.length);
        callback(null, todaySale);
    } else {
        logger.error("Error getting todaySale "+todaySale);
        callback([], null);
    }
}

