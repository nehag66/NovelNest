const mongoose = require('mongoose');
const Novel = require('../models/novel');
const Author = require('../models/author');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

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
		.populate('user', 'name email')
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
	try {
		let imagePaths = [];

		// If new files are uploaded, resize and save them
		if (req.files && req.files.length > 0) {
			for (const file of req.files) {
				const resizedPath = `uploads/resized-${file.filename}`;
				await sharp(file.path)
					.resize({ width: 800 }) // Resize image
					.toFile(resizedPath);

				imagePaths.push(`/${resizedPath}`);
				fs.unlinkSync(file.path); // Remove original unoptimized file
			}
		} else if (req.body.images) {
			// Use existing images passed from frontend
			imagePaths = Array.isArray(req.body.images)
				? req.body.images
				: [req.body.images];
		} else {
			return res.status(400).json({ message: 'No images provided' });
		}		
		const novel = new Novel({
			title: req.body.title,
			category: req.body.category,
			totalQuantity: req.body.totalQuantity,
			price: req.body.price,
			mrp: req.body.mrp,
			author: req.body.author,
			bookCondition: req.body.bookCondition,
			images: imagePaths,
			user: req.body.userId,
		});

		const savedNovel = await novel.save();

		await Author.findByIdAndUpdate(savedNovel.author, {
			$addToSet: { novels: savedNovel._id },
		});

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

exports.editNovel = async (req, res) => {
	try {
		let images = [];

		if (req.files && req.files.length > 0) {
			for (const file of req.files) {
				const resizedPath = `uploads/${file.filename}`;
				
				// Resize and compress the image
				await sharp(file.path)
					.resize({ width: 800, height: 600, fit: sharp.fit.inside }) // Resizing and scaling to fit
					.jpeg({ quality: 80 }) // Adjust the quality to compress (use .png for PNG files)
					.toFile(resizedPath);

				images.push(`/${resizedPath}`);

				// Remove original unoptimized file
				fs.unlinkSync(file.path);
			}
		} else if (req.body.images) {
			images = Array.isArray(req.body.images)
				? req.body.images
				: [req.body.images];
		}

		const updateData = {
			title: req.body.title,
			category: req.body.category,
			totalQuantity: req.body.totalQuantity,
			price: req.body.price,
			mrp: req.body.mrp,
			author: req.body.author,
			bookCondition: req.body.bookCondition,
			images,
			user: req.body.userId,
		};

		const updatedNovel = await Novel.findByIdAndUpdate(req.params.id, updateData, {
			new: true,
			runValidators: true,
		});

		if (!updatedNovel) {
			return res.status(404).json({ message: 'Novel not found!' });
		}

		res.status(200).json({
			message: 'Novel updated successfully!',
			updatedNovel,
		});
	} catch (error) {
		console.error('Error updating novel:', error);
		res.status(500).json({
			message: 'Error updating novel',
			error,
		});
	}
};

exports.deleteNovel = (req, res) => {
	console.log(req.params.id);
	res.status(200).json({
		message: 'Novel deleted successfully!',
	});
};
