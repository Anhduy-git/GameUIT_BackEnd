const mongoose = require('mongoose');

const roomMatchSchema = new mongoose.Schema({
	direction: {
		type: Number
	},
	sizeMin: {
		type: Number,
		required: true
	},
	sizeMax: {
		type: String
	},
	roomSizeType: {
		type: Number,
		required: true
	},
	roomVentilationType: {
		type: Number,
		required: true
	},
	temperatureMin: {
		type: Number,
		required: true
	},
	temperatureMax: {
		type: Number,
		required: true
	},
	humidityMin: {
		type: Number,
		required: true
	},
	humidityMax: {
		type: Number,
		required: true
	},
	matchingTrees: {
		type: [
			{
				name: String,
				image: String,
				leafType: Number,
				habitat: Number,
				price: Number,
				sellLocation: String,
				otherProperties: [String]
			}
		],
		required: true
	}
});

module.exports = mongoose.model('RoomMatch', roomMatchSchema);
