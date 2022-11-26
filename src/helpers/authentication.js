const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');

module.exports = function AuthHelper() {
	const compareHashing = async (password, hashedPassword) => {
		const valid = await bcrypt.compare(password, hashedPassword);
		return valid;
	};

	return {
		compareHashing
	};
};
