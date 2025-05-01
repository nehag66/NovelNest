const mongoose = require('mongoose');

const novelSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	category: {
		type: String,
		required: true,
	},
	totalQuantity: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	mrp: {
		type: Number,
		required: true,
	},
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
	bookCondition: {
		type: String,
	},
	images: [String],
});

const Novels = mongoose.model('Novel', novelSchema);

module.exports = Novels;
