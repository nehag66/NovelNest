const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

const cartController = require('../controllers/carts');

router.post('/cart/add', verifyToken, cartController.addToCart);
router.get('/cart/', verifyToken, cartController.getCart);
router.post('/cart/remove', verifyToken, cartController.removeFromCart);

module.exports = router;
