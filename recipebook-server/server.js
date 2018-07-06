const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const api = require('./routes/api');

const port = 3000;

const app = express();

app.use(express.static(path.join(__dirname, '../recipebook-client/public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', api);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../recipebook-client/public/index.html'));
});

app.listen(port, function() {
	console.log("Starting the server at localhost:" + port);
});