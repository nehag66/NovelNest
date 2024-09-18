const express = require('express');

const router = express.Router();

/* GET books listing. */
router.get('/books', function(req, res, next) {
	res.send('respond with books list');
});

module.exports = router;
