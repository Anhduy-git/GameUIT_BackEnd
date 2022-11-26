module.exports = function CheckingFunctionHelper() {
	const checkBase64 = async (str) => {
		try {
			if (str === '' || str.trim() === '') {
				return false;
			}
			if (
				str.indexOf('data:image/png;base64') >= 0 ||
				str.indexOf('data:image/jpg;base64') >= 0 ||
				str.indexOf('data:image/jpeg;base64') >= 0
			) {
				return true;
			}
			return false;
		} catch (e) {
			console.log(e);
		}
	};

	return {
		checkBase64
	};
};
