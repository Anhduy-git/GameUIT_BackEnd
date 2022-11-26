const express = require('express');
const { OrderController } = require('../controllers');

module.exports = function orderRouter() {
	const router = new express.Router();
	const orderController = new OrderController();

	router
		.route('/')
		.get(orderController.getOrders)
		.post(orderController.createOrder);

	return router;
};
