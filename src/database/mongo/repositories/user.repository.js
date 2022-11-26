const { User } = require('../models');

module.exports = function UserRepository() {
	const createUser = async (userData) => {
		const user = await User.create(userData);
		return user;
	};

	const getUserById = async (userId) => {
		const user = await User.findOne({ _id: userId });
		return user;
	};
	const getUserByUsername = async (username) => {
		const user = await User.findOne({ username });
		return user;
	};
	return {
		createUser,
		getUserById,
		getUserByUsername
	};
};
