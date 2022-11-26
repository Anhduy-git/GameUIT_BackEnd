const bcrypt = require('bcryptjs');

module.exports = function AuthHelper() {
	const compareHashing = async (password, hashedPassword) => {
		const valid = await bcrypt.compare(password, hashedPassword);
		return valid;
	};

	return {
		compareHashing
	};
};
