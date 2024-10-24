const novels = [];

exports.getNovels = (req, res, next) => {
	// res.send('respond with books list');
	res.status(200).json({
		novels: [
			{
				name: 'Firefly Lane',
				category: 'Romance',
				quantity: 3,
				price: 300,
			},
			{
				name: 'Fly Away',
				category: 'Fantasy',
				quantity: 2,
				price: 200,
			},
			{
				name: 'Twisted Love',
				category: 'Romance',
				quantity: 5,
				price: 250,
			},
			{
				name: 'Twisted Fate',
				category: 'Romance',
				quantity: 4,
				price: 300,
			},
			{
				name: 'Twisted Hate',
				category: 'Romance',
				quantity: 3,
				price: 320,
			},
		],
	});
};

exports.postAddNovel = (req, res, next) => {
	novels.push({
		title: req.body.title,
		category: req.body.category,
		quantity: req.body.quantity,
		price: req.body.price,
	});
};
