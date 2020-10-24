let express = require('express');
let log4js = require("log4js");
let usersService = require('../services/users.service');

const logger = log4js.getLogger("Users Controller");

module.exports = {
    createUser : createUser,
    loginUser : loginUser,
    listUsers : listUsers
};

function createUser(req, res) {
  logger.debug("Inside createUser");
  let userDetails = req.body;
  usersService.createUser(userDetails, (err, result) => {
    if(err) {
      logger.error("Create User : "+err);
      res.status(500).send(err);
    } else {
      logger.debug("Success create User : "+result);
      res.status(200).send(result);
    }
  });
}

function loginUser(req, res) {
  logger.debug("Inside createUser");
  let userCredentials = req.body;
  usersService.loginUser(userCredentials, (err, result) => {
    if(err) {
      logger.error("Login User : "+err);
      res.status(500).send(err);
    } else {
      logger.debug("Success Login User : "+result);
      res.status(200).send(result);
    }
  });
}

function listUsers(req, res) {
  logger.debug("Inside List Users");
  usersService.listUsers((err, result) => {
    if(err) {
      logger.error("List Users : "+err);
      res.status(500).send(err);
    } else {
      logger.debug("Success List Users : "+result.length);
      res.status(200).send(result);
    }
  });
}