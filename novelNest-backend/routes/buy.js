const express = require('express');

const router = express.Router();

const buyController = require('../controllers/buy');

router.get('/cart', buyController.getCart);
router.get('/checkout', buyController.getCheckout);

module.exports = router;
