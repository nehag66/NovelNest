const express = require('express');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();
const wishlistController = require('../controllers/wishlists');

router.post('/wishlist/add', verifyToken, wishlistController.postWishlist);
router.post('/wishlist/remove', verifyToken, wishlistController.removeFromWishlist);
router.get('/wishlist/', verifyToken, wishlistController.getWishlist);

module.exports = router;
