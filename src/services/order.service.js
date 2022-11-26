const moment = require('moment');
const { UnauthorizedError } = require('../utils/errors');
const {
	OrderRepository,
	UserRepository
} = require('../database/mongo/repositories');

module.exports = function AuthService() {
	this.orderRepository = new OrderRepository();
	this.userRepository = new UserRepository();

	const createOrder = async (orderData) => {
		const { user, description, orderStatus, orderDate, deliveryDate } =
			orderData;
		const formattedOrderDate = moment(orderDate, 'DD/MM/YYYY').toDate();
		const formattedDeliveryDate = moment(deliveryDate, 'DD/MM/YYYY').toDate();

		await this.orderRepository.createOrder({
			user,
			description,
			orderStatus,
			orderDate: formattedOrderDate,
			deliveryDate: formattedDeliveryDate
		});
	};

	const getOrders = async (userId, pagination) => {
		const user = await this.userRepository.getUserById(userId);
		if (!user) {
			throw new UnauthorizedError('User not exists!');
		}
		const orders = await this.orderRepository.getOrdersByUserId(
			userId,
			pagination
		);
		return orders;
	};

	return {
		createOrder,
		getOrders
	};
};
