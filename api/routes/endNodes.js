const express = require('express');     //Import the express package
const router = express.Router();    //Import the router sub-package to handle routes
const mongoose = require('mongoose'); //Import the mongoose package

const EndNode = require('../models/endNode');   //Import the endNode model

//Handle the GET requests coming to 'host/endNodes/'
router.get('/', (req, res, next) => {
    //Get all the end node data
    EndNode.find()
        .exec()
        .then(docs => {
            console.log(docs);
            // if(docs.length > 0){
                res.status(200).json(docs); //Send a json object with HTTP status code 200
            // }else{
            //     res.status(404).json({
            //         message: 'No entries found'
            //     });
            // }
        })
        .catch(err => {
            console.log(err);
            //Send a json object with HTTP status code 500 if unable to get data
            res.status(500).json({  
                error: err
            });
        });
});

//Handle the POST requests coming to 'host/endNodes/'
router.post('/', (req, res, next) => {
    //Create an instance of the model to store data in the database    
    const endNode = new EndNode({
        _id:new mongoose.Types.ObjectId(),
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        positionName: req.body.positionName
    });

    //Save the created instance of the model to the database
    endNode
    .save()
    .then(result => {
        console.log(result),
        //Send a json object with HTTP status code 200
        res.status(201).json({
            message: 'end node was created',
            createdEndNode: result
        });
    })
    .catch(err => {
        console.log(err),
        //Send an error message if unable to post data
        res.status(500).json({      
            error: err      
        });
    });    
});

//Handle the GET requests coming to 'host/endNodes/{id}'
router.get('/:id', (req, res, next) => {
    //Extract the id required from the request
    const id = req.params.id;

    //Get the data from the database for the specific ID
    EndNode.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if(doc){
                res.status(200).json(doc);  //Send a json object with HTTP status code 200            
            }else{
                res.status(404).json({  //Send a json object with HTTP status code 404
                    message: "No valid entry found for the provided ID"
                });
            }
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err }); //Send an error message if unable to get data
        });   
});

//Handle the DELETE requests coming to 'host/endNodes/{id}'
router.delete('/:id', (req, res, next) => {
    //Extract the id required from the request
    const id = req.params.id;

    //Send a json object with HTTP status code 200
    EndNode.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);   //Send a json object with HTTP status code 200
        })
        .catch(err => {
            console.log(err);
            //Send a json object with HTTP status code 500 if unable to delete data
            res.status(500).json({  
                error: err
            });
        });
});

module.exports = router;    //Export the router configuration
