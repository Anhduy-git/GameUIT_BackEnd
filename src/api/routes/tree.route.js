const express = require('express');
const { TreeController } = require('../controllers');

module.exports = function dishRouter() {
	const router = new express.Router();
	const treeController = new TreeController();

	router
		.route('/')
		.get(treeController.getTrees)
		.post(treeController.createTree);
	router.route('/:id').get(treeController.getTree);

	return router;
};
