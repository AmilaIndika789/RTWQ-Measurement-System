const mongoose = require('mongoose');   //Import mongoose

//Create a schema for the end node
const endNodeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,    //A string ID for the end nodes
    longitude: {type: Number, required: true},  //Longitude of the end node
    latitude: {type: Number, required: true},    //Latitude of the end node
    positionName: {type: String, required: true} //Name of the position
});

module.exports = mongoose.model('EndNode', endNodeSchema);  //Export the schema as a model