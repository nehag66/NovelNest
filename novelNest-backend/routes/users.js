const express = require('express');

const router = express.Router();
const usersController = require('../controllers/users');

router.get('/users', usersController.getUsers);
router.post('/add-user', usersController.postAddUser);

module.exports = router;
