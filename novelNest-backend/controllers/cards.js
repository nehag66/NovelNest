const SecondHandBooksCard = require('../models/secondHandBooksCards');
const SellOldBooksCard = require('../models/sellOldBooksCards');

exports.getSecondHandBooksCards = (req, res, next) => {
	SecondHandBooksCard.find()
		.then((cards) => {
			res.status(200).json({
				message: 'Second Hand Books Cards Fetched Successfully.',
				cards: cards,
			});
		})
		.catch((err) => {
			console.error('Error fetching cards:', err);
			res.status(500).json({ message: 'Fetching cards failed.' });
		});
};

exports.getSellOldBooksCards = (req, res, next) => {
	SellOldBooksCard.find()
		.then((cards) => {
			res.status(200).json({
				message: 'Sell Old Books Cards Fetched Successfully.',
				cards: cards,
			});
		})
		.catch((err) => {
			console.error('Error fetching cards:', err);
			res.status(500).json({ message: 'Fetching cards failed.' });
		});
};
