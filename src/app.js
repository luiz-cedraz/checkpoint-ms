const express = require('express');
const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(function (req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-access-token' )
    next();
});

require('./models/product');
require('./models/category');

const productRouter = require('./routes/product-router');
const categoryRouter = require('./routes/category-router');
const index = require('./routes/index')

app.use('/', index);
app.use('/products', productRouter);
app.use('/category', categoryRouter);

module.exports = app


