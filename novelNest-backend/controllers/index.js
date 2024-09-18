exports.getCategories = (req, res, next) => {
	res.status(200).json({categories: ['fantasy', 'romance', 'sci-fi']});
}
