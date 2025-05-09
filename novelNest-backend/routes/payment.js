const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/payment');

// Dummy Payment Endpoint
router.post('/payment/pay', paymentsController.postPayment);

module.exports = router;
