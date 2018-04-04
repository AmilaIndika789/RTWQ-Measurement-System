const express = require('express');     //Import the express package
const app = express();      //Create an express application

//Import route file needed to forward the requests coming to 'host/waterQuality'
const productRoutes = require('./api/routes/waterQuality');

//Setting up a middle-ware to pass the incoming requests
app.use('/waterQuality', productRoutes);

module.exports = app;