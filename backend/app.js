const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const NotFoundError = require('./errors/not-found-err');
const itemsRoutes = require('./routes/items');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // in 15 minutes
  max: 1000, // you can make a maximum of 100 requests from one IP
});

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/todos', {
  useNewUrlParser: true,
});

mongoose.connection
  .once('open', () => {
    console.log('Connected');
  })
  .on('error', (error) => {
    console.log('Your Error', error);
  });

const app = express();
app.use(
  cors({
    origin: '*',
  }),
);

app.use(limiter);

app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use('/', itemsRoutes);

app.use((req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
});
app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
});
app.listen(PORT, () => {});
