const users = [
	{
		name: 'Liam Mclaren',
		mobile: 8765476543,
		address: 'McLaren Residence, 7 Kensington Grove, Kensington, London W8 5LN, United Kingdom',
	},
	{
		name: 'Kai Azer',
		mobile: 876545344,
		address: 'The Hidden Outpost, 22 Emberfall Path, Outskirts of Lowtown, Ilya, Kingdom of Ilya',
	},
	{
		name: 'Zade Meadows',
		mobile: 965487655,
		address: 'Blackthorne Estate, 666 Revenant Lane, Raven\'s Hollow, Washington 98213, USA',
	},
	{
		name: 'Rowan Kane',
		mobile: 965483355,
		address: 'Dreamland Estate, Penthouse 7, 57 Enchanted Way, Lake Geneva, Florida 32899, USA',
	},
	{
		name: 'Declan Kane',
		mobile: 965233355,
		address: 'The Kane Family Mansion, 214 Primrose Court, Newport, Rhode Island 02840, USA',
	},
	{
		name: 'Callahan Kane',
		mobile: 9652332535,
		address: 'Kane Lakehouse, 9 Sunset Drive, Haven Hill, Michigan 49764, USA',
	},
];

exports.getUsers = (req, res, next) => {
	res.status(200).json({
		message: "Users Fetched Successfully.",
		users: users,
	});
};

exports.postAddUser = (req, res, next) => {
	users.push({
		name: req.body.name,
		mobile: req.body.mobile,
		address: req.body.mobile,
	});
};
