const express = require('express');
const router = express.Router();

const authRouter = require('./auth')
const categoryRouter = require('./category')
const productRouter = require('./product')
const orderRouter = require('./order')
const app = express();


app.use('/', authRouter);
app.use('/', categoryRouter);
app.use('/', productRouter);
app.use('/',orderRouter);


module.exports = app;
