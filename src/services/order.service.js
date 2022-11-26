const { UnauthorizedError } = require('../utils/errors');
const {
	OrderRepository,
	UserRepository
} = require('../database/mongo/repositories');

module.exports = function AuthService() {
	this.orderRepository = new OrderRepository();
	this.userRepository = new UserRepository();

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
		getOrders
	};
};
