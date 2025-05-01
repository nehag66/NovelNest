const Novel = require('../models/novel');
const path = require('path');

exports.getNovels = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const skip = (page - 1) * limit;

		const novels = await Novel.find().skip(skip).limit(limit);

		const totalNovels = await Novel.countDocuments();

		res.status(200).json({
			totalNovels,
			hasMore: skip + limit < totalNovels, // Check if more data is available
			novels,
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error fetching novels',
			error,
		});
	}
};

exports.getNovelDetails = (req, res) => {
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
			mrp: req.body.mrp,
			author: req.body.author,
			bookCondition: req.body.bookCondition,
			images: images,
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

exports.editNovel = (req, res) => {
	let images = [];
	if (req.files || req.files.length > 0) {
		images = req.files?.map((file) => `/uploads/${file.filename}`);
	}
	const updateData = {
		title: req.body.title,
		category: req.body.category,
		totalQuantity: req.body.totalQuantity,
		price: req.body.price,
		mrp: req.body.mrp,
		author: req.body.author,
		bookCondition: req.body.bookCondition,
		images: images.length ? images : req.body.images,
	};

	Novel.findByIdAndUpdate(req.params.id, updateData, {
		new: true,
		runValidators: true,
	})
		.then((updatedNovel) => {
			if (!updatedNovel) {
				return res.status(404).json({ message: 'Novel not found!' });
			}
			res.status(200).json({
				message: 'Novel updated successfully!',
				updatedNovel,
			});
		})
		.catch((error) => {
			res.status(500).json({
				message: 'Error updating novel',
				error,
			});
		});
};

exports.deleteNovel = (req, res) => {
	console.log(req.params.id);
	res.status(200).json({
		message: 'Novel deleted successfully!',
	});
};
