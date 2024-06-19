const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const dbName = "yourdatabase";

const connectDB = async () => {
	const client = new MongoClient(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	try {
		await client.connect();
		console.log("MongoDB connected");
		const db = client.db(dbName);
		return db;
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
