// APP.JS SETUP

// Express
var express = require('express');   
var app     = express();    
app.use(express.json());
app.use(express.urlencoded({extended: true}));

PORT = 8484;

// Database
var db = require('./database/db-connector')
// Body Parser
var bodyParser = require('body-parser'); //Added bodyparser for POST
app.use(bodyParser.json());
// Express Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     
const { argvOptions, resetColumns } = require('forever/lib/forever/cli');
//Sets handlebars configurations
app.engine('.hbs', engine({extname: ".hbs"})); 
app.set('view engine', '.hbs'); 
//Serving static files
app.use(express.static(__dirname + '/public'));

// Date Time Formatting
const handlebars = require('handlebars');
const hbtdate = require('handlebars-helper-formatdate')(handlebars);
// Express Middleware for Security
// Content Security Policy
const helmet = require("helmet");

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    "block-all-mixed-content": false,
    "upgrade-insecure-requests": true,
    'script-src-attr': null,
    directives: {
      "default-src": [
          "'self'",
          "blob:", 
          "data:", 
          "gap:",
          
      ],
      "base-uri": "'self'",
      "font-src": [
          "'self'",
          "https:",
          "data:",
          "https://fonts.gstatic.com"
      ],
      "frame-ancestors": [
          "'self'"
      ],
      "img-src": [
          "'self'",
          "data:",
          "http://127.0.0.1/favicon.ico"
      ],
      "object-src": [
          "'none'"
      ],
      "form-action": [
        "'self'"
      ],
      "script-src": [
          "'self'",
          "data:",
          "https:",
          "'unsafe-inline'",
          "http://code.jquery.com/jquery-latest.min.js",
          "http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"

      ],
      "style-src": [
          "'self'",
          "data:",
          "'unsafe-inline'",
          "https://fonts.googleapis.com"
      ],
    },
  }),
  helmet.dnsPrefetchControl({
      allow: true
  }),
  helmet.frameguard({
      action: "deny"
  }),
  helmet.hidePoweredBy(),
  helmet.hsts({
      maxAge: 123456,
      includeSubDomains: false
  }),
  helmet.ieNoOpen(),
  helmet.noSniff(),
  helmet.referrerPolicy({
      policy: [ "origin", "unsafe-url" ]
  }),
  helmet.xssFilter()
);
// Routes 

app.get('/', function(req, res)
  {
    return res.render('index');                  
  });   


// Routes - Competitions

app.get('/competitions', function (req, res){
  let competitions;
  console.log(req.query.competitionName)
  if (req.query.competitionName === undefined)
  {
    competitions = `SELECT competitionID as 'ID', competitionName as 'Competition', date as 'Date', startTime as 'Time', locationName as 'Location',
    locationAddress as 'Address',locationPhone as 'Phone' FROM Competitions;`;
  }
  else 
  {
    competitions = `SELECT competitionID as 'ID', competitionName as 'Competition', date as 'Date', startTime as 'Time', locationName as 'Location',
    locationAddress as 'Address',locationPhone as 'Phone' FROM Competitions
    Where competitionName LIKE "%${req.query.competitionName}%";`;
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
  let competitionID = parseInt(data.competitionID)
  let competitionName = data.competitionName;
  let date = data.date;
  let startTime = data.startTime;
  let locationName = data.locationName;
  let locationAddress = data.locationAddress;
  let locationPhone = data.locationPhone;
  
  updateCompetition = `UPDATE Competitions SET competitionName = ?, date = ?, startTime = ?, locationName = ?, locationAddress =  ?, locationPhone = ? WHERE competitionID = ?`;
  selectCompetitionsupdates =`SELECT competitionName, date, startTime, locationName, locationAddress, locationPhone FROM Competitions WHERE competitionID =?;`;
    db.pool.query(updateCompetition,
        [
        competitionName,
        date,
        startTime,
        locationName,
        locationAddress,
        locationPhone,
        competitionID
       ],
       
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      }
      else {
        db.pool.query(selectCompetitionsupdates, [competitionID], function(error, rows, fields){
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
    WHERE eventName = "%${req.query.eventName}%"`;
     }      
  let competitions = `SELECT competitionID as 'ID', competitionName as 'Competition', Date, startTime as 'Time', locationName as 'Location',
  locationAddress as 'Address',locationPhone as 'Phone' FROM Competitions;`;

  let divisions = `SELECT divisionID as 'ID', divisionName as 'Division' FROM Divisions;`;
  
  let eventlevels = `SELECT eventlevelID as 'ID', eventLevelName as 'EventLevel' FROM EventLevels;`;
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
 
    query1 = `INSERT INTO Events(eventName, competitionID, divisionID, eventlevelID)
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
 
// Delete Event
app.delete('/delete-event/', function(req, res, next) {
  let data = req.body;
  let eventID = parseInt(data.id);
  let deleteEvent = 'DELETE FROM Events WHERE eventID = ?';

  db.pool.query(deleteEvent, [eventID], function(error, rows, fields) {
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
    athletes = `SELECT athleteID as 'ID', athleteName as 'Athlete', teamName as 'Team', divisionName as 'Division', 
    athletePhone as 'Athlete-Phone', athleteEmail as 'Athlete-Email', athleteAddress as 'Athlete-Address',
    athleteDOB as 'DOB', athleteAge as 'Age'
    FROM Athletes
    LEFT JOIN Teams ON Athletes.teamID = Teams.teamID
    LEFT JOIN Divisions ON Athletes.divisionID = Divisions.divisionID ORDER BY athleteID ASC` ;
  }
  else 
  {
    athletes = `SELECT athleteID as 'ID', athleteName as 'Athlete', teamName as 'Team', divisionName as 'Division',
    athletePhone as 'Athlete-Phone', athleteEmail as 'Athlete-Email', athleteAddress as 'Athlete-Address',
    athleteDOB as 'DOB', athleteAge as 'Age'
    FROM Athletes
    LEFT JOIN Teams ON Athletes.teamID = Teams.teamID
    LEFT JOIN Divisions ON Athletes.divisionID = Divisions.divisionID WHERE athleteName LIKE "%${req.query.athleteName}%";`;
  }

  let divisions = `SELECT divisionID as 'ID', divisionName as 'Division' FROM Divisions;`;
  let teams =  `SELECT teamID as 'ID', teamName as 'Team'  FROM Teams;`;

  db.pool.query(athletes, function(error, rows, fields) {
    
      let athletedata = rows;

      db.pool.query(divisions,function(error,rows,fields){

        let divisions = rows;
           
          db.pool.query(teams, function(error,rows,fields){

            let teams = rows;
            return res.render('athletes', {data: athletedata, divisionsdata: divisions, teamsdata: teams});
          })
      })    
  });
  });
  

// Create Athletes
app.post('/add-athlete-ajax', function(req, res) {
  let data = req.body;
  let teamID = parseInt(data.teamID)
  if (isNaN(teamID))
  {
    teamID = 'NULL'
  }
  let divisionID = parseInt(data.divisionID)
  if (isNaN(divisionID))
  {
    divisionID = 'NULL'
  }
  // Create Athletes Query
 
    query1 = `INSERT INTO Athletes(teamID,divisionID,athleteName, athletePhone, athleteEmail, athleteAddress, athleteDOB, athleteAge)
    VALUES (
      '${teamID}',
      '${divisionID}',
      '${data.athleteName}',
      '${data.athletePhone}',
      '${data.athleteEmail}',
      '${data.athleteAddress}',
      '${data.athleteDOB}',
      '${data.athleteAge}')`;
  
    
  db.pool.query(query1, function(error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400);
    }
    else
        {
            // If there was no error, perform a SELECT all from Competitions
            query2 = `SELECT Athletes.athleteID as 'ID', athleteName as 'Athlete', Teams.teamName as 'Team', Divisions.divisionName as 'Division', 
            athletePhone as 'AthletePhone', athleteEmail as 'AthleteEmail', athleteAddress as 'AthleteAddress',
            athleteDOB as 'DOB', athleteAge as 'Age'
            FROM Athletes
            LEFT JOIN Teams ON Athletes.teamID = Teams.teamID
            LEFT JOIN Divisions ON Athletes.divisionID = Divisions.divisionID;`;
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
  let athleteID = data.athleteID;
  if (isNaN(athleteID)){
    athleteID = null
  }
  let teamID = data.teamID;
  if (isNaN(teamID)){
    teamID = null
  }
  let divisionID = data.divisionID;
  let athleteName = data.athleteName;
  let athletePhone = data.athletePhone;
  let athleteEmail = data.athleteEmail;
  let athleteAddress = data.athleteAddress;
  let athleteDOB = data.athleteDOB
  let athleteAge = data.athleteAge

  updateAthlete = `UPDATE Athletes SET teamID = ?, divisionID = ?, athleteName = ?, athletePhone= ?,
  athleteEmail = ?, athleteAddress = ?,athleteDOB = ?, athleteAge = ? WHERE athleteID = ?;`
  selectAthleteupdates = `SELECT athleteName, Teams.teamName, Divisions.divisionName, 
            athletePhone, athleteEmail, athleteAddress,athleteDOB, athleteAge FROM Athletes
            INNER JOIN Teams ON Athletes.teamID = Teams.teamID
            INNER JOIN Divisions ON Athletes.divisionID = Divisions.divisionID where athleteID = ?;`;
  
    db.pool.query(
      updateAthlete,

        [
        teamID,
        divisionID,
        athleteName,
        athletePhone,
        athleteEmail,
        athleteAddress,
        athleteDOB,
        athleteAge,
        athleteID
       ],

    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      }
      else {
      db.pool.query(selectAthleteupdates, [athleteID], function(error, rows, fields){
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
    coachEmail as 'Coach-Email' FROM Teams WHERE teamName =  LIKE "%${req.query.teamName}%";`;
  }
  
  db.pool.query(teams, function(error, rows, fields) {
    return res.render('teams', {data: rows});
  });
  });
  

// Create Teams
app.post('/add-teams-ajax', function(req, res) {
  let data = req.body;
  
  // Create Teams Query
 
    query1 = `INSERT INTO Teams(teamName,coachName,coachPhone,CoachEmail)
    VALUES (
      "${data.teamName}",
      "${data.coachName}",
      "${data.coachPhone}",
      "${data.coachEmail}"
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
app.delete('/delete-teams/', function(req, res, next) {
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

// Routes = Athletes Events
app.get('/athletes-events', function (req, res){
  let athletesevents;
  
  if (req.query.athleteName  === undefined)
  { 
    athletesevents = `SELECT athlete_eventID as 'ID', Athletes.athleteName as 'Athlete',
    Events.eventName as 'Event-Name', EventLevels.eventLevelName as 'Event-Level', Divisions.divisionName as 'Athlete-Division'
    FROM Athletes_Events
    LEFT JOIN Athletes ON Athletes_Events.athleteID =  Athletes.athleteID
    LEFT JOIN Divisions ON Divisions.divisionID = Athletes.divisionID
    LEFT JOIN Events ON Athletes_Events.eventID = Events.eventID
    LEFT JOIN EventLevels ON Events.eventlevelID = EventLevels.eventlevelID;`;
  }
  else 
  {
    
    athletesevents = `SELECT athlete_eventID as 'ID', Athletes.athleteName as 'Athlete',
    Events.eventName as 'Event-Name', EventLevels.eventLevelName as 'Event-Level', Divisions.divisionName as 'Athlete-Division'
    FROM Athletes_Events
    LEFT JOIN Athletes ON Athletes_Events.athleteID =  Athletes.athleteID
    LEFT JOIN Divisions ON Divisions.divisionID = Athletes.divisionID
    LEFT JOIN Events ON Athletes_Events.eventID = Events.eventID
    LEFT JOIN EventLevels ON Events.eventlevelID = EventLevels.eventlevelID
    WHERE Athletes_Events.athleteID IN (SELECT athleteId FROM Athletes WHERE athleteName Like "%${req.query.athleteName}%");`;
     }      
  
  let events = `SELECT eventID as 'ID',eventName as 'Event', Competitions.competitionName as 'Competition',
  Divisions.divisionName as 'Division', EventLevels.eventlevelName as 'Event-Level'
  FROM Events
  INNER JOIN Competitions ON Events.competitionID = Competitions.competitionID
  INNER JOIN Divisions ON Events.divisionID = Divisions.divisionID
  INNER JOIN EventLevels ON Events.eventlevelID = EventLevels.eventlevelID;`;

  let athletes = `SELECT athleteID as 'ID', athleteName as 'Athlete', divisionName as 'Division'
  From Athletes
  LEFT JOIN Divisions on Athletes.divisionID = Divisions.divisionID;`;

 
  
  
    db.pool.query(athletesevents, function(error, rows, fields) {
        
      let athleteseventsdata = rows;

        db.pool.query(events, function(error, rows, fields){

          let eventsrows= rows;
          
            db.pool.query(athletes, function(error, rows, fieldss){
                
              let athletesrows = rows;

                    
                  return res.render('athletes-events', {data: athleteseventsdata, eventsdata:eventsrows, athletesdata:athletesrows }); 
                })
                })
                });
});

// Create Athletes Events
app.post('/add-athletes-events-ajax', function(req, res) {
  let data = req.body;

  // Create Athletes Events Query
 
    query1 = `INSERT INTO Athletes_Events(athleteID, eventID)
    VALUES(
      '${data.athleteID}',
      '${data.eventID}')`;
    
  db.pool.query(query1, function(error, rows, fields) {
    if (error) {
      console.log(error)
      res.sendStatus(400);
    }
    else
        {
          
        query2 = `SELECT athlete_eventID as 'ID', Athletes.athleteName as 'Athlete', Events.eventName as 'Event',
        EventLevels.eventlevelName as 'EventLevel', Divisions.divisionName as 'Division'
        FROM Athletes_Events
        LEFT JOIN Athletes ON Athletes_Events.athleteID = Athletes.athleteID
        LEFT JOIN Events ON Athletes_Events.eventID = Events.eventID
        LEFT JOIN EventLevels ON Events.eventlevelID = EventLevels.eventlevelID
        LEFT JOIN Divisions ON Events.divisionID = Divisions.divisionID;`;  
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
   // Delete Athletes - Events
app.delete('/delete-athletes-events/', function(req, res, next) {
  let data = req.body;
  let athlete_eventID = parseInt(data.id);
  let deleteAthletes_Events = 'DELETE FROM Athletes_Events WHERE Athletes_Events.athlete_eventID = ? ';

  db.pool.query(deleteAthletes_Events, [athlete_eventID], function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    }
    else {
      res.sendStatus(204);
      
    }
  });
});

    // Update Athletes - Events
app.put('/put-athletes-events-ajax/', function(req, res, next) {
  let data = req.body;
  let athlete_eventID = parseInt(data.athlete_eventID)
  let athleteID = parseInt(data.athleteID)
  let eventID = parseInt(data.eventID)
  if(isNaN(athleteID)){
    athleteID = null
  }
  if(isNaN(eventID)){
    eventID = null
  }
  console.log(athleteID)
  updateAthlete_Events = `UPDATE Athletes_Events SET athleteID = ?, eventID = ? WHERE athlete_eventID =?`
  selectAthlete_Eventsupdates = `SELECT Athletes.athleteName, Events.eventName,
  EventLevels.eventlevelName, Divisions.divisionName
  FROM Athletes_Events
  LEFT JOIN Athletes ON Athletes_Events.athleteID = Athletes.athleteID
  LEFT JOIN Events ON Athletes_Events.eventID = Events.eventID
  LEFT JOIN EventLevels ON Events.eventlevelID = EventLevels.eventlevelID
  LEFT JOIN Divisions ON Events.divisionID = Divisions.divisionID
  WHERE athlete_eventID = ?;`

    db.pool.query(updateAthlete_Events,[athleteID,eventID,athlete_eventID],function(error,rows,fields){
      console.log(updateAthlete_Events);    
      if (error){
        console.log(error);
        res.sendtatus(400);
      }
      else{
      db.pool.query(selectAthlete_Eventsupdates, [athlete_eventID],function(error,rows,fields){
        if(error){
          console.log(error)
          res.sendStatus(400);
        }
        else{
          res.send(rows);
          console.log(rows);
        }
      })  
      }
      })    
});

// LISTENER

app.listen(PORT, function () {
  console.log('Express started on http://flip2.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});
