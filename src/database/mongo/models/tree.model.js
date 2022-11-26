const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	image: {
		type: String
	},
	treeType: {
		type: Number
	},
	leafType: {
		type: Number
	},
	habitat: {
		type: Number
	},
	irrigationMode: {
		type: Number
	},
	direction: {
		type: Number
	},
	hasFlower: {
		type: Number
	},
	careLevel: {
		type: Number
	},
	sunLevel: {
		type: Number
	},
	treeSize: {
		type: Number
	},
	lifeTime: {
		type: Number
	},
	temperature: {
		type: Number
	},
	humidity: {
		type: Number
	},
	priceMin: {
		type: Number
	},
	priceMax: {
		type: Number
	},
	sellLocation: {
		type: String
	}
});

module.exports = mongoose.model('Tree', treeSchema);
