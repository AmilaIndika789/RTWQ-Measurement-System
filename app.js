const express = require('express');     //Import the express package
const app = express();      //Create an express application
const morgan = require('morgan');   //Import morgan package
const bodyParser = require('body-parser');  //Import body-parser package
const mongoose = require('mongoose');   //Import mongoose

//Import route file needed to forward the requests coming to 'host/waterQualities'
const waterQualitiesRoutes = require('./api/routes/waterQualities');
const endNodesRoutes = require('./api/routes/endNodes');

mongoose.connect('mongodb://mike:' + process.env.MONGO_ATLAS_PW + '@cluster0-shard-00-00-k319j.mongodb.net:27017,cluster0-shard-00-01-k319j.mongodb.net:27017,cluster0-shard-00-02-k319j.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=false');

//Setting up a middle-ware to pass the incoming requests
    app.use(morgan('dev')); //Log all the requests by passing through the morgan middleware
    app.use(bodyParser.urlencoded({extended: false}));  //Parse the simple url encoded bodies
    app.use(bodyParser.json()); //Extract the json data

    //Handle CORS(Cross-Origin Resource Sharing) to add the CORS headers
    app.use((req,res,next)=>{
        res.header('Access-Control-Allow-Origin', '*'); //Allow any client to access resources
        res.header(
            'Access-Control-Allow-Headers', 
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
        if(req.method === 'OPTIONS'){   //Check for the OPTIONS request send by the browser before the POST request
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    
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