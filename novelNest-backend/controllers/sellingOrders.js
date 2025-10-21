const Novel = require('../models/novel');

exports.getSellingOrders = (req, res, next) => {
	const userId = req.user.userId;

	Novel.find({ user: userId })
		.then((orders) => {
			res.status(200).json({
				message: 'Novels Fetched Successfully.',
				orders: orders,
			});
		})
		.catch((err) => {
			console.error('Error fetching novels:', err);
			res.status(500).json({ message: 'Fetching novels failed.' });
		});
};
