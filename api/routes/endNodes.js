const express = require('express');     //Import the express package
const router = express.Router();    //Import the router sub-package to handle routes

//Handle the GET requests coming to 'host/endNodes/'
router.get('/', (req, res, next) => {
    //Send a json object with HTTP status code 200
    res.status(200).json({
        message: 'Handling the GET requests to /endNodes'
    });
});

//Handle the POST requests coming to 'host/endNodes/'
router.post('/', (req, res, next) => {
    const endNode = {
        nodeId: req.body.nodeId,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        positionName: req.body.positionName
    };
    //Send a json object with HTTP status code 200
    res.status(201).json({
        message: 'end node was created',
        createdEndNode: endNode
    });
});

//Handle the GET requests coming to 'host/endNodes/{id}'
router.get('/:id', (req, res, next) => {
    //Extract the id required from the request
    const id = req.params.id;

    //Send a json object with HTTP status code 200
    res.status(200).json({
        message: 'You requested a specific end node',
        specificID: id
    });
});

//Handle the DELETE requests coming to 'host/endNodes/{id}'
router.delete('/:id', (req, res, next) => {
    //Extract the id required from the request
    const id = req.params.id;

    //Send a json object with HTTP status code 200
    res.status(200).json({
        message: 'You deleted a specific end node',
        specificID: id
    });
});

module.exports = router;    //Export the router configuration
