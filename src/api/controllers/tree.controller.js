const { TreeService } = require('../../services');
const Response = require('../../utils/response');
const StatusCodes = require('../../utils/status-codes');

module.exports = function TreeController() {
	this.treeService = new TreeService();
	// [POST] /trees
	const createTree = async (req, res, next) => {
		try {
			const treeData = req.body;
			await this.treeService.createTree(treeData);
			res.status(StatusCodes.OK).json(new Response({ status: true }));
		} catch (err) {
			next(err);
		}
	};

	// [GET] /trees/?page=1&limit=5
	const getTrees = async (req, res, next) => {
		try {
			const { criteria } = req.body;
			const limit = parseInt(req.query.limit, 10);
			const page = parseInt(req.query.page, 10);
			const pagination = { limit, page };
			const trees = await this.treeService.getTrees(criteria, pagination);
			res
				.status(StatusCodes.OK)
				.json(new Response({ status: true, content: trees }));
		} catch (err) {
			next(err);
		}
	};

	return {
		createTree,
		getTrees
	};
};
