// APP.JS SETUP
// Express

var express = require('express');   
var app     = express();    
PORT = 4448;
var os = require('os');
const { promisify } = require('promisify');


// Express Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Database
var db = require('./database/db-connector')

// Routes - Homepage

app.get('/', function(req, res)
    {
        res.render('/index');                    
    });     

// Competitions

app.get('/competitions', function (req, res){
  //Search
  let competitions;
  if (req.query.compeitionName === undefined) {
    competitions = 'SELECT * FROM Competitions;';
  } else {
    competitions = `SELECT * FROM Competitions WHERE competitionName LIKE '${req.query.compeitionName}%';`;
  }

  db.pool.query(competitions, function(error, rows, fields) {
    return res.render('competitions', {data: rows});
  });
});

app.get('/events', function(req, res){
  res.render('events')
});

app.get('/athletes', function(req, res){
  res.render('athletes')
});

app.get('/athletes-events', function(req, res){
  res.render('athletes-events')
});

app.get('/divisions', function(req, res){
  res.render('divisions')
});

app.get('/event-levels', function(req, res){
  res.render('event-levels')
});

app.get('teams', function(req, res){
  res.render('teams')
});

app.get('/project-development', function(req, res){
  res.render('project-development')
});

// Create Competitions
app.post('/update-')
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
