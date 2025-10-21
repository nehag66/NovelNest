const express = require('express');
const router = express.Router();

const sellingOrdersController = require('../controllers/sellingOrders');
const verifyToken = require('../middlewares/verifyToken');

router.get('/my-novels', verifyToken, sellingOrdersController.getSellingOrders);

module.exports = router;
