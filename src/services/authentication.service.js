const { UnauthorizedError } = require('../utils/errors');
const {
	UserRepository,
	OTPRepository,
	CustomerRepository,
	FreelanceCookRepository,
	ShipperRepository
} = require('../database/mongo/repositories');
const { SMSClient } = require('../clients');
const { AuthHelper } = require('../helpers');
const { UserConstant } = require('../constants');
const config = require('../config');

module.exports = function AuthService() {
	this.userRepository = new UserRepository();
	this.otpRepository = new OTPRepository();
	this.customerRepository = new CustomerRepository();
	this.freelanceCookRepository = new FreelanceCookRepository();
	this.shipperRepository = new ShipperRepository();
	this.authHelper = new AuthHelper();
	this.smsClient = new SMSClient();
	this.userConstant = new UserConstant();

	const loginUser = async (phoneNumber) => {
		const fullPhoneNumber = `0${phoneNumber}`;
		const user = await this.userRepository.getUserByPhoneNumber(
			fullPhoneNumber
		);
		if (!user) {
			throw new UnauthorizedError('User not exists!');
		}
		// generate otp
		const numDigits = 4;
		const otpVal = await this.authHelper.generateOTP(numDigits);
		console.log(otpVal);
		// store otp
		const otpData = {
			phoneNumber: fullPhoneNumber,
			otp: otpVal
		};
		await this.otpRepository.createOTP(otpData);

		// sens sms to users
		const body = `[Cơm Nhà Nha] OTP của bạn là: ${otpVal}`;
		const from = config.sending_phone_number; // twilio phone number
		console.log(from);
		// Format phone number
		let to = phoneNumber;
		to = `+84${to}`;
		this.smsClient.sendSMS(body, from, to);
	};

	const registerUser = async (phoneNumber) => {
		const fullPhoneNumber = `0${phoneNumber}`;
		const user = await this.userRepository.getUserByPhoneNumber(
			fullPhoneNumber
		);
		if (user) {
			throw new UnauthorizedError('User already exists!');
		}
		// generate otp
		const numDigits = 4;
		const otpVal = await this.authHelper.generateOTP(numDigits);
		console.log(otpVal);
		// store otp
		const otpData = {
			phoneNumber: fullPhoneNumber,
			otp: otpVal
		};
		await this.otpRepository.createOTP(otpData);

		// sens sms to users
		const body = `[Cơm Nhà Nha] OTP của bạn là: ${otpVal}`;
		const from = config.sending_phone_number; // twilio phone number
		console.log(from);
		// Format phone number
		let to = phoneNumber;
		to = `+84${to}`;
		this.smsClient.sendSMS(body, from, to);
	};

	const verifyOTPLogin = async (otp, phoneNumber) => {
		const otps = await this.otpRepository.getOTPs(phoneNumber);

		if (otps.length === 0) {
			throw new UnauthorizedError('Expired OTP!');
		}
		const lastOTP = otps[otps.length - 1];
		// check if otp is valid
		const isMatch = await this.authHelper.compareHashing(otp, lastOTP.otp);
		if (!isMatch) {
			throw new UnauthorizedError('Invalid OTP!');
		}
		// Login successfully, delete unecessaries otps, send token
		await this.otpRepository.deleteAllOTPs(phoneNumber);

		const user = await this.userRepository.getUserByPhoneNumber(phoneNumber);
		if (!user) {
			throw new UnauthorizedError('User not exist!');
		}
		// generate token
		const token = await this.authHelper.generateAuthToken(
			user._id,
			config.jwt_secret
		);
		// add user token
		await this.userRepository.createToken(user, token);

		// get specific user information
		if (user.userType === this.userConstant.userType.CUSTOMER) {
			const customer = await this.customerRepository.getCustomerByUserID(
				user.id
			);
			return {
				userType: this.userConstant.userType.CUSTOMER,
				customer,
				token
			};
		}
		if (user.userType === this.userConstant.userType.FREELANCE_COOK) {
			const freelanceCook =
				await this.freelanceCookRepository.getFreelanceCookByUserID(user.id);
			return {
				userType: this.userConstant.userType.FREELANCE_COOK,
				freelanceCook,
				token
			};
		}
		if (user.userType === this.userConstant.userType.SHIPPER) {
			const shipper = await this.shipperRepository.getShipperByUserID(user.id);
			return {
				userType: this.userConstant.userType.SHIPPER,
				shipper,
				token
			};
		}
		return undefined;
	};

	const verifyOTPRegister = async (otp, phoneNumber) => {
		const otps = await this.otpRepository.getOTPs(phoneNumber);

		if (otps.length === 0) {
			throw new UnauthorizedError('Expired OTP!');
		}
		const lastOTP = otps[otps.length - 1];
		// check if otp is valid
		const isMatch = await this.authHelper.compareHashing(otp, lastOTP.otp);
		if (!isMatch) {
			throw new UnauthorizedError('Invalid OTP!');
		}
		// Login successfully, delete unecessaries otps, send token
		await this.otpRepository.deleteAllOTPs(phoneNumber);

		return undefined;
	};

	const logoutUser = async (user, token) => {
		// remove token
		await this.userRepository.deleteToken(user, token);
	};

	return {
		loginUser,
		registerUser,
		verifyOTPLogin,
		verifyOTPRegister,
		logoutUser
	};
};
