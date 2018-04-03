const express = require('express');     //Import the express package
const app = express();      //Create an express application

//Setting up a middle-ware to pass the incoming requests
app.use((req, res, next) => {
    //Send a json response with HTTP status 200
    res.status(200).json({
        message: 'It works!'
    });
});

module.exports = app;