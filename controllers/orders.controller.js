let express = require('express');
let log4js = require("log4js");
let ordersService = require('../services/orders.service');

const logger = log4js.getLogger("Orders Controller");

module.exports = {
    addUpdateOrder : addUpdateOrder,
    getOrdersOfTable : getOrdersOfTable
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