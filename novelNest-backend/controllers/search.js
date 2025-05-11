const Novels = require('../models/novel');

exports.searchNovel = async (req, res) => {
	const query = req.query.query;

	if (!query) {
		return res.status(400).json({ message: 'Query parameter is required' });
	}

	try {
		const books = await Novels.find({
			title: { $regex: query, $options: 'i' }, // Case-insensitive search
		});

		res.json(books);
	} catch (error) {
		res.status(500).json({ message: 'Error searching for books' });
	}
};
