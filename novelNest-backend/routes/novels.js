const express = require('express');

const router = express.Router();

const novelsController = require('../controllers/novels');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');

// Ensure the 'uploads' directory exists
fs.ensureDirSync(path.join(__dirname, '../uploads'));

// Configure Multer for file storage
  const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, 'uploads/'); // Ensure this folder exists
	},
	filename: (req, file, cb) => {
	  cb(null, `${Date.now()}-${file.originalname}`);
	}
  });
  const upload = multer({ storage: storage });

router.post('/novels', upload.array('images', 5), novelsController.postAddNovel);
router.get('/uploads/:filename', novelsController.getImage); // Serve uploaded images
router.get('/novels', novelsController.getNovels);
router.get('/novels/:id', novelsController.getNovelDetails);
router.patch('/novels/:id', novelsController.editNovel);
router.delete('/novels/:id', novelsController.deleteNovel);

module.exports = router;
