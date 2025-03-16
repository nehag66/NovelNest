const express = require('express');

const router = express.Router();

const novelsController = require('../controllers/novels');
const multer = require('multer');

// Configure Multer storage (store images in memory as Buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/novels', novelsController.postAddNovel);
// router.post('/novels', upload.array('images', 5), novelsController.postAddNovel);
router.get('/novels', novelsController.getNovels);
router.get('/novels/:id', novelsController.getNovelDetails);
router.patch('/novels/:id', novelsController.editNovel);
router.delete('/novels/:id', novelsController.deleteNovel);

module.exports = router;
