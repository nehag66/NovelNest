const novels = [];

exports.getCart = (req, res, next) => {
	// res.send('respond with books list');
	res.status(200).json({
		novels: ['Firefly Lane', 'Fly Away', 'Twisted Love', 'Twisted Fate'],
	});
};

exports.getCheckout = (req, res, next) => {
	novels.push({
		title: req.body.title,
		category: req.body.category,
		qty: req.body.qty,
	});
};
