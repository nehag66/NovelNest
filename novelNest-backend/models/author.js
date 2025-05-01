const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		bio: {
			type: String,
		},
		imageUrl: {
			type: String,
		},
		novels: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Novel',
			},
		],
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('Author', authorSchema);
