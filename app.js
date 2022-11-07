// APP.JS SETUP

// Express
var express = require('express');   
var app     = express();            
               
// App Setup
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Port
PORT        = 4014;  

// Database
var db = require('./db-connector')

// ROUTES
app.get('/',function(req,res){

    var context = {};
    res.render('index', context);
  
  });

//Exceptions Handling
app.use(function(req, res) {
    res.status(404);
    res.render('404');
  });
  
app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500);
    res.render('500');
  })

// LISTENER

app.listen(app.get('port'), function () {
    console.log('Express started on http://flip2.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});