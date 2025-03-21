const novels = ['Firefly Lane', 'Fly Away', 'Twisted Love', 'Twisted Fate'];

exports.getCart = (req, res, next) => {
	res.status(200).json({
		message: "Novels Fetched Successfully.",
		novels: novels,
	});
};

exports.getCheckout = (req, res, next) => {
	novels.push({
		title: req.body.title,
		category: req.body.category,
		qty: req.body.qty,
	});
};
