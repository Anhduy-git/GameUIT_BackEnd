const express = require('express');
const authRouter = require('./authentication.route');
const customerRouter = require('./customer.route');
const freelanceCookRouter = require('./freelance-cook.route');
const shipperRouter = require('./shipper.route');
const dishRouter = require('./dish.route');
const mealRouter = require('./meal.route');
const orderRouter = require('./order.route');
const deliveryRouter = require('./delivery.route');

module.exports = () => {
	const router = express.Router();

	router.use('/auth', authRouter());
	router.use('/customers', customerRouter());
	router.use('/freelance-cooks', freelanceCookRouter());
	router.use('/shippers', shipperRouter());
	router.use('/dishes', dishRouter());
	router.use('/meals', mealRouter());
	router.use('/orders', orderRouter());
	router.use('/deliveries', deliveryRouter());

	return router;
};
