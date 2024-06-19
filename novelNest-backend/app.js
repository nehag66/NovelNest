const express = require('express');
const app = express();
const port = 8080;

app.set('port', port);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;  // Export the app for testing purposes or other modules
