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

app.use(express.static(__dirname + '/views'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Database
var db = require('./database/db-connector')

// Routes - Homepage

app.get('/', function(req, res)
  {
      res.render('./index');                    
  });   

app.get('/', function(req, res) {
  res.render('./competitions')
});

// Competitions

app.get('/competitions', function (req, res){
  //Search
  let competitions;
  if (req.query.competitionName === undefined) {
    competitions = 'SELECT competitionID as `ID`, competitionName as `Competition Name`, Date, startTime as `Start Time`, locationName as `Location Name`, locationAddress as `Location Address`,locationPhone as `Location Phone` FROM Competitions;';
  } else {
    competitions = `SELECT competitionID as "ID", competitionName as "Competition Name", Date, startTime as "Start Time", locationName as "Location Name", locationAddress as "Location Address", locationPhone as "Location Phone" FROM Competitions WHERE competitionName '${req.query.compeitionName}%';`;
    
  }

  db.pool.query(competitions, function(error, rows, fields) {
    return res.render('competitions', {data: rows});
  });
});

// Create Competitions
app.post('/addCompetition', function(req, res) {
  let data = req.body;

  // Create Competitions Query
  query1 = `INSERT INTO Competitions(competitionName,date,startTime,locationName,locationAddress,LocationPhone)
  VALUES (
    '${data['input-competitionName']}', 
    '${data['input-date']}', 
    '${data['input-startTime']}', 
    '${data['input-locationName']}', 
    '${data['input-locationAddress']}, 
    '${data['input-locationPhone']}')`;
  db.pool.query(query1, function(error, rows, fields) {
    if (error) {
      res.sendStatus(400);
    }
    else
        {
            // If there was no error, perform a SELECT all from Competitions
            query2 = `SELECT competitionID as "ID", competitionName as "Competition Name", Date, startTime as "Start Time", locationName as "Location Name",locationAddress as "Location Address",locationPhone as "Location Phone" FROM Competitions`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            });       
        }
    });
  });
// Update Competition
app.put('/updateCompetition', function(req, res, next) {
  let data = req.body;
  let competitionID = parseInt(data.id);
  let selectCompetition = 'SELECT competitionID,CompetitionName,date,startTime,locationName,locationAddress,locationPhone FROM Competitions WHERE competitionID = ?';
  let updateCompetition = 'UPDATE Competitions SET CompetitionName = ?, data = ?, startTime = ?, locationName = ?, locationAddress = ?, locationPhone = ? WHERE competitionID = ?';

  db.pool.query(
    updateCompetition,
    [
      data['competitionName'],
      data['date'],
      data['startTime'],
      data['locationName'],
      data['locationAddress'],
      data['locationPhone'],
      competitionID,

    ],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      }
      else {
        res.send(rows);
      }
    }
  );
});
// Delete Competition
app.delete('deleteCompetition', function(req, res, next) {
  let data = req.body;
  let competitionID = parseInt(data.id);
  let deleteCompetition = 'DELETE FROM Competitions WHERE competitionID = ?';

  db.pool.query(deleteCompetition, [competitionID], function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    }
    else {
      res.sendStatus(204);
    }
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
