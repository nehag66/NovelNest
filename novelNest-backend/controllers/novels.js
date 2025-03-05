const novels = [
	{
		name: 'Powerless',
		category: 'Romance',
		quantity: 3,
		price: 300,
	},
	{
		name: 'Reckless',
		category: 'Romance',
		quantity: 2,
		price: 200,
	},
	{
		name: 'Fearless',
		category: 'Romance',
		quantity: 5,
		price: 250,
	},
	{
		name: 'Archer\'s Voice',
		category: 'Romance',
		quantity: 4,
		price: 300,
	},
	{
		name: 'The Fine Print',
		category: 'Romance',
		quantity: 9,
		price: 320,
	},
	{
		name: 'Terms and Conditions',
		category: 'Romance',
		quantity: 7,
		price: 420,
	},
	{
		name: 'The Final Offer',
		category: 'Romance',
		quantity: 10,
		price: 360,
	},
];

exports.getNovels = (req, res, next) => {
	// res.send('respond with books list');
	res.status(200).json({
		message: "Novels Fetched Successfully.",
		novels: novels,
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
