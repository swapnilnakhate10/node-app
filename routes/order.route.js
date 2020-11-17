let express = require('express');
let router = express.Router();
let log4js = require("log4js");
const config = require('config');
let jwt = require('express-jwt');
const logger = log4js.getLogger("Orders Routes");
// let ordersInterceptor = require('../interceptors/orders.interceptor');
let ordersController = require('../controllers/orders.controller');

logger.debug("Orders Routes Initiated");

let secrete_key = config.get('token.secret');
let audience_key = config.get('token.audience');
let issuer_key = config.get('token.issuer');

let jwtCheck = jwt({
    secret: secrete_key,
    audience: audience_key,
    issuer: issuer_key,
    algorithms: [ 'HS256' ]
});

function checkAdmin(req, res, next) {
    if(req.user) {
        if(req.user.isAdmin) {
            next();
        } else {
            res.status(401).send({ message : "Unauthorized" });
        }
    } else {
        res.status(401).send({ message : "Unauthorized" });
    }
}

router.post('/', ordersController.addUpdateOrder);

router.get('/today', ordersController.getTodaysOrders);

router.post('/datewise', ordersController.getDatewiseOrders);

router.get('/tables', ordersController.getAllTables);

router.get('/:tableId', ordersController.getOrdersOfTable);

router.put('/:tableId', ordersController.submitTableBill);

module.exports = router;
