const { OrderService } = require('../../services');
const Response = require('../../utils/response');
const StatusCodes = require('../../utils/status-codes');

module.exports = function OrderController() {
	this.orderService = new OrderService();
	// [GET] /orders/?userId=123&page=1&limit=5
	const getOrders = async (req, res, next) => {
		try {
			const { userId } = req.query;
			const limit = parseInt(req.query.limit, 10);
			const page = parseInt(req.query.page, 10);
			const pagination = { limit, page };
			const orders = await this.orderService.getOrders(userId, pagination);
			res
				.status(StatusCodes.OK)
				.json(new Response({ status: true, content: orders }));
		} catch (err) {
			next(err);
		}
	};

	return {
		getOrders
	};
};
