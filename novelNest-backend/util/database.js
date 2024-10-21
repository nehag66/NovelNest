/* const { MongoClient, ServerApiVersion } = require('mongodb');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});
async function run() {
	console.log('connecting!...');
	try {
		// Connect the client to the server
		await client.connect();
		console.log('CONNECTED!! You successfully connected to MongoDB!');
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
run().catch(console.dir); */


const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
require('dotenv').config();

const mongoConnect = (callback) => {
	MongoClient.connect(process.env.MONGODB_URI)
	.then((client) => {
		console.log("CONNECTED!!");
		callback(client);
	})
	.catch((err) => {
		console.log("ERROR occured! =>", err);
	});
}

module.exports = mongoConnect;
