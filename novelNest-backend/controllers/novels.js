const Novel = require('../models/novel');
const sharp = require('sharp');

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

/* exports.getNovels = async (req, res, next) => {
    try {
        const novels = await Novel.find();
        const novelsWithConvertedImages = await Promise.all(
            novels.map(async (novel) => {
                if (novel.images && novel.images.length) {
                    const convertedImages = await Promise.all(
                        novel.images.map(async (imageBuffer) => {
                            return await sharp(imageBuffer)
                                .toFormat('jpeg')
                                .toBuffer()
                                .then((data) => `data:image/jpeg;base64,${data.toString('base64')}`);
                        })
                    );
                    return { ...novel.toObject(), images: convertedImages };
                }
                return novel;
            })
        );

        res.status(200).json({
            message: 'Novels fetched successfully!',
            novels: novelsWithConvertedImages
        });
    } catch (error) {
        res.status(500).json({ message: 'Fetching novels failed', error });
    }
}; */

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

exports.postAddNovel = (req, res, next) => {
	const novel = new Novel({
		title: req.body.title,
		category: req.body.category,
		totalQuantity: req.body.totalQuantity,
		price: req.body.price,
		author: req.body.author,
	});
	novel.save().then((res) => console.log(res));
	console.log(novel);
	res.status(201).json({
		message: 'Novel added successfully',
		novels: novel,
	});
};

/* exports.postAddNovel = (req, res, next) => {
    const images = req.files.map((file) => {
        return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    });

    const novel = new Novel({
        title: req.body.title,
        category: req.body.category,
        totalQuantity: req.body.totalQuantity,
        price: req.body.price,
        author: req.body.author,
        images: images, // Save Base64 images
    });

    novel.save()
        .then(() => {
            res.status(201).json({
                message: 'Novel added successfully!',
                novel: novel,
            });
        })
        .catch((err) => {
            console.error('Error adding novel:', err);
            res.status(500).json({ message: 'Failed to add novel' });
        });
}; */


exports.editNovel = (req, res, next) => {
	const novel = new Novel({
		title: req.body.title,
		category: req.body.category,
		totalQuantity: req.body.totalQuantity,
		price: req.body.price,
		author: req.body.author,
	});
	Novel.updateOne({ _id: req.params.id, novel }).then((res) =>
		console.log(res),
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
