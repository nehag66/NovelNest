const User = require('../models/user');

exports.getUsers = (req, res) => {
	User.find()
		.then((users) => {
			res.status(200).json({
				message: "Users Fetched Successfully.",
				users: users,
			});
		})
		.catch((err) => {
			console.error('Error fetching users:', err);
			res.status(500).json({ message: 'Fetching users failed.' });
		});
};

exports.getUserDetails = (req, res) => {
	User.findById(req.params.id)
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
