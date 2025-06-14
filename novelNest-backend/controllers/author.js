const Author = require('../models/author');

// Create an author
exports.postAddAuthor = async (req, res, next) => {
	try {
		const { name, bio } = req.body;

		if (!name) {
			return res.status(400).json({ message: 'Author name is required' });
		}

		const existing = await Author.findOne({ name });
		if (existing) {
			return res.status(409).json({ message: 'Author already exists' });
		}

		const author = new Author({ name, bio });
		await author.save();

		const allAuthors = await Author.find();

		res.status(201).json({
			message: 'Author added successfully',
			authors: allAuthors,
		});
	} catch (error) {
		res.status(500).json({ message: 'Server error', error: error.message });
	}
};

// Get all author details
exports.getAllAuthorDetails = (req, res) => {
	Author.find()
		.populate('novels')
		.then((authors) => {
			res.status(200).json({
				message: 'Authors Fetched Successfully.',
				authors: authors,
			});
		})
		.catch((err) => {
			console.error('Error fetching authors:', err);
			res.status(500).json({ message: 'Fetching authors failed.' });
		});
};

// Get all authors
exports.getAllAuthors = (req, res) => {
	Author.find({}, 'name novels')
		.populate('novels', 'title')
		.exec()
		.then((authors) => {
			res.status(200).json({
				message: 'Authors Fetched Successfully.',
				authors: authors,
			});
		})
		.catch((err) => {
			console.error('Error fetching authors:', err);
			res.status(500).json({ message: 'Fetching authors failed.' });
		});
};

// Get one author
exports.getAuthorDetails = async (req, res) => {
	try {
		const author = await Author.findById(req.params.id).populate('novels');
		if (!author) return res.status(404).send('Author not found');
		res.json(author);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Update an author
exports.editAuthor = async (req, res) => {
	try {
		const updated = await Author.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			},
		);
		if (!updated) return res.status(404).send('Author not found');
		res.json(updated);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete an author
exports.deleteAuthor = async (req, res) => {
	try {
		const deleted = await Author.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).send('Author not found');
		res.json({ message: 'Author deleted' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
