const express = require('express');

const router = express.Router();

const novelsController = require('../controllers/novels');

router.post('/novels', novelsController.postAddNovel);
router.get('/novels', novelsController.getNovels);
router.delete('/novels/:id', novelsController.deleteNovel);

module.exports = router;
