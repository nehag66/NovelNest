const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	mobile: {
		type: Number,
	},
	addresses: [
		{
			type: String,
			trim: true,
		},
	],

	resetPasswordToken: String,
	resetPasswordExpires: Date,

	role: {
		type: String,
		enum: ['user', 'superadmin'],
		default: 'user',
	},
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;
