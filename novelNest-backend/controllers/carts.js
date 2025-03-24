const Cart = require('../models/cart');

// Add item to cart
exports.addToCart = async (req, res) => {
	const { novelId, quantity } = req.body;
	const userId = req.user.userId; // Extracted from JWT middleware

	try {
		let cart = await Cart.findOne({ userId });

		if (!cart) {
			cart = new Cart({ userId, items: [{ novelId, quantity }] });
		} else {
			const itemIndex = cart.items.findIndex(
				(item) => item.novelId.toString() === novelId,
			);
			if (itemIndex > -1) {
				cart.items[itemIndex].quantity += quantity;
			} else {
				cart.items.push({ novelId, quantity });
			}
		}

		await cart.save();
		res.json({ message: 'Item added to cart', cart });
	} catch (error) {
		res.status(500).json({ message: 'Error adding to cart' });
	}
};

exports.getCart = async (req, res) => {
	try {
		const cart = await Cart.findOne({ userId: req.user.userId }).populate(
			'items.novelId',
		);
		res.json(cart || { items: [] });
	} catch (error) {
		res.status(500).json({ message: 'Error fetching cart' });
	}
};

exports.updateCart = async (req, res) => {
	try {
		const { novelId, quantity } = req.body;
		const userId = req.user.userId; // Assuming user is authenticated and userId is available

		// Find the cart for the user
		let cart = await Cart.findOne({ userId });

		if (!cart) {
			return res.status(404).json({ message: 'Cart not found' });
		}
		// Find the item in the cart
		const item = cart.items.find((item) => item._id.toString() === novelId);
		if (!item) {
			return res.status(404).json({ message: 'Item not found in cart' });
		}

		// Update quantity
		item.quantity = quantity;

		// Save updated cart
		await cart.save();

		res.json({ message: 'Cart updated successfully', items: cart.items });
	} catch (error) {
		console.error('Error updating cart:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

exports.removeFromCart = async (req, res) => {
	const { novelId } = req.body;
	const userId = req.user.userId;

	try {
		const cart = await Cart.findOne({ userId });
		if (!cart) return res.status(404).json({ message: 'Cart not found' });

		cart.items = cart.items.filter(
			(item) => item._id.toString() !== novelId,
		);
		await cart.save();

		res.json({ message: 'Item removed from cart', cart });
	} catch (error) {
		res.status(500).json({ message: 'Error removing item' });
	}
};
