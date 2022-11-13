// APP.JS SETUP
// Express

var express = require('express');   
var app     = express();    
PORT = 4448;

// Database
var db = require('./database/db-connector')

// Express Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     
//Sets handlebars configurations
app.engine('.hbs', engine({extname: ".hbs"})); 
app.set('view engine', '.hbs'); 

app.use(express.static(__dirname + '/public'));


app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Routes

app.get('/', function(req, res)
  {
    res.render('index');                  
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

// Competitions

app.get('/competitions', function (req, res){
  //Search
  let query1;
  if (req.query.competitionName === undefined)
  {
    query1 = "SELECT * FROM Competitions;";
  }
  else 
  {
    query1 = `SELECT * FROM Competitons WHERE competitionName LIKE "${req.query.competitionName}%"`;
  }

  db.pool.query(query1, function(error, rows, fields) {
    let competitionName = rows;
    res.render('competitions', {data: competitionName});
  });
});

// Create Competitions
app.post('/add-competition-ajax', function(req, res) {
  let data = req.body;
  
  // Create Competitions Query
 
  query1 = `INSERT INTO Competitions(competitionName,date,startTime,locationName,locationAddress,LocationPhone)
  VALUES (
      '${data.competitionName}',
      '${data.date}',
      '${data.startTime}',
      '${data.locationName}',
      '${data.locationAddress}',
      '${data.locationPhone}')`;
  
    
  db.pool.query(query1, function(error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400);
    }
    else
        {
            // If there was no error, perform a SELECT all from Competitions
            query2 = `SELECT Competitions.competitionID, Competitions.competitionName, Competitions.date, Competitions.startTime, Competitions.locationName, Competitions.locationAddress, Competitions.locationPhone FROM Competitions ORDER BY Competitions.competitionID ASC;`;
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
app.put('/put-competition-ajax', function(req, res, next) {
  let data = req.body;
  let competitionID = parseInt(data.id);
  let selectCompetition = 'SELECT competitionID,CompetitionName,date,startTime,locationName,locationAddress,locationPhone FROM Competitions WHERE competitionID = ?';
  let updateCompetition = `UPDATE Competitions SET competitionName = '${data.competitionName}', date = '${data.date}', startTime = '${data.startTime}', locationName = '${data.locationName}', locationAddress = '${data.locationAddress}', locationPhone = '${data.locationPhone}' WHERE competitionID = ?;`
  let competitionName = data.competitionNameValue;
  let date = data.dateValue;
  let startTime = data.startTimeValue;
  let locationName = data.locationNameValue;
  let locationAddress = data.locationAddressValue;
  let locationPhone = data.locationPhoneValue;

  db.pool.query(
    updateCompetition,
    [
      competitionID,
      competitionName,
      date,
      startTime,
      locationName,
      locationAddress,
      locationPhone
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
app.delete('delete-competition-ajax', function(req, res, next) {
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


// LISTENER

app.listen(PORT, function () {
  console.log('Express started on http://flip2.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});



