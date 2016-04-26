var express = require('express');
var morgan = require('morgan');

var hostname = 'localhost';
var port = 3000;

var app = express();
app.use(morgan('dev'));

// Routes for '/dishes'
var dishes = require('./dishRouter');
app.use('/dishes', dishes);

// Routes for '/promotions'
var promotions = require('./promoRouter');
app.use('/promotions', promotions);

// Routes for '/leadership'
var leadership = require('./leaderRouter');
app.use('/leadership', leadership);

// Routes for static files in '/public' folder
app.use(express.static(__dirname + '/public'));

// Start server
app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});