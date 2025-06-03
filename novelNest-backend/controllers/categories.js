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

exports.postAddCategory = async (req, res, next) => {
	try {
		const { title } = req.body;

		if (!title) {
			return res.status(400).json({ message: 'Category name is required' });
		}

		const existing = await Category.findOne({ name: title });
		if (existing) {
			return res.status(409).json({ message: 'Category already exists' });
		}

		const category = new Category({ name: title });
		await category.save();

		const allCategories = await Category.find();

		res.status(201).json({
			message: 'Category added successfully',
			categories: allCategories,
		});
	} catch (error) {
		res.status(500).json({ message: 'Server error', error: error.message });
	}
};

