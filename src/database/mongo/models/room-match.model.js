const mongoose = require('mongoose');

const roomMatchSchema = new mongoose.Schema({
	direction: {
		type: Number,
		required: true
	},
	roomType: {
		type: Number,
		required: true
	},
	roomSizeType: {
		type: Number,
		required: true
	},
	roomVentilationLevel: {
		type: Number,
		required: true
	},
	temperature: {
		type: Number,
		required: true
	},
	humidity: {
		type: Number,
		required: true
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
