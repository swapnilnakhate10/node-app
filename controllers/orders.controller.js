let express = require('express');
let log4js = require("log4js");
let ordersService = require('../services/orders.service');

const logger = log4js.getLogger("Orders Controller");

module.exports = {
    addUpdateOrder : addUpdateOrder,
    getOrdersOfTable : getOrdersOfTable,
    submitTableBill : submitTableBill,
    getTodaysOrders : getTodaysOrders,
    getDatewiseOrders : getDatewiseOrders,
    getAllTables : getAllTables
};

function addUpdateOrder(req, res) {
  logger.debug("Inside createOrder");
  let orderDetails = req.body;
  ordersService.addUpdateOrder(orderDetails, (err, result) => {
    if(err) {
      logger.error("Create Order : "+err);
      res.status(500).send(err);
    } else {
      logger.debug("Success update Order : "+result);
      res.status(200).send(result);
    }
  });
}

function getOrdersOfTable(req, res) {
  logger.debug("Inside List Orders");
  let tableNumber = req.params.tableId;
  ordersService.getOrdersOfTable(tableNumber, (err, result) => {
    if(err) {
      logger.error("Get Orders of Table : "+err);
      res.status(500).send(err);
    } else {
      logger.debug("Success for tables Orders : "+tableNumber);
      res.status(200).send(result);
    }
  });
}

function submitTableBill(req, res) {
  logger.debug("Inside List Orders");
  let tableNumber = req.params.tableId;
  let paymentMode = req.body.paymentMode;
  ordersService.submitTableBill(tableNumber, paymentMode, (err, result) => {
    if(err) {
      logger.error("Error Submit bill for Table : "+err);
      res.status(500).send(err);
    } else {
      logger.debug("Success Submit bill for Table : "+tableNumber);
      res.status(200).send(result);
    }
  });
}

function getTodaysOrders(req, res) {
  logger.debug("Inside getTodaysOrders");
  ordersService.getTodaysOrders((err, result) => {
    if(err) {
      logger.error("Get getTodaysOrders : "+err);
      res.status(500).send(err);
    } else {
      logger.debug("Success getTodaysOrders ");
      res.status(200).send(result);
    }
  });
}

function getDatewiseOrders(req, res) {
  logger.debug("Inside get Datewise Orders");
  let date = req.body.date;
  ordersService.getDatewiseOrders(date, (err, result) => {
    if(err) {
      logger.error("Get getDatewiseOrders : "+err);
      res.status(500).send(err);
    } else {
      logger.debug("Success getDatewiseOrders");
      res.status(200).send(result);
    }
  });
}

function getAllTables(req, res) {
  logger.debug("Inside get All Tables");
  ordersService.getAllTables((err, result) => {
    if(err) {
      logger.error("Get All Tables : "+err);
      res.status(500).send(err);
    } else {
      logger.debug("Success All Tables");
      res.status(200).send(result);
    }
  });
}
