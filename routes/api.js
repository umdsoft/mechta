const express = require('express');
const router = express.Router();

const authRouter = require('./auth')
const categoryRouter = require('./category')
const productRouter = require('./product')
const orderRouter = require('./order')
const searchRouter = require('./search');
const statisticsRouter = require('./statistics');
const testRouter = require('./testRoute');
const app = express();


app.use('/', authRouter);
app.use('/', categoryRouter);
app.use('/', productRouter);
app.use('/',orderRouter);
app.use('/',searchRouter);
app.use('/',statisticsRouter);
app.use('/',testRouter);


module.exports = app;
