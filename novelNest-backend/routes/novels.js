const express = require('express');

const router = express.Router();

const novelsController = require('../controllers/novels');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const verifyToken = require('../middlewares/verifyToken');

// Ensure the 'uploads' directory exists
fs.ensureDirSync(path.join(__dirname, '../uploads'));

// Configure Multer for file storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/'); // Ensure this folder exists
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});
const upload = multer({ storage: storage });

router.post(
	'/novels',
	verifyToken,
	upload.array('images', 5),
	novelsController.postAddNovel,
);
router.get('/uploads/:filename', novelsController.getImage); // Serve uploaded images
router.get('/novels', novelsController.getNovels);
router.get('/novels/:id', verifyToken, novelsController.getNovelDetails);
router.put(
	'/novels/:id',
	verifyToken,
	upload.array('images', 5),
	novelsController.editNovel,
);
router.delete('/novels/:id', verifyToken, novelsController.deleteNovel);

module.exports = router;
