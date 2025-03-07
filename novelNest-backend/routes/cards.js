const express = require('express');
const router = express.Router();

const cardsController = require('../controllers/cards');

router.get('/secondHandBooksCards', cardsController.getSecondHandBooksCards);
router.get('/sellOldBooksCards', cardsController.getSellOldBooksCards);

module.exports = router;
