const express = require('express');
const { AuthController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

module.exports = function authRouter() {
	const router = new express.Router();
	const authController = new AuthController();

	router.route('/login').post(authController.loginUser);

	router.route('/register').post(authController.registerUser);

	router.route('/logout').get(authMiddleware, authController.logoutUser);

	return router;
};
