const express = require('express');
const { RoomMatchController } = require('../controllers');

module.exports = function orderRouter() {
	const router = new express.Router();
	const orderController = new OrderController();

	router.route('/').get(orderController.getOrders);

	return router;
};
