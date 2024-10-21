const mongoose = require('mongoose');
const getDb = require('../util/database').getDb;

const categorySchema = new mongoose.Schema({
	categoryName: {
		type: String,
		required: true,
	},
});

const Category = mongoose.model('Categories', categorySchema);

module.exports = Category;
