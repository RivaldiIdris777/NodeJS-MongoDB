const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/keyfile');

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended:true }));

const CONNECTION_PORT = PORT || 5300

app.listen(CONNECTION_PORT, () => console.log(`Server running on Port : ${CONNECTION_PORT}`))

