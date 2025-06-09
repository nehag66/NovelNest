const Cart = require('../models/cart');
const Novel = require('../models/novel');

// Add item to cart
exports.addToCart = async (req, res) => {
	try {
		const { novelId, quantity } = req.body;
		const userId = req.user.userId;

		// Fetch the novel to check stock
		const novel = await Novel.findById(novelId);
		if (!novel) {
			return res.status(404).json({ message: 'Novel not found' });
		}

		const totalQuantity = novel.totalQuantity;

		if (totalQuantity < quantity) {
			return res.status(400).json({
				message: `Only ${totalQuantity} left in stock. You cannot add more.`,
			});
		}
		// Find the user's cart
		let cart = await Cart.findOne({ userId });

		if (!cart) {
			cart = new Cart({ userId, items: [] });
		}

		// Check if the book is already in the cart
		const cartItemIndex = cart.items.findIndex(
			(item) => item.novelId.toString() === novelId,
		);

		if (cartItemIndex > -1) {
			cart.items[cartItemIndex].quantity = quantity;
		} else {
			cart.items.push({ novelId, quantity });
		}

		await cart.save();
		// Re-fetch and populate novelId after save
		const updatedCart = await Cart.findOne({ userId }).populate(
			'items.novelId',
		);

		res.json({ message: 'Added to cart', items: updatedCart.items });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
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
		const { novel, quantity } = req.body;
		const userId = req.user.userId;

		// Find the cart for the user
		let cart = await Cart.findOne({ userId });
		console.log('novel:', novel, 'qty:', quantity);

		if (!cart) {
			return res.status(404).json({ message: 'Cart not found' });
		}
		console.log('cart===>', cart);

		// Find the item in the cart
		const item = cart.items.find(
			(item) => item.novelId.toString() === novel?.novelId?._id,
		);
		console.log('item:', item);

		if (!item) {
			return res.status(404).json({ message: 'Item not found in cart' });
		}

		// Update quantity
		item.quantity = quantity;

		// Save updated cart
		await cart.save();

		// Populate novel details
		cart = await Cart.findOne({ userId }).populate('items.novelId');
		console.log(
			'cart::====>',
			cart,
			'________________________________________',
		);

		res.json(cart);
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
			(item) => item.novelId.toString() !== novelId,
		);

		await cart.save();

		res.json({ message: 'Item removed from cart', cart });
	} catch (error) {
		res.status(500).json({ message: 'Error removing item' });
	}
};
