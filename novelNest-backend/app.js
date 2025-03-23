const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const usersRoutes = require('./routes/users');
const novelsRoutes = require('./routes/novels');
const categoriesRoutes = require('./routes/categories');
const cardsRoutes = require('./routes/cards');
const authRoutes = require('./routes/auth');
const path = require('path');
// const errorController = require('./controllers/error');

app.use('/auth', authRoutes);
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	console.log('log: Novel Nest Backend running');
	res.send('Novel Nest Backend running');
});

mongoose.connect(process.env.MONGODB_URI, {
	dbName: 'OldNovelsDB',
})
.then(() => {
	app.listen(port, () => {
		console.log(`✅ Server running on port ${port}`);
	});
	console.log('✅ Mongoose connected to MongoDB');
})
.catch(err => {
	console.error('❌ Mongoose connection error:', err);
});

app.use(usersRoutes);
app.use(novelsRoutes);
app.use(categoriesRoutes);
app.use(cardsRoutes);

// Middleware to serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use(errorController.get404);

app.use((req, res) => {
	res.status(404).send('<h1>Page Not Found!</h1>');
});

const port = 8080;
app.set('port', port);

module.exports = app;
