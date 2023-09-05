const express = require ('express');
const app = express();
const products = require('./routes/product');;
const errorMiddleware = require('./middlewares.js/error');
const auth = require('./routes/auth');

app.use(express.json());
app.use('/api/v1/',products);
app.use('/api/v1/',auth);


app.use(errorMiddleware);

module.exports = app; 