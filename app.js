const express = require('express');     //Import the express package
const app = express();      //Create an express application

//Import route file needed to forward the requests coming to 'host/waterQualities'
const waterQualitiesRoutes = require('./api/routes/waterQualities');

//Setting up a middle-ware to pass the incoming requests
app.use('/waterQualities', waterQualitiesRoutes);

module.exports = app;