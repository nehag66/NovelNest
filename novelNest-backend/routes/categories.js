const express = require("express");
const router = express.Router();

const categoryController = require('../controllers/categories');

router.get('/categories', categoryController.getCategories);
router.post('/add-category', categoryController.postAddCategory);

// router.get("/categories", async (req, res) => {
// 	try {
// 		const categories = await Category.find();
// 		res.json(categories);
// 	} catch (err) {
// 		res.status(500).send(err);
// 	}
// });

/* router.get("/categories", async (req, res) => {
	try {
		const db = client.db("OldNovelsDB");
		const collection = db.collection("Categories");
		console.log("DB =>", db);
		const categories = await collection.find({}).toArray();
		res.json(categories);
		res.send("categories===>", categories);
	} catch (error) {
		console.error("Error retrieving data:", error);
		res.status(500).json({ error: "An error occurred while retrieving data" });
	} finally {
		if (client) {
			await client.close();
		}
	}
}); */

module.exports = router;
