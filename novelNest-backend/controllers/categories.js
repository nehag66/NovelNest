const Category = require('../models/category');
const categories = [];

exports.getCategories = (req, res, next) => {
	res.status(200).json({ categories: ['fantasy', 'romance', 'sci-fi'] });
};

exports.postAddCategory = (req, res, next) => {
	Category.push({
		categoryName: req.body.title,
	});
};
