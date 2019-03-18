import express from 'express';
import { conn } from './db';

const app = express();
const port = 3000;

conn();
app.get('/', (req, res) => res.send("Hello world!"));

app.listen(port, () => console.log(`Backend server listening on port ${port}!`));