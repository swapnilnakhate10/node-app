let express = require('express');
let router = express.Router();
let log4js = require("log4js");
const logger = log4js.getLogger("Users Routes");
let menuList = require('./../master-data/menu-data.json');

logger.debug("Menu Routes Initiated");

router.get('/', function(req, res) {
    res.status(200).send(menuList);
});

module.exports = router;
