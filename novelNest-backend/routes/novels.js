const express = require('express');

const router = express.Router();

const novelsController = require('../controllers/novels');

router.post('/novels', novelsController.postAddNovel);
router.get('/novels', novelsController.getNovels);
router.get('/novels/:id', novelsController.getNovelDetails);
router.patch('/novels/:id', novelsController.editNovel);
router.delete('/novels/:id', novelsController.deleteNovel);

module.exports = router;
