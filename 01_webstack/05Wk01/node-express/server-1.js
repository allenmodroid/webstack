// Import modules
var express = require('express'),
     http = require('http');

// Initiliase server variables
var hostname = 'localhost';
var port = 3000;

var app = express();

// Create middleware
app.use(function (req, res, next) {
  console.log(req.headers);
  // Write response in resonse object
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<html><body><h1>Hello World</h1></body></html>');

});

// Create server
var server = http.createServer(app);

// Start server function
server.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});