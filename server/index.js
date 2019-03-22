/**
 * Our entry point into the backend server.
 */

const express = require('express');
const { init } = require('./db');
const { authenticationRouter } = require('./routes/authentication');
const bodyParser = require('body-parser');
const path = require('path');
const { registerRepo } = require('./git');

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

init();
app.use('/api/auth/',  require('./routes/authentication'));
app.use('/api/repo/',  require('./routes/repo'));

app.use(express.static('../client/build'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


app.listen(port, () => console.log(`Backend server listening on port ${port}!`));