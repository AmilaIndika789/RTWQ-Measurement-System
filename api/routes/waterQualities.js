const express = require('express');     //Import the express package
const router = express.Router();    //Import the router sub-package to handle routes

//Handle the GET requests coming to 'host/waterQualities/'
router.get('/', (req, res, next) => {
    //Send a json object with HTTP status code 200
    res.status(200).json({
        message: 'Handling the GET requests to /waterQualities'
    });
});

//Handle the DELETE request coming to 'host/waterQualities/'
router.delete('/', (req, res, next) => {
    //Send a json object with HTTP status code 200
    res.status(200).json({
        message: 'Handling the DELETE requests to /waterQualities'
    });
});

//Handle the GET requests coming to 'host/waterQualities/{specificQuality}'
router.get('/:specificQuality', (req, res, next) => {
    //Extract the quality required from the request
    const qualityRequested = req.params.specificQuality;

    //Send a json object with HTTP status code 200
    res.status(200).json({
        message: 'You requested a specific quality',
        specificQuality: qualityRequested
    });
});

//Handle data over time domain (time distribution)

    //Handle the GET requests coming to 'host/waterQualities/date/{date}'
    router.get('/date/:date', (req, res, next) => {
        //Extract the date from the request
        const dateRequested = req.params.date;

        //Send a json object with HTTP status code 200    
        res.status(200).json({
            message: 'You requested data of a specific date',
            date: dateRequested
        });
    });

    //Handle the DELETE requests coming to 'host/waterQualities/date/{date}'
    router.delete('/date/:date', (req, res, next) => {
        //Extract the date from the request
        const dateRequested = req.params.date;

        //Send a json object with HTTP status code 200    
        res.status(200).json({
            message: 'You deleted data of a specific date',
            date: dateRequested
        });
    });

//Handle data over space (spatial distribution)

    //Handle the GET requests coming to 'host/waterQualities/position/{position}'
    router.get('/position/:position', (req, res, next) => {
        //Extract the date from the request
        const positionRequested = req.params.position;

        //Send a json object with HTTP status code 200    
        res.status(200).json({
            message: 'You requested data of a specific position',
            position: positionRequested
        });
    });

    //Handle the DELETE requests coming to 'host/waterQualities/position/{position}'
    router.delete('/position/:position', (req, res, next) => {
        //Extract the date from the request
        const positionRequested = req.params.position;

        //Send a json object with HTTP status code 200    
        res.status(200).json({
            message: 'You deleted data of a specific position',
            position: positionRequested
        });
    });


module.exports = router;    //Export the router configuration