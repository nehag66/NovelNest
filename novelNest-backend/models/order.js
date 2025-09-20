const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	items: [
		{
			novelId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Novel',
				required: true,
			},
			quantity: { type: Number, required: true },
			price: { type: Number, required: true },
		},
	],
	totalAmount: { type: Number, required: true },
	status: {
		type: String,
		enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
		default: 'paid',
	},
	paymentId: { type: String },
	createdAt: { type: Date, default: Date.now },
});

const Orders = mongoose.model('Order', orderSchema);

module.exports = Orders;
