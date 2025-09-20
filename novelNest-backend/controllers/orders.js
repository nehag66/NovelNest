const Order = require('../models/order');
const Novel = require('../models/novel');

// Create a new order
exports.createOrder = async (req, res) => {
	try {
		const { items, totalAmount, paymentId } = req.body;
		const userId = req.user.userId;

		const newOrder = await Order.create({
			userId,
			items,
			totalAmount,
			paymentId,
			status: 'paid',
		});

		// 2. Deduct quantities from novels
		for (const item of items) {
			await Novel.findByIdAndUpdate(
				item.novelId,
				{ $inc: { totalQuantity: -item.quantity } }, // decrease stock
				{ new: true },
			);
		}

		res.status(201).json({
			message: 'Order placed successfully',
			order: newOrder,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to create order' });
	}
};

// Get all orders for a user
exports.getUserOrders = async (req, res) => {
	try {
		const userId = req.user.userId;
		const orders = await Order.find({ userId }).populate('items.novelId');
		res.json({
			message: 'Orders retrieved successfully!',
			orders,
		});
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch orders' });
	}
};
