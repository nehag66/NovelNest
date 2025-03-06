const Category = require('../models/category');

exports.getCategories = (req, res, next) => {
	Category.find()
		.then((categories) => {
			res.status(200).json({
				message: 'Categories Fetched Successfully.',
				categories: categories,
			});
		})
		.catch((err) => {
			console.error('Error fetching categories:', err);
			res.status(500).json({ message: 'Fetching categories failed.' });
		});
};

exports.postAddCategory = (req, res, next) => {
	Category.push({
		name: req.body.title,
	});
};
