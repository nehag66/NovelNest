const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

const orderController = require('../controllers/orders');

router.post('/orders', verifyToken, orderController.createOrder);
router.get('/orders', verifyToken, orderController.getUserOrders);

module.exports = router;
