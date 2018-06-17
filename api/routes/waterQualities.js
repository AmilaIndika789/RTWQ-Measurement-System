const express = require('express');     //Import the express package
const router = express.Router();    //Import the router sub-package to handle routes
const moment = require('moment');   //Import the moment package

const WaterQualities = require('../models/waterQualitiesModel');    //Import the WaterQualities model

//Handle the GET requests coming to 'host/waterQualities/'
router.get('/', (req, res, next) => {
    //Send a json object with HTTP status code 200
    //Get all the water qualities data
    WaterQualities.find()
        .select('_id date longitude latitude temperature turbidity pH conductivity positionName')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                waterQualities: docs.map(doc => {
                    var date = new Date(doc.date);
                    var d = date.getDate();
                    var m = date.getMonth() + 1;
                    var y = date.getFullYear();
                    return {
                        _id: doc._id,
                        date: doc.date,
                        longitude: doc.longitude,
                        latitude: doc.latitude,
                        temperature: doc.temperature,
                        turbidity: doc.turbidity,
                        pH: doc.pH,
                        conductivity: doc.conductivity,
                        positionName: doc.positionName,
                        request: {
                            type: 'GET',
                            urlPosition: 'http://localhost:3000/waterQualities/position/' + doc.positionName,
                            urlDate: 'http://localhost:3000/waterQualities/date/' + moment(doc.date).format('YYYY-MM-DD')
                        }
                    }
                })
            };
            // if(docs.length > 0){
                res.status(200).json(response); //Send a json object with HTTP status code 200
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

//Handle the DELETE request coming to 'host/waterQualities/'
router.delete('/', (req, res, next) => {
    //Send a json object with HTTP status code 200
    WaterQualities.remove()
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

//Handle the GET requests coming to 'host/waterQualities/{specificQuality}'
router.get('/:specificQuality', (req, res, next) => {
    //Extract the quality required from the request
    const qualityRequested = req.params.specificQuality;

    if(qualityRequested == "temperature"){
        //Get the data from the database for the specific quality
        WaterQualities.find({},{_id:true, date:true, temperature:true, longitude:true, latitude: true, positionName: true})
        .select('_id datetemperature  longitude latitude positionName')
        .exec()
        .then(docs => {
            // console.log("From database", doc);
            // if(doc){
            //     res.status(200).json(doc);  //Send a json object with HTTP status code 200            
            // }else{
            //     res.status(404).json({  //Send a json object with HTTP status code 404
            //         message: "No valid entry found for the provided quality"
            //     });
            // }
            const response = {
                count: docs.length,
                waterQualities: docs.map(doc => {
                    var date = new Date(doc.date);
                    var d = date.getDate();
                    var m = date.getMonth() + 1;
                    var y = date.getFullYear();
                    return {
                        _id: doc._id,
                        date: doc.date,
                        longitude: doc.longitude,
                        temperature: doc.temperature,
                        latitude: doc.latitude,
                        
                        positionName: doc.positionName
                        // request: {
                        //     type: 'GET',
                        //     urlPosition: 'http://localhost:3000/waterQualities/position/' + doc.positionName,
                        //     urlDate: 'http://localhost:3000/waterQualities/date/' + moment(doc.date).format('YYYY-MM-DD')
                        // }
                    }
                })
            };
            res.status(200).json(response); //Send a json object with HTTP status code 200

        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err }); //Send an error message if unable to get data
        }); 
    }else if(qualityRequested == "turbidity"){
        //Get the data from the database for the specific quality
        WaterQualities.find({},{_id:true, date:true, turbidity:true, longitude:true, latitude: true, positionName: true})
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if(doc){
                res.status(200).json(doc);  //Send a json object with HTTP status code 200            
            }else{
                res.status(404).json({  //Send a json object with HTTP status code 404
                    message: "No valid entry found for the provided quality"
                });
            }
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err }); //Send an error message if unable to get data
        });
    }else if(qualityRequested == "pH"){
        //Get the data from the database for the specific quality
        WaterQualities.find({},{_id:true, date:true, pH:true, longitude:true, latitude: true, positionName: true})
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if(doc){
                res.status(200).json(doc);  //Send a json object with HTTP status code 200            
            }else{
                res.status(404).json({  //Send a json object with HTTP status code 404
                    message: "No valid entry found for the provided quality"
                });
            }
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err }); //Send an error message if unable to get data
        });
    }else if(qualityRequested == "conductivity"){
        //Get the data from the database for the specific quality
        WaterQualities.find({},{_id:true, date:true, conductivity:true, longitude:true, latitude: true, positionName: true})
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if(doc){
                res.status(200).json(doc);  //Send a json object with HTTP status code 200            
            }else{
                res.status(404).json({  //Send a json object with HTTP status code 404
                    message: "No valid entry found for the provided quality"
                });
            }
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err }); //Send an error message if unable to get data
        });
    }else{
        res.status(404).json({
            error: "Requested quality not found"
        });
    }
    
});

//Handle data over time domain (time distribution)

    //Handle the GET requests coming to 'host/waterQualities/date/{date}'
    router.get('/date/:date/:specificQuality?', (req, res, next) => {
        //Extract the date from the request
        const dateRequested = req.params.date;
        var specificQuality = req.params.specificQuality;

        if(specificQuality && specificQuality == "temperature"){
            WaterQualities.find({date: dateRequested},{_id:true, date:true, temperature:true, longitude:true, latitude: true, positionName: true})
                .exec()
                .then(doc => {
                console.log("From database", doc);
                    if(doc){
                        res.status(200).json(doc);  //Send a json object with HTTP status code 200            
                    }else{
                        res.status(404).json({  //Send a json object with HTTP status code 404
                            message: "No valid entry found for the provided quality"
                        });
                    }
                })
                .catch(err => {
                    console.log(err),
                    res.status(500).json({error: err }); //Send an error message if unable to get data
                });
        }else if(specificQuality && specificQuality == "turbidity"){
            WaterQualities.find({date: dateRequested},{_id:true, date:true, turbidity:true, longitude:true, latitude: true, positionName: true})
                .exec()
                .then(doc => {
                console.log("From database", doc);
                    if(doc){
                        res.status(200).json(doc);  //Send a json object with HTTP status code 200            
                    }else{
                        res.status(404).json({  //Send a json object with HTTP status code 404
                            message: "No valid entry found for the provided quality"
                        });
                    }
                })
                .catch(err => {
                    console.log(err),
                    res.status(500).json({error: err }); //Send an error message if unable to get data
                });
        }else if(specificQuality && specificQuality == "pH"){
            WaterQualities.find({date: dateRequested},{_id:true, date:true, pH:true, longitude:true, latitude: true, positionName: true})
                .exec()
                .then(doc => {
                console.log("From database", doc);
                    if(doc){
                        res.status(200).json(doc);  //Send a json object with HTTP status code 200            
                    }else{
                        res.status(404).json({  //Send a json object with HTTP status code 404
                            message: "No valid entry found for the provided quality"
                        });
                    }
                })
                .catch(err => {
                    console.log(err),
                    res.status(500).json({error: err }); //Send an error message if unable to get data
                });
        }else if(specificQuality && specificQuality == "conductivity"){
            WaterQualities.find({date: dateRequested},{_id:true, date:true, conductivity:true, longitude:true, latitude: true, positionName: true})
                .exec()
                .then(doc => {
                console.log("From database", doc);
                    if(doc){
                        res.status(200).json(doc);  //Send a json object with HTTP status code 200            
                    }else{
                        res.status(404).json({  //Send a json object with HTTP status code 404
                            message: "No valid entry found for the provided quality"
                        });
                    }
                })
                .catch(err => {
                    console.log(err),
                    res.status(500).json({error: err }); //Send an error message if unable to get data
                });
        }else if(!specificQuality){
            WaterQualities.find({date: dateRequested})
                .select('_id date longitude latitude temperature turbidity pH conductivity positionName')        
                .exec()
                .then(doc => {
                console.log("From database", doc);
                    if(doc){
                        res.status(200).json(doc);  //Send a json object with HTTP status code 200            
                    }else{
                        res.status(404).json({  //Send a json object with HTTP status code 404
                            message: "No valid entry found for the provided quality"
                        });
                    }
                })
                .catch(err => {
                    console.log(err),
                    res.status(500).json({error: err }); //Send an error message if unable to get data
                });
        }else{
            res.status(404).json({
                error: "Requested quality not found"
            });
        }
    });

//For testing only
    router.post('/', (req, res, next) => {
        //Create an instance of the model to store data in the database    
        const waterQualities = new WaterQualities({
            date: req.body.date,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            temperature: req.body.temperature,
            turbidity: req.body.turbidity,
            pH: req.body.pH,
            conductivity: req.body.conductivity,
            positionName: req.body.positionName
        });
    
        //Save the created instance of the model to the database
        waterQualities
        .save()
        .then(result => {
            console.log(result),
            //Send a json object with HTTP status code 200
            res.status(201).json({
                message: 'Water Qualities added was created',
                waterQualities: result
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

    //Handle the DELETE requests coming to 'host/waterQualities/date/{date}'
    router.delete('/date/:date', (req, res, next) => {
        //Extract the date from the request
        const dateRequested = req.params.date;

        //Send a json object with HTTP status code 200
        WaterQualities.remove({ date: dateRequested  })
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

//Handle data over space (spatial distribution)

    //Handle the GET requests coming to 'host/waterQualities/position/{position}'
    router.get('/position/:position/:specificQuality?', (req, res, next) => {
        //Extract the date from the request
        const positionRequested = req.params.position;
        var specificQuality = req.params.specificQuality;

        if(specificQuality && specificQuality == "temperature"){
            WaterQualities.find({positionName: positionRequested},{_id:true, date:true, temperature:true, longitude:true, latitude: true, positionName: true})
                .exec()
                .then(doc => {
                console.log("From database", doc);
                    if(doc){
                        res.status(200).json(doc);  //Send a json object with HTTP status code 200            
                    }else{
                        res.status(404).json({  //Send a json object with HTTP status code 404
                            message: "No valid entry found for the provided quality"
                        });
                    }
                })
                .catch(err => {
                    console.log(err),
                    res.status(500).json({error: err }); //Send an error message if unable to get data
                });
        }else if(specificQuality && specificQuality == "turbidity"){
            WaterQualities.find({positionName: positionRequested},{_id:true, date:true, turbidity:true, longitude:true, latitude: true, positionName: true})
                .exec()
                .then(doc => {
                console.log("From database", doc);
                    if(doc){
                        res.status(200).json(doc);  //Send a json object with HTTP status code 200            
                    }else{
                        res.status(404).json({  //Send a json object with HTTP status code 404
                            message: "No valid entry found for the provided quality"
                        });
                    }
                })
                .catch(err => {
                    console.log(err),
                    res.status(500).json({error: err }); //Send an error message if unable to get data
                });
        }else if(specificQuality && specificQuality == "pH"){
            WaterQualities.find({positionName: positionRequested},{_id:true, date:true, pH:true, longitude:true, latitude: true, positionName: true})
                .exec()
                .then(doc => {
                console.log("From database", doc);
                    if(doc){
                        res.status(200).json(doc);  //Send a json object with HTTP status code 200            
                    }else{
                        res.status(404).json({  //Send a json object with HTTP status code 404
                            message: "No valid entry found for the provided quality"
                        });
                    }
                })
                .catch(err => {
                    console.log(err),
                    res.status(500).json({error: err }); //Send an error message if unable to get data
                });
        }else if(specificQuality && specificQuality == "conductivity"){
            WaterQualities.find({positionName: positionRequested},{_id:true, date:true, conductivity:true, longitude:true, latitude: true, positionName: true})
                .exec()
                .then(doc => {
                console.log("From database", doc);
                    if(doc){
                        res.status(200).json(doc);  //Send a json object with HTTP status code 200            
                    }else{
                        res.status(404).json({  //Send a json object with HTTP status code 404
                            message: "No valid entry found for the provided quality"
                        });
                    }
                })
                .catch(err => {
                    console.log(err),
                    res.status(500).json({error: err }); //Send an error message if unable to get data
                });
        }else if(!specificQuality){
            WaterQualities.find({positionName: positionRequested})
                .select('_id date longitude latitude temperature turbidity pH conductivity positionName')   
                .exec()
                .then(doc => {
                console.log("From database", doc);
                    if(doc){
                        res.status(200).json(doc);  //Send a json object with HTTP status code 200            
                    }else{
                        res.status(404).json({  //Send a json object with HTTP status code 404
                            message: "No valid entry found for the provided quality"
                        });
                    }
                })
                .catch(err => {
                    console.log(err),
                    res.status(500).json({error: err }); //Send an error message if unable to get data
                });
        }else{
            res.status(404).json({
                error: "Requested quality not found"
            });
        }
    });

    //Handle the DELETE requests coming to 'host/waterQualities/position/{position}'
    router.delete('/position/:position', (req, res, next) => {
        //Extract the date from the request
        const positionRequested = req.params.position;
        //Send a json object with HTTP status code 200
        WaterQualities.remove({ positionName: positionRequested})
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