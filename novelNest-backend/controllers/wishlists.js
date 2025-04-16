const Wishlist = require('../models/wishlist');

// Add to wishlist
exports.postWishlist = async (req, res) => {
	const { novelId } = req.body;
	const userId = req.user.userId;

	try {
		let wishlist = await Wishlist.findOne({ userId });

		if (!wishlist) {
			wishlist = new Wishlist({
				userId,
				items: [{ novelId }],
			});
		} else {
			// Ensure items array exists
			if (!Array.isArray(wishlist.items)) {
				wishlist.items = [];
			}

			// Prevent duplicate
			const alreadyExists = wishlist.items.find(
				(item) => item.novelId.toString() === novelId,
			);

			if (!alreadyExists) {
				wishlist.items.push({ novelId });
			}
		}

		await wishlist.save();
		res.json({ message: 'Added to Wishlist', wishlist: wishlist.items });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err.message });
	}
};

// Remove from wishlist
exports.removeFromWishlist = async (req, res) => {
	const { novelId } = req.body;
	const userId = req.user.userId;

	try {
		const wishlist = await Wishlist.findOne({ userId });
		if (!wishlist)
			return res.status(404).json({ msg: 'Wishlist not found' });

		wishlist.items = wishlist.items.filter(
			(item) => item.novelId.toString() !== novelId,
		);
		await wishlist.save();
		res.json(wishlist || { items: [] });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Get wishlist
exports.getWishlist = async (req, res) => {
	try {
		const wishlist = await Wishlist.findOne({
			userId: req.user.userId,
		}).populate('items.novelId');
		res.json(wishlist || { items: [] });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
