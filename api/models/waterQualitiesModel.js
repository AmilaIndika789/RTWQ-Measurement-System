const mongoose = require('mongoose');

const waterQualitiesSchema = mongoose.Schema({
    date: Date,     //Date of the storage of data
    longitude: Number,   //Longitude of the end node
    latitude: Number, //Latitude of the end node
    temperature: Number,    //Temperature reading
    turbidity: Number,      //Turbidity reading
    pH: Number,     //pH reading
    conductivity: Number,   //Conductivity reading
    positionName: String    //Name of the position
});

module.exports = mongoose.model('WaterQualities', waterQualitiesSchema);    //Export the schema as a model
