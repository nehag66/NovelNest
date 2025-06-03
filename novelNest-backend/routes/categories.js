const express = require('express');
const router = express.Router();
const requireRole = require('../middlewares/requireRole');
const verifyToken = require('../middlewares/verifyToken');

const categoryController = require('../controllers/categories');

router.get('/categories', categoryController.getCategories);
router.post(
	'/add-category',
	verifyToken,
	requireRole(['superadmin']),
	categoryController.postAddCategory,
);

module.exports = router;
