const mongoose = require('mongoose');

const roomMatchSchema = new mongoose.Schema({
	image: {
		type: String
	},
	direction: {
		type: Number,
		required: true,
		min: 0,
		max: 3
	},
	roomType: {
		type: Number,
		required: true,
		min: 0,
		max: 1
	},
	roomSizeType: {
		type: Number,
		required: true,
		min: 0,
		max: 2
	},
	roomVentilationLevel: {
		type: Number,
		required: true,
		min: 0,
		max: 2
	},
	temperature: {
		type: Number,
		required: true,
		min: 0,
		max: 2
	},
	humidity: {
		type: Number,
		required: true,
		min: 0,
		max: 2
	},
	matchingTrees: {
		type: [
			{
				name: String,
				description: String,
				image: String,
				treeType: Number,
				leafType: Number,
				habitat: Number,
				irrigationMode: Number,
				direction: Number,
				hasFlower: Boolean,
				careLevel: Number,
				sunLevel: Number,
				treeSize: Number,
				lifeTime: Number,
				temperature: Number,
				humidity: Number,
				priceMin: Number,
				priceMax: Number,
				sellLocation: String
			}
		],
		required: true
	}
});

module.exports = mongoose.model('RoomMatch', roomMatchSchema);
