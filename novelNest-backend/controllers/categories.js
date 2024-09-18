const categories = [];

exports.getCategories = (req, res, next) => {
	res.status(200).json({ categories: ['fantasy', 'romance', 'sci-fi'] });
};

exports.postAddCategory = (req, res, next) => {
	categories.push({
		title: req.body.title,
	});
};
