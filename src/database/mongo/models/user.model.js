const mongoose = require('mongoose');
const validator = require('validator');
const { BadRequestError } = require('../../../utils/errors');


const userSchema = new mongoose.Schema({
	username: {
		type: String,
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

module.exports = mongoose.model('User', userSchema);
