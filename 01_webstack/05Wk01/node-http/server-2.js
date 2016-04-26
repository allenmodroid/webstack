// Import module
var http = require('http');
var fs = require('fs');
var path = require('path');

// Initiliase variables
var hostname = 'localhost';
var port = 3000;

// Server details
var server = http.createServer(function(req, res){

  // Print request message
  console.log('Request for ' + req.url + ' by method ' + req.method);

  // Handle 'GET' request
  if (req.method == 'GET') {
    
    var fileUrl;

    // If request end with '/' point to index.html
    if (req.url == '/') fileUrl = '/index.html';
    // Otherwise use current url for further processing
    else fileUrl = req.url;

    // Build path starting from root
    var filePath = path.resolve('./public' + fileUrl);

    // Check extension of file in './public' folder
    var fileExt = path.extname(filePath);

    // File extension is '.html'
    if (fileExt == '.html') {

        // Check if file exist in './public' folder
        fs.exists(filePath, function(exists) {

            // If not exist
            if (!exists) {
                // Write error header file
                res.writeHead(404, { 'Content-Type': 'text/html' });
                // Write error body file
                res.end('<html><body><h1>Error 404: ' + fileUrl +
                    ' not found</h1></body></html>');

                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            fs.createReadStream(filePath).pipe(res);
        });

    } else {  // Request is not '.html'

        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<html><body><h1>Error 404: ' + fileUrl +
            ' not a HTML file</h1></body></html>');
    }

  // Error message for non 'GET' request
  } else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('<html><body><h1>Error 404: ' + req.method + 
                  ' not supported</h1></body></html>');
    }
})

// Function to start server
server.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});