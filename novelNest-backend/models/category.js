const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
});

const Categories = mongoose.model('Category', categorySchema);

module.exports = Categories;
