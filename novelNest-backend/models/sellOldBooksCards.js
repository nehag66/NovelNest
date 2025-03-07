const mongoose = require('mongoose');

const sellOldBooksCardsSchema = new mongoose.Schema({
	cardTitle: {
		type: String,
		required: true,
	},
	cardDesc: {
		type: String,
		required: true,
	},
	cardNumber: {
		type: Number,
		required: true,
	},
	imgSrc: {
		type: String,
		required: true,
	},
	altName: {
		type: String,
		required: true,
	},
});

const SellOldBooksCards = mongoose.model('sell old books card', sellOldBooksCardsSchema);

module.exports = SellOldBooksCards;
