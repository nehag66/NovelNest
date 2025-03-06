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
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	author: {
		type: String,
	}
});

const Novels = mongoose.model('Novel', novelSchema);

module.exports = Novels;
