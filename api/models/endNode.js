const mongoose = require('mongoose');   //Import mongoose

//Create a schema for the end node
const endNodeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,    //A string ID for the end nodes
    longitude: Number,  //Longitude of the end node
    latitude: Number,    //Latitude of the end node
    positionName: String //Name of the position
});

module.exports = mongoose.model('EndNode', endNodeSchema);  //Export the schema as a model