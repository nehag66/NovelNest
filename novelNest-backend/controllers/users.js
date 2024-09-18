const users = [];

exports.getUsers = (req, res, next) => {
	res.status(200).json({
		users: [
			{
				name: 'Jonas Schmedmann',
				mobile: 8765476543,
				address: '25 Yemen Road, Yemen',
			},
			{
				name: 'Neha Goel',
				mobile: 876545344,
				address: '2456 North Avenue, Seattle',
			},
			{
				name: 'Maximillian',
				mobile: 65487655,
				address: '52 Carolina Road, North Carolina',
			},
		],
	});
};

exports.postAddUser = (req, res, next) => {
	users.push({
		name: req.body.name,
		mobile: req.body.mobile,
		address: req.body.mobile,
	});
};
