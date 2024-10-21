const mongoose = require('mongoose');
const Category = require('./category');

const novelSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	category: {
		type: Category,
		required: true,
	},
	qty: {
		type: Number,
		required: true,
	},
});

const Novels = mongoose.model('Novels', novelSchema);

module.exports = Novels;
