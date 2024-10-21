const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	mobile: {
		type: Number,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	// userType: {
	// 	type: String,
	// 	required: true,
	// },
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
