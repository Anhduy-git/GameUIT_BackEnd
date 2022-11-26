const { Order } = require('../models');

module.exports = function OrderRepository() {
	const createOrder = async (orderData) => {
		await Order.create(orderData);
	};

	const getOrdersByUserId = async (userId, pagination) => {
		const { limit } = pagination;
		const { page } = pagination;
		const orders = await Order.find({
			'user.id': userId
		})
			.limit(limit)
			.skip(limit * (page - 1));
		return orders;
	};

	return {
		createOrder,
		getOrdersByUserId
	};
};
