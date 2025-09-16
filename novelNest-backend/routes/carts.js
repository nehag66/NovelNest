const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

const cartController = require('../controllers/carts');

router.post('/cart/add', verifyToken, cartController.addToCart);
router.get('/cart/', verifyToken, cartController.getCart);
router.put('/cart/update', verifyToken, cartController.updateCart);
router.delete('/cart/remove', verifyToken, cartController.removeFromCart);
router.delete('/cart/remove-multiple', verifyToken, cartController.removeMultipleFromCart);

module.exports = router;
