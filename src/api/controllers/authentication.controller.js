const { AuthService } = require('../../services');
const Response = require('../../utils/response');
const StatusCodes = require('../../utils/status-codes');

module.exports = function AuthController() {
	this.authService = new AuthService();
	// [POST] /auth/login
	const loginUser = async (req, res, next) => {
		try {
			const { username, password } = req.body;
			const user = await this.authService.loginUser(username, password);
			res
				.status(StatusCodes.OK)
				.json(new Response({ status: true, content: { user } }));
		} catch (err) {
			next(err);
		}
	};
	// [POST] /auth/register
	const registerUser = async (req, res, next) => {
		try {
			const userData = req.body;
			const user = await this.authService.registerUser(userData);
			res
				.status(StatusCodes.OK)
				.json(new Response({ status: true, content: { user } }));
		} catch (err) {
			next(err);
		}
	};

	return {
		loginUser,
		registerUser
	};
};
