const express = require('express');
const router = express.Router();

const authorController = require('../controllers/author');
const verifyToken = require('../middlewares/verifyToken');
const requireRole = require('../middlewares/requireRole');

router.get('/author-details', authorController.getAllAuthorDetails);
router.get('/authors', authorController.getAllAuthors);
router.get('/authors/:id', authorController.getAuthorDetails);
router.post(
	'/authors',
	verifyToken,
	requireRole(['superadmin']),
	authorController.postAddAuthor,
);
// router.post('/authors', verifyToken, authorController.postAddAuthor);
router.put(
	'/authors/:id',
	verifyToken,
	requireRole(['superadmin']),
	authorController.editAuthor,
);
router.delete(
	'/authors/:id',
	verifyToken,
	requireRole(['superadmin']),
	authorController.deleteAuthor,
);

module.exports = router;
