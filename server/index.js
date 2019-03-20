const express = require('express');
const {init} = require('./db');
const {authenticationRouter} = require('./routes/authentication');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

init();
app.use('/api/auth',  require('./routes/authentication'));
// app.use('/api/repo',  require('./routes/repoStats'));
app.get('/', (req, res) => res.send("Hello world!"));

app.listen(port, () => console.log(`Backend server listening on port ${port}!`));