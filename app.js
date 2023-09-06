const express = require ('express');
const app = express();
const products = require('./routes/product');;
const errorMiddleware = require('./middlewares.js/error');
const auth = require('./routes/auth');
const cookiesparser = require('cookie-parser')

app.use(express.json());
app.use(cookiesparser());

app.use('/api/v1/',products);
app.use('/api/v1/',auth);


app.use(errorMiddleware);

module.exports = app; 