const Novel = require('../models/novel');

exports.getNovels = (req, res, next) => {
	Novel.find()
		.then((novels) => {
			res.status(200).json({
				message: 'Novels Fetched Successfully.',
				novels: novels,
			});
		})
		.catch((err) => {
			console.error('Error fetching novels:', err);
			res.status(500).json({ message: 'Fetching novels failed.' });
		});
};

exports.postAddNovel = (req, res, next) => {
	const novel = new Novel({
		title: req.body.title,
		category: req.body.category,
		quantity: req.body.quantity,
		price: req.body.price,
		author: req.body.author
	});
	novel.save().then((res) => console.log(res));
	console.log(novel);
	res.status(201).json({
		message: 'Novel added successfully',
		novels: novel,
	});
};

exports.deleteNovel = (req, res, next) => {
	console.log(req.params.id);
	res.status(200).json({
		message: 'Novel deleted successfully!',
	});
};
