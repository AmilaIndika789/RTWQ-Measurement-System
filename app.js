const express = require('express');     //Import the express package
const app = express();      //Create an express application
const morgan = require('morgan');   //Import morgan package

//Import route file needed to forward the requests coming to 'host/waterQualities'
const waterQualitiesRoutes = require('./api/routes/waterQualities');
const endNodesRoutes = require('./api/routes/endNodes');

//Setting up a middle-ware to pass the incoming requests
    //Log all the requests by passing through the morgan middleware
    app.use(morgan('dev'));

    //Routes which should handle requests
    app.use('/waterQualities', waterQualitiesRoutes);
    app.use('/endNodes', endNodesRoutes);

    //Handle the errors that does not valid to any available routes
    app.use((req, res, next) => {
        const error = new Error('Not found');   //Create a error object
        error.status = 404;  //Return status code of 404
        next(error);    //Forward the request with the error
    });

    //Handle the errors that are thrown from anywhere else from the application.    e.g.: Database errors
    app.use((error, req, res, next)=>{
        res.status(error .status || 500);
        res.json({
            error: {
                message: error.message
            }
        });
    });

    module.exports = app;