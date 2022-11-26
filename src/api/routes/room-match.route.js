const express = require('express');
const { RoomMatchController } = require('../controllers');

module.exports = function roomMatchRouter() {
	const router = new express.Router();
	const roomMatchController = new RoomMatchController();

	router
		.route('/')
		.get(roomMatchController.getRoomsMatch)
		.post(roomMatchController.createRoomMatch);

	return router;
};
