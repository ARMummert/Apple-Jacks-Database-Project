// APP.JS SETUP

// Express
var express = require('express');   
var app     = express();    
app.use(express.json());
app.use(express.urlencoded({extended: true}));
PORT = 4460;

// Database
var db = require('./database/db-connector')

// Express Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     
//Sets handlebars configurations
app.engine('.hbs', engine({extname: ".hbs"})); 
app.set('view engine', '.hbs'); 
//Serving static files
app.use(express.static(__dirname + '/public'));

// Routes 

app.get('/', function(req, res)
  {
    return res.render('index');                  
  });   

// Competitions

app.get('/competitions', function (req, res){
let competitions;
if (req.query.competitionName === undefined)
{
  competitions = `SELECT competitionID as ID, competitionName as 'Competition', Date, startTime as 'Time', locationName as 'Location',
  locationAddress as 'Address',locationPhone as 'Phone' FROM Competitions;`;
}
else 
{
  competitions = `SELECT competitionID as 'ID', competitionName as 'Competition', Date, startTime as 'Time', locationName as 'Location',
  locationAddress as 'Address',locationPhone as 'Phone' FROM Competitions
  Where competitionName LIKE "${req.query.competitionName}%";`;
}

db.pool.query(competitions, function(error, rows, fields) {
  return res.render('competitions', {data: rows});
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
            })       
        }
    })
  });
// Update Competition
app.put('/put-competition-ajax', function(req, res, next) {
  let data = req.body;
  let competitionID = parseInt(data.id);
  let competitionName = data.competitionNameValue;
  let date = data.dateValue;
  let startTime = data.startTimeValue;
  let locationName = data.locationNameValue;
  let locationAddress = data.locationAddressValue;
  let locationPhone = data.locationPhoneValue;

  let updateCompetition = `UPDATE Competitions SET competitionName = 
   '${data.competitionName}', date = '${data.date}', startTime = '${data.startTime}', locationName = '${data.locationName}', locationAddress = '${data.locationAddress}', locationPhone = '${data.locationPhone}' WHERE competitionID = ?;`
  
  let selectCompetition = `SELECT * FROM Competitons WHERE competitionID = ?`
    db.pool.query(
      updateCompetition,

      [
        data['competitionName'],
        data['date'],
        data['startTime'],
        data['locationName'],
        data['locationAddress'],
        data['locationPhone'],
        competitionID
      ],
//     [
//        competitionID,
 //       competitionName,
 //       date,
  //      startTime,
    //    locationName,
      //  locationAddress,
      //  locationPhone
 //     ],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      }
      else {
      db.pool.query(selectCompetition, [competitionID], function(error, rows, fields){
        if (error) {
          console.log(error)
          res.sendStatus(400);
        }
        else {
          res.send(rows);
          res.redirect('/competitions');
        }
      })
      
    }
  })
});

// Delete Competition
app.delete('/delete-competition/', function(req, res, next) {
  let data = req.body;
  let competitionID = parseInt(data.id);
  let deleteCompetitions = 'DELETE FROM Competitions WHERE competitionID = ?';

  db.pool.query(deleteCompetitions, [competitionID], function(error, rows, fields) {
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
  console.log('Express started on http://flip3.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});
