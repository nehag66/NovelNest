const express = require('express');

const router = express.Router();
const usersController = require('../controllers/users');
const verifyToken = require('../middlewares/verifyToken');

router.get('/users', verifyToken, usersController.getUsers);
router.get('/users/:id', verifyToken, usersController.getUserDetails);

router.post('/users/:id/addresses', verifyToken, usersController.postAddAddress);

module.exports = router;
