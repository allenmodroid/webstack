// Import third party module
var express = require('express');
var morgan = require('morgan');

// Initialise server variables
var hostname = 'localhost';
var port = 3000;

var app = express();

// App use morgan as middleware - 'dev' is format that morgan support
app.use(morgan('dev'));

// Use middleware static - only support certain request "GET" not 'POST'
app.use(express.static(__dirname + '/public'));

// Start server
app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});