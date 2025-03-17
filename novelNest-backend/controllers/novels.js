const Novel = require('../models/novel');
const path = require('path');

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

exports.getNovelDetails = (req, res, next) => {
	Novel.findById(req.params.id)
		.then((novel) => {
			res.status(200).json({
				message: 'Novel Fetched Successfully.',
				novel: novel,
			});
		})
		.catch((err) => {
			console.error('Error fetching novel:', err);
			res.status(500).json({ message: 'Fetching novel failed.' });
		});
};

exports.postAddNovel = async (req, res) => {
	console.log('Files received:', req.files);
	try {
		if (!req.files || req.files.length === 0) {
			return res.status(400).json({ message: 'No images uploaded' });
		}
		// Get image file paths
		const images = req.files?.map((file) => `/uploads/${file.filename}`);

		// Create a new novel entry
		const novel = new Novel({
			title: req.body.title,
			category: req.body.category,
			totalQuantity: req.body.totalQuantity,
			price: req.body.price,
			author: req.body.author,
			bookCondition: req.body.bookCondition,
			images: images, // Store file paths in MongoDB
		});

		await novel.save();
		res.status(201).json({ message: 'Novel added successfully!', novel });
	} catch (error) {
		console.error('Error saving novel:', error);
		res.status(500).json({ message: 'Error adding novel' });
	}
};

// Serve images statically
exports.getImage = (req, res) => {
	const filename = req.params.filename;
	const filePath = path.join(__dirname, '../uploads', filename);

	res.sendFile(filePath, (err) => {
		if (err) {
			res.status(404).json({ message: 'Image not found' });
		}
	});
};

exports.editNovel = (req, res, next) => {
	const novel = new Novel({
		title: req.body.title,
		category: req.body.category,
		totalQuantity: req.body.totalQuantity,
		price: req.body.price,
		author: req.body.author,
	});
	Novel.updateOne({ _id: req.params.id, novel }).then(
		(res) => console.log(res),
		res.status(200).json({
			message: 'Novel updated successfully!',
		}),
	);
};

exports.deleteNovel = (req, res, next) => {
	console.log(req.params.id);
	res.status(200).json({
		message: 'Novel deleted successfully!',
	});
};
