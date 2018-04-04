const express = require('express');     //Import the express package
const router = express.Router();    //Import the router sub-package to handle routes

//Handle the GET requests coming to 'host/waterQuality/'
router.get('/', (req, res, next) => {
    //Send a json object with HTTP status code 200
    res.status(200).json({
        message: 'Handling the GET requests to /waterQuality'
    });
});

module.exports = router;    //Export the router configuration