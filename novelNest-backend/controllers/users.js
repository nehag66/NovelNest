const User = require('../models/user');

exports.getUsers = (req, res) => {
	User.find()
		.then((users) => {
			res.status(200).json({
				message: 'Users Fetched Successfully.',
				users: users,
			});
		})
		.catch((err) => {
			console.error('Error fetching users:', err);
			res.status(500).json({ message: 'Fetching users failed.' });
		});
};

// sending only name, email, address and mobile in response
exports.getUserDetails = (req, res) => {
	User.findById(req.params.id)
		.select('name email addresses role mobile')
		.then((user) => {
			res.status(200).json({
				message: 'User Fetched Successfully.',
				user: user,
			});
		})
		.catch((err) => {
			console.error('Error fetching user:', err);
			res.status(500).json({ message: 'Fetching user failed.' });
		});
};

exports.postAddAddress = async (req, res) => {
	try {
		const userId = req.params.id;
		const { address } = req.body; // expecting { "address": "some address string" }

		if (!address || !address.trim()) {
			return res.status(400).json({ message: 'Address is required' });
		}

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// push new address into addresses array
		user.addresses.push(address.trim());

		await user.save();

		return res.status(200).json({
			message: 'Address added successfully',
			addresses: user.addresses,
		});
	} catch (error) {
		console.error('Error adding address:', error);
		return res.status(500).json({ message: 'Server error' });
	}
};
