const http = require('http');   //Import the http package
const app = require('./app');   //Import the app
/*
 * Get the port number form the environment variables or
 * Get the hard-coded port number of 3000 as default
 */
const port = process.env.PORT || 3000;

const server = http.createServer(app);     //Create the server

server.listen(port);    //Set the server to listen to incoming requests