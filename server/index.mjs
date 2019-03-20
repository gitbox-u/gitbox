import express from 'express';
import { init } from './db';
import {authenticationRouter} from './routes/authentication'
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

init();
authenticationRouter(app);
app.get('/', (req, res) => res.send("Hello world!"));

app.listen(port, () => console.log(`Backend server listening on port ${port}!`));