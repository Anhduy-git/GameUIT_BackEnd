const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');

module.exports = function AuthHelper() {
	const compareHashing = async (password, hashedPassword) => {
		const valid = await bcrypt.compare(password, hashedPassword);
		return valid;
	};

	const generateAuthToken = async (userID, secret) => {
		const token = await jwt.sign({ id: userID.toString() }, secret);
		return token;
	};

	const verifyToken = async (token, secret) => {
		const valid = await jwt.verify(token, secret);
		return valid;
	};

	return {
		compareHashing,
		generateAuthToken,
		verifyToken
	};
};
