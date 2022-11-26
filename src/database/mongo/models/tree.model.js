const mongoose = require('mongoose');
const validator = require('validator');
const { BadRequestError } = require('../../../utils/errors');


const treeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	image: {
		type: String
	},
	leafType: {
		type: Number,
		required: true
	},
	habitat: {
		type: Number,
		required: true
	},
	priceMin: {
		type: Number,
		required: true		
	},
	priceMax: {
		type: Number,
		required: true		
	},
	sellLocation: {
		type: String,
		required: true		
	},
	otherProperties: {
		type: [String]
	}
});

module.exports = mongoose.model('Tree', treeSchema);
