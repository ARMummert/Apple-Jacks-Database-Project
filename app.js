// APP.JS SETUP
// Express

var express = require('express');   
var app     = express();    
PORT = 4418;
var os = require('os');

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Database
var db = require('./db-connector')

// ROUTES

app.get('/', function (req, res) {
  res.send('hi, this is our main page!')
});

//Exceptions Handling

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

// LISTENER

app.listen(PORT, function () {
  var hostname = os.hostname();
  console.log(
    `Server running on http://${hostname}:${PORT}/. Press Ctrl-C to terminate...`
  );
});
