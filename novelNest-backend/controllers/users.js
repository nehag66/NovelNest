const User = require('../models/user');

exports.getUsers = (req, res, next) => {
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

exports.postAddUser = (req, res, next) => {
	// users.push({
	// 	name: req.body.name,
	// 	mobile: req.body.mobile,
	// 	address: req.body.mobile,
	// });
};
