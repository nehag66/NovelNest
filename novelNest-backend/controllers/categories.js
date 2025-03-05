const Category = require('../models/category');
const categories = ['fantasy', 'romance', 'sci-fi'];

exports.getCategories = (req, res, next) => {
	res.status(200).json({
		message: "All Categories Fetched Successfully.",
		categories: categories,
	});
};

exports.postAddCategory = (req, res, next) => {
	Category.push({
		categoryName: req.body.title,
	});
};
