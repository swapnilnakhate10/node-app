const express = require('express');
const usersRoutes = require('./users.route');
const menusRoutes = require('./menus.route');
const ordersRoutes = require('./order.route');

const router = express.Router();

router.get('/', (req, res) => res.send('Welcome to My App !!'));

router.use('/v1/users', usersRoutes);

router.use('/v1/menus', menusRoutes);

router.use('/v1/orders', ordersRoutes);

module.exports = router;