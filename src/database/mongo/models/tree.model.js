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
		type: Number,
		min: 0,
		max: 2
	},
	leafType: {
		type: Number,
		min: 0,
		max: 2
	},
	flowerColor: {
		type: Number,
		min: 0,
		max: 4
	},
	habitat: {
		type: Number,
		min: 0,
		max: 2
	},
	irrigationMode: {
		type: Number,
		min: 0,
		max: 2
	},
	direction: {
		type: Number,
		min: 0,
		max: 3
	},
	hasFlower: {
		type: Boolean
	},
	careLevel: {
		type: Number,
		min: 0,
		max: 2
	},
	sunLevel: {
		type: Number,
		min: 0,
		max: 2
	},
	treeSize: {
		type: Number,
		min: 0,
		max: 2
	},
	lifeTime: {
		type: Number,
		min: 0,
		max: 2
	},
	temperature: {
		type: Number,
		min: 0,
		max: 2
	},
	humidity: {
		type: Number,
		min: 0,
		max: 2
	},
	priceMin: {
		type: Number
	},
	priceMax: {
		type: Number
	},
	sellLocation: {
		type: String
	},
	matchingRooms: {
		type: [
			{
				image: String,
				direction: Number,
				roomType: Number,
				roomSizeType: Number,
				roomVentilationLevel: Number,
				temperature: Number,
				humidity: Number
			}
		],
		required: true
	}
});

module.exports = mongoose.model('Tree', treeSchema);
