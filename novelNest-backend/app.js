const express = require('express');
const app = express();

const cors = require('cors');

const mongoConnect = require('./util/database');

const usersRoutes = require('./routes/users');
const novelsRoutes = require('./routes/novels');
const categoriesRoutes = require('./routes/categories');
// const errorController = require('./controllers/error');

app.use(cors());
app.get('/', (req, res) => {
	console.log('log: Novel Nest Backend running');
	res.send('Novel Nest Backend running');
});
app.use(usersRoutes);
app.use(novelsRoutes);
app.use(categoriesRoutes);
// app.use(errorController.get404);

app.use((req, res, next) => {
	res.status(404).send('<h1>Page Not Found!</h1>');
});

const port = 8080;
app.set('port', port);

mongoConnect((client) => {
	console.log(client);
	app.listen(port, () => {
		console.log(`Server is running on port ${port}`);
	});
});

module.exports = app;
