const { UnauthorizedError, BadRequestError } = require('../utils/errors');
const { UserRepository } = require('../database/mongo/repositories');
const { AuthHelper } = require('../helpers');

module.exports = function AuthService() {
	this.userRepository = new UserRepository();
	this.authHelper = new AuthHelper();

	const loginUser = async (username, password) => {
		const user = await this.userRepository.getUserByUsername(username);
		if (!user) {
			throw new UnauthorizedError('User not exists!');
		}
		const isValidUser = await this.authHelper.compareHashing(
			password,
			user.password
		);
		if (!isValidUser) {
			throw new UnauthorizedError('Password is wrong!');
		}
		return user;
	};

	const registerUser = async (userData) => {
		const { username } = userData;
		const checkUser = await this.userRepository.getUserByUsername(username);
		if (checkUser) {
			throw new BadRequestError('User already exists!');
		}
		const user = await this.userRepository.createUser(userData);
		return user;
	};

	return {
		loginUser,
		registerUser
	};
};
