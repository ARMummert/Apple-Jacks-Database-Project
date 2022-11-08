// APP.JS SETUP

//Port
require('dotenv').config()
const port = process.env.PORT;

// Express
var express = require('express');   
var app     = express();    

              
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Database
var db = require('./db-connector')

// ROUTES

app.get('/',function(req,res){
  res.type('text/plain');
  res.send('Welcome to the main page!');
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

app.listen(process.env.PORT, (err) => {
   
	  if (err) {
		      return console.log('Error: Something went wrong!', err)
	  }

	    console.log(`server is listening on ${process.env.PORT}`)
})