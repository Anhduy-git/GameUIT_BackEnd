const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	user: {
		type: {
			id: mongoose.Schema.Types.ObjectId,
			isAdmin: Boolean,
			name: String,
			email: String,
			address: String
		},
		required: true
	},
	description: {
		type: String,
		required: true
	},
	orderStatus: {
		type: Number,
		required: true
	},
	orderDate: {
		type: Date,
		default: Date.now
	},
	deliveryDate: {
		type: Date,
		required: true
	}
});

module.exports = mongoose.model('Order', orderSchema);
