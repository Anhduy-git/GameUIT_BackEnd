const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { BadRequestError } = require('../../../utils/errors');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	isAdmin: {
		type: Boolean,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (value && value !== '' && !validator.isEmail(value)) {
				throw new BadRequestError('Email is invalid');
			}
		}
	},
	address: {
		type: String,
		required: true
	}
});

// override toJSON method, call with res.send a user
userSchema.methods.toJSON = function () {
	const userObject = this.toObject();
	delete userObject.password;
	return userObject;
};

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 8);
	}

	next(); // go to save the user
});
module.exports = mongoose.model('User', userSchema);
