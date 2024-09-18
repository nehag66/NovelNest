const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const categoriesController = require('../controllers/index');
const Category = require('../models/index');

// router.get('/categories', async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.json(categories);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// module.exports = router;
