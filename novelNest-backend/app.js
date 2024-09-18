const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");

const usersRoutes = require('./routes/users');
const novelsRoutes = require('./routes/novels');
const categoriesRoutes = require('./routes/categories');

app.use(cors());
app.get('/', (req, res) => {
  console.log("log: Novel Nest Backend running");
	res.send("Novel Nest Backend running");
})
app.use(usersRoutes);
app.use(novelsRoutes);
app.use(categoriesRoutes);
app.use((req, res, next) => {
	res.status(404).send('<h1>Page Not Found!</h1>');
});

const port = 8080;
app.set("port", port);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const uri =
  "mongodb+srv://nehagoel66:atlasPass%40123@clusternovelnest.zeizkfo.mongodb.net/?retryWrites=true&w=majority&appName=ClusterNovelNest";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  console.log("connecting!...");
  try {
    // Connect the client to the server
    await client.connect();
    console.log("CONNECTED!! You successfully connected to MongoDB!");
    // Specify the database to use
    //   const db = client.db("OldNovelsDB");
    // await db.collection('Novels').insertOne({
    // 	title: 'Jack n Jill',
    // 	author: 'Famous Romance Author',
    // 	description: 'A description of the old novel.',
    // 	price: 500,
    // 	condition: "Good",
    // 	categoryId: new ObjectId('668280ddb8e37bc275ecd4f3'),
    // 	sellerId: new ObjectId('66828209540d674b98972c63'),
    // 	createdAt: new Date()
    // });
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

module.exports = app;
