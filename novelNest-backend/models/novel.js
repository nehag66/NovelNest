const mongoose = require('mongoose');

const novelSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
	},
	totalQuantity: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	author: {
		type: String,
	},
	bookCondition: {
		type: String,
	},
	images: [String] // Array of Base64 images
});

const Novels = mongoose.model('Novel', novelSchema);

module.exports = Novels;
