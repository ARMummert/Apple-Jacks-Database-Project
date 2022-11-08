// APP.JS SETUP
// Express

var express = require('express');   
var app     = express();    
PORT = 4014;
var os = require('os');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Port
require('dotenv').config()
const port = process.env.PORT;

// Database
var db = require('./db-connector')

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

app.use(express.static(__dirname + '/Public')); //Express serves static files from public folder

// ROUTES

app.get('/', function (req, res) {
  res.render('index')
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
