require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const reviewRouter = require('./reviewRoutes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/reviews', reviewRouter);
app.get(`/${process.env.LOADERIO}`, (req, res) => {
  res.send(process.env.LOADERIO);
})

const PGHOST = process.env.PGHOST || 'localhost';
const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`Server listening at http://${PGHOST}:${PORT}`);
