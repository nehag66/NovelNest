const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
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
		},
	],
});

const Wishlists = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlists;
