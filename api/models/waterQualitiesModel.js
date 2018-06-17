const mongoose = require('mongoose');

const waterQualitiesSchema = mongoose.Schema({
    date: {type: Date, required: true},     //Date of the storage of data
    longitude: {type: Number, required: true},   //Longitude of the end node
    latitude: {type: Number, required: true}, //Latitude of the end node
    temperature: {type: Number, required: true},    //Temperature reading
    turbidity: {type: Number, required: true},      //Turbidity reading
    pH: {type: Number, required: true},     //pH reading
    conductivity: {type: Number, required: true},   //Conductivity reading
    positionName: {type: String, required: true}    //Name of the position
});

module.exports = mongoose.model('WaterQualities', waterQualitiesSchema);    //Export the schema as a model
