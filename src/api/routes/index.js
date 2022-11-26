const express = require('express');
const authRouter = require('./authentication.route');
const orderRouter = require('./order.route');
const roomMatchRouter = require('./room-match.route');
const treeRouter = require('./tree.route');

module.exports = () => {
	const router = express.Router();

	router.use('/auth', authRouter());
	router.use('/orders', orderRouter());
	router.use('/rooms-match', roomMatchRouter());
	router.use('/trees', treeRouter());

	return router;
};
