// APP.JS SETUP

// Express
var express = require('express');   
var app     = express();    
app.use(express.json());
app.use(express.urlencoded({extended: true}));
PORT = 8040;

// Database
var db = require('./database/db-connector')
// Body Parser
var bodyParser = require('body-parser'); //Added bodyparser for POST
app.use(bodyParser.json());
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

// Routes - Competitions

app.get('/competitions', function (req, res){
  let competitions;
  if (req.query.competitionName === undefined)
  {
    competitions = `SELECT competitionID as 'ID', competitionName as 'Competition', Date, startTime as 'Time', locationName as 'Location',
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
            query2 = `SELECT Competitions.competitionID, Competitions.competitionName, Competitions.date, Competitions.startTime, Competitions.locationName, Competitions.locationAddress, Competitions.locationPhone FROM Competitions ORDER BY Competitions.competitionID ASC;`;
            db.pool.query(query2, function(error, rows, fields){

                
                if (error) {                    
                    console.log(error);
                    res.sendStatus(400);
                }
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
  
  let selectCompetition = `SELECT competitionID, competitionName, data, startTime, locationName, locationAddress, locationPhone FROM Competitons WHERE competitionID = ?`
    db.pool.query(
      updateCompetition,

        [
        competitionID,
        competitionName,
        date,
        startTime,
        locationName,
        locationAddress,
        locationPhone,
       ],

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

// Routes - Events
app.get('/events', function (req, res){
  let events;
  
  if (req.query.eventName === undefined)
  {
    events = `SELECT eventID as 'ID',eventName as 'Event', Competitions.competitionName as 'Competition',
    Divisions.divisionName as 'Division', EventLevels.eventlevelName as 'Event-Level'
    FROM Events
    INNER JOIN Competitions ON Events.competitionID = Competitions.competitionID
    INNER JOIN Divisions ON Events.divisionID = Divisions.divisionID
    INNER JOIN EventLevels ON Events.eventlevelID = EventLevels.eventlevelID;`;
  }
  else 
  {
    events = `SELECT eventID as 'ID',eventName as 'Event', Competitions.competitionName as 'Competition',
    Divisions.divisionName as 'Division', EventLevels.eventlevelName as 'Event-Level'
    FROM Events
    INNER JOIN Competitions ON Events.competitionID = Competitions.competitionID
    INNER JOIN Divisions ON Events.divisionID = Divisions.divisionID
    INNER JOIN EventLevels ON Events.eventlevelID = EventLevels.eventlevelID
    WHERE eventName = "${req.query.eventName}%"`;
     }      
  let competitions = `SELECT competitionID as 'ID', competitionName as 'Competition', Date, startTime as 'Time', locationName as 'Location',
  locationAddress as 'Address',locationPhone as 'Phone' FROM Competitions;`;

  let divisions = `SELECT divisionID as 'ID', divisionName as 'Division' FROM Divisions;`;
  
  let eventlevels = `SELECT eventlevelID as 'ID', eventLevelName as 'Event-Level' FROM EventLevels;`;
  db.pool.query(events, function(error, rows, fields) {
      
      let eventsdata = rows;

      db.pool.query(competitions,function(error, rows, fields){

        let competitions = rows;

          db.pool.query(divisions,function(error, rows, fieldss){

            let divisions = rows;

              db.pool.query(eventlevels,function(error, rows, fields){

                let eventlevels = rows;
                return res.render('events', {data: eventsdata, competitionsdata:competitions, divisionsdata: divisions, eventlevelsdata: eventlevels});
              })
          })
      })
      
  });
  });

  // Create Events
app.post('/add-event-ajax', function(req, res) {
  let data = req.body;
  
  // Create Events Query
 
    query1 = `INSERT INTO Events(Event, Competition, Division, Event-Level)
    VALUES (
      '${data.eventName}',
      '${data.competitionName}',
      '${data.divisionName}',
      '${data.eventlevelName}'
      )`;
    
    
  db.pool.query(query1, function(error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400);
    }
    else
    {

      query2 = `SELECT eventID as 'ID',eventName as 'Event', Competitions.competitionName as 'Competition',
      Divisions.divisionName as 'Division', EventLevels.eventlevelName as 'EventLevel'
      FROM Events
      INNER JOIN Competitions ON Events.competitionID = Competitions.competitionID
      INNER JOIN Divisions ON Events.divisionID = Divisions.divisionID
      INNER JOIN EventLevels ON Events.eventlevelID = EventLevels.eventlevelID;`;
      db.pool.query(query2,function(error,rows,fields){
        if (error) {                    
          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error);
          res.sendStatus(400);
        }
        else
      {
      res.send(rows);            
    }
    })
    }
    })
  })
  // Update Event
app.put('/put-event-ajax', function(req, res, next) {
  let data = req.body;
  let eventID = parseInt(data.id);
  let competitionID = data.competitionIDValue;
  let divisionID = data.divisionIDValue;
  let eventlevelID = data.eventlevelIDValue;
  let eventName = data.eventNameValue;
  

  let updateEvent = `UPDATE Events SET competitionID = 
   '${data.competitionID}', divisionID = '${data.divisionID}', eventlevelID = '${data.eventlevelID}', eventName = '${data.eventName}' WHERE eventID = ?;`
  
  let selectEvent = `SELECT EventID,competitionID,DivisionID,eventlevelID,eventName FROM Events
  WHERE eventID =  ?`
    db.pool.query(
      updateEvent,

      [
        eventID,
        competitionID,
        divisionID,
        eventlevelID,
        eventName
        
      ],

    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      }
      else {
      db.pool.query(selectEvent, [eventID], function(error, rows, fields){
        if (error) {
          console.log(error)
          res.sendStatus(400);
        }
        else {
          res.send(rows);
          
        }
      })
      
    }
  })
});

// Delete Event
app.delete('/delete-event/', function(req, res, next) {
  let data = req.body;
  let eventID = parseInt(data.id);
  let deleteEvents = 'DELETE FROM Events WHERE Events.eventID = ?';

  db.pool.query(deleteEvents, [eventID], function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    }
    else {
      res.sendStatus(204);
      
    }
  });
});


// Routes - event-levels
app.get('/event-levels', function (req, res){
  
  query1 = `SELECT eventlevelID as 'ID', eventLevelName as 'Event-Level' FROM EventLevels;`;
      
  db.pool.query(query1, function(error, rows, fields) {
      
      return res.render('event-levels', {data: rows});
  });
  });

  // Create Event-levels
app.post('/add-event-level-ajax', function(req, res) {
  let data = req.body;
  
  // Create Events Query
 
    eventlevelsq = `INSERT INTO EventLevels(eventLevelName)   
    VALUES (
      '${data.eventlevelName}')`;
    console.log(eventlevelsq)

  db.pool.query(eventlevelsq, function(error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400);
    }
    else 
    {
      // If there was no error, perform a SELECT all from Competitions
      eventlevelsq2 = `SELECT eventlevelID,  eventlevelName FROM EventLevels ORDER BY eventlevelID ASC;`;
      db.pool.query(eventlevelsq2, function(error, rows, fields){

          // If there was an error on the second query, send a 400
          if (error) {                    
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
          }
          else
          {
        res.send(rows);
        }
        })
       }
      })
    });

  // Delete Event Level
app.delete('/delete-event-level/', function(req, res, next) {
  let data = req.body;
  let eventlevelID = parseInt(data.id);
  let deleteEventLevel = 'DELETE FROM EventLevels WHERE eventlevelID = ?';

  db.pool.query(deleteEventLevel, [eventlevelID], function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    }
    else {
      res.sendStatus(204);
      
    }
  });
});

// Routes - Divisions
app.get('/divisions', function (req, res){
  
  
  let divisions = `SELECT divisionID as 'ID', divisionName as 'Division' FROM Divisions;`;
  
  
  db.pool.query(divisions, function(error, rows, fields) {
    return res.render('divisions', {data: rows});
  });
  });
  

// Create Divisions
app.post('/add-division-ajax', function(req, res) {
  let data = req.body;
  
  // Create Divisions Query
 
    query1 = `INSERT INTO Divisions(divisionName)
    VALUES (
      '${data.divisionName}')`;
  
    
  db.pool.query(query1, function(error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400);
    }
    else
        {
            // If there was no error, perform a SELECT all from Competitions
            query2 = `SELECT Divisions.divisionID, Divisions.divisionName FROM Divisions ORDER BY Divisions.divisionID ASC;`;
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


// Delete Division
app.delete('/delete-division/', function(req, res, next) {
  let data = req.body;
  let divisionID = parseInt(data.id);
  let deleteDivisions = 'DELETE FROM Divisions WHERE divisionID = ?';

  db.pool.query(deleteDivisions, [divisionID], function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    }
    else {
      res.sendStatus(204);
      
    }
  });
});

// Routes - Athletes

app.get('/athletes', function (req, res){
  let athletes;
  if (req.query.athleteName === undefined)
  {
    athletes = `SELECT Athletes.athleteID as 'ID',Teams.teamName as 'Team', Divisions.divisionName as 'Division', athleteName as 'Athlete',
    athletePhone as 'Athlete-Phone', athleteEmail as 'Athlete-Email', athleteAddress as 'Athlete-Address',
    athleteDOB as 'DOB', athleteAge as 'Age'
    FROM Athletes
    INNER JOIN Teams ON Athletes.teamID = Teams.teamID
    INNER JOIN Divisions ON Athletes.divisionID = Divisions.divisionID`;
  }
  else 
  {
    athletes = `SELECT Athletes.athleteID as 'ID',Teams.teamName as 'Team', Divisions.divisionName as 'Division', athleteName as 'Athlete-Name',
    athletePhone as 'Athlete-Phone', athleteEmail as 'Athlete-Email', athleteAddress as 'Athlete-Address',
    athleteDOB as 'DOB', athleteAge as 'Age'
    FROM Athletes
    INNER JOIN Teams ON Athletes.teamID = Teams.teamID
    INNER JOIN Divisions ON Athletes.divisionID = Divisions.divisionID WHERE athleteName LIKE "${req.query.athleteName}%";`;
  }
  
  db.pool.query(athletes, function(error, rows, fields) {
    return res.render('athletes', {data: rows});
  });
  });
  

// Create Athletes
app.post('/add-athletes-ajax', function(req, res) {
  let data = req.body;
  
  // Create Athletes Query
 
    query1 = `INSERT INTO Athletes(teamID,divisionID,athleteName, athletePhone, athleteEmail, athleteAddress, athleteDOB, athleteAge)
    VALUES (
      '${data.teamID}',
      '${data.competitionID}',
      '${data.athleteName}',
      '${data.athletePhone}',
      '${data.athleteEmail}',
      '${data.athleteAddress},
      '${data.athleteDOB}
      '${data.athleteAge}')`;
  
    
  db.pool.query(query1, function(error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400);
    }
    else
        {
            // If there was no error, perform a SELECT all from Competitions
            query2 = `SELECT Athletes.athleteID, Athletes.athleteName FROM Athletes ORDER BY Athletes.athleteID ASC;`;
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

// Update Athlete
app.put('/put-athlete-ajax', function(req, res, next) {
  let data = req.body;
  let athleteID = parseInt(data.id);
  let teamID = data.teamIDValue;
  let competitionID = data.competitionIDValue;
  let athleteName= data.athleteNameValue;
  let athletePhone = data.athletePhoneValue;
  let athleteEmail = data.athleteEmailValue;
  let athleteAddress = data.athleteAddressValue;
  let athleteDOB = data.athleteDOBValue;
  let athleteAge = data.athleteAgeValue;

  let updateAthlete = `UPDATE athletes SET teamID = '${data.teamID}', divisionID = '${data.divisionID}', athleteName = '${data.athleteName}', athletePhone= '${data.athletePhone}',
  athleteEmail = '${data.athleteEmail}', athleteAddress = '${data.athleteAddress}', athleteAge = '${data.athleteAge}' WHERE athleteID = ?;`
  
  let selectAthlete = `SELECT athleteID, teamID, divisionID, athleteName,AthletePhone, athleteEmail,athleteAddress,athleteAge
  FROM Athletes
  WERE Athletes.athleteID = ?`
    db.pool.query(
      updateAthlete,

        [
        athleteID,
        teamID,
        competitionID,
        athleteName,
        athletePhone,
        athleteEmail,
        athleteAddress,
        athleteDOB,
        athleteAge
       ],

    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      }
      else {
      db.pool.query(selectAthlete, [athleteID], function(error, rows, fields){
        if (error) {
          console.log(error)
          res.sendStatus(400);
        }
        else {
          res.send(rows);
          res.redirect('/athletes');
        }
      })
      
    }
  })
});

// Delete Athlete
app.delete('/delete-athlete/', function(req, res, next) {
  let data = req.body;
  let athleteID = parseInt(data.id);
  let deleteAthletes = 'DELETE FROM Athletes WHERE athleteID = ?';

  db.pool.query(deleteAthletes, [athleteID], function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    }
    else {
      res.sendStatus(204);
      
    }
  });
});

// Routes - Teams

app.get('/teams', function (req, res){
  let teams;
  if (req.query.teamName === undefined)
  {
    teams = `SELECT teamID as 'ID', teamName as 'Team', coachName as 'Coach-Name', coachPhone as 'Coach-Phone', 
    coachEmail as 'Coach-Email' FROM Teams;`;
  }
  else 
  {
    teams = `SELECT teamID as 'ID', teamName as 'Team', coachName as 'Coach-Name', coachPhone as 'Coach-Phone', 
    coachEmail as 'Coach-Email' FROM Teams WHERE teamName =  LIKE "${req.query.teamName}%";`;
  }
  
  db.pool.query(teams, function(error, rows, fields) {
    return res.render('teams', {data: rows});
  });
  });
  

// Create Teams
app.post('/add-teams-ajax', function(req, res) {
  let data = req.body;
  
  // Create Teams Query
 
    query1 = `INSERT INTO Teams(teamID, teamName,coachName,coachPhone,CoachEmail)
    VALUES (
      '${data.teamID}',
      '${data.teamName}',
      '${data.coachName}',
      '${data.coachPhone}',
      '${data.coachEmail}',
      )`;
  
    
  db.pool.query(query1, function(error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400);
    }
    else
        {
            // If there was no error, perform a SELECT all from Competitions
            query2 = `SELECT Teams.teamID, Teams.teamName, Teams.coachName, Teams.coachPhone, Teams.coachEmail FROM Teams ORDER BY Teams.teamID ASC;`;
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

// Delete Team
app.delete('/delete-team/', function(req, res, next) {
  let data = req.body;
  let teamID = parseInt(data.id);
  let deleteTeams = 'DELETE FROM Teams WHERE teamID = ?';

  db.pool.query(deleteTeams, [teamID], function(error, rows, fields) {
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


