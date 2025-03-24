const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
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
			quantity: {
				type: Number,
				required: true,
				default: 1,
			},
		},
	],
});

const Carts = mongoose.model('Cart', cartSchema);

module.exports = Carts;
