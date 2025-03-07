const mongoose = require('mongoose');

const secondHandBooksCardsSchema = new mongoose.Schema({
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
	bgColor: {
		type: String,
		required: true,
	},
});

const SecondHandBooksCards = mongoose.model('second hand books card', secondHandBooksCardsSchema);

module.exports = SecondHandBooksCards;
