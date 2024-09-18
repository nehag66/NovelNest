const express = require('express');

const router = express.Router();

const novelsController = require('../controllers/novels');

router.get('/novels', novelsController.getNovels);
router.post('/add-novel', novelsController.postAddNovel);

module.exports = router;
