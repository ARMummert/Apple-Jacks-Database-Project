--Project Group 4 Database Project - CS340 - Baton Twirling Competition Entry Form Database - DML Files
--Amy Mummert and Joel Vrieze

--get all competiitions
SELECT competitionID as `ID`, competitionName as `Competition Name`, Date, startTime as `Start Time`, locationName as `Location Name`,
locationAddress as `Location Address`,locationPhone as `Location Phone` FROM Competitions;

--get all competitions from a search by Name
SELECT competitionID as `ID`, competitionName as `Competition Name`, Date, startTime as `Start Time`, locationName as `Location Name`,
locationAddress as `Location Address`,locationPhone as `Location Phone` FROM Competitions
Where competitionName LIKE = :Search_input_field;

--add a new competition
INSERT INTO Competitions(competitionName,date,startTime,locationName,locationAddress,LocationPhone)
    VALUES(:CompetitionNameInput,:dateInput,:startTimeInput,:locationNameInput,:locationAddressInput,
           :LocationPhoneInput);

SELECT Competitions.competitionID, Competitions.competitionName, Competitions.date, Competitions.startTime, Competitions.locationName, Competitions.locationAddress, Competitions.locationPhone FROM Competitions ORDER BY Competitions.competitionID ASC;

--delete a competition
DELETE FROM Competitions where competitionID = :competitionID_selected_from_competition_page;

-- get all competitionIDs and Names to populate the Competition dropdown menus
SELECT competitionID, CompetitionName FROM Competitions;

--update a competition
SELECT competitionID,CompetitionName,date,startTime,locationName,locationAddress,locationPhone 
FROM Competitions 
WHERE competitionID = :competitionID_selected_from_competition_page_update_form_dropdown_Input;

UPDATE Competitions 
    SET CompetitionName = :CompetitionNameInput, date = :dateInput, statTime = startTimeInput,
        locationName = :locationNameInput, locationAddress = :locationAddressInput, 
        locationPhone = :LocationPhoneInput;
    WHERE competitionID = :competitionID_selected_from_competition_page_update_form_dropdown_Input;
    

--get all divisions
SELECT divisionID as `ID`, divisionName as `Division Name` FROM Divisions;

--get all divisions from a search by Name
SELECT divisionID as `ID`, divisionName as `Division Name` FROM Divisions
WHERE divisionName = :Search_input_field;

--add a new Division
INSERT INTO Divisions(divisionName)
    VALUES(:DivisonNameInput);

--delete a Division
DELETE FROM Divisions WHERE divisionID = :divsionIDInput;

--get all divisionIDs and divisionNames to populate Division dropdown menus
SELECT Divisions.divisionID, Divisions.divisionName FROM Divisions ORDER BY Divisions.divisionID ASC;

--get all eventLevels
SELECT eventlevelID as `ID`, eventLevelName as `Event Level Name` FROM EventLevels;

--get all eventLevels from a search by Name
SELECT eventlevelID as `ID`, eventLevelName as `Event Level Name` FROM EventLevels
WHERE eventLevelName = :Search_input_field

--add a new eventLevel
INSERT INTO EventLevels(eventlevelName)
    Values(:eventlevelNameInput);

--get all eventlevelIDs and eventlevelNames to populate EventLevel dropdown menu
SELECT eventlevelID, eventlevelName FROM EventLevels;

--delete an eventlevel
DELETE FROM EventLevels WHERE eventlevelID = :eventlevelNameInput;

--get all events 
SELECT eventID as `ID`,eventName as `Event Name`, Competitions.competitionName as Competition,
       Divisions.divisionName as Divsion, EventLevels.eventlevelName as ` Event Level` 
FROM Events
INNER JOIN Competitions ON Events.competitionID = Competitions.competitionID
INNER JOIN Divisions ON Events.divisionID = Divisions.divisionID
INNER JOIN EventLevels ON Events.eventlevelID = EventLevels.eventlevelID;

--get all events from a search by Name
SELECT eventID as `ID`,eventName as `Event Name`, Competitions.competitionName as Competition,
       Divisions.divisionName as Divsion, EventLevels.eventlevelName as ` Event Level` 
FROM Events
INNER JOIN Competitions ON Events.competitionID = Competitions.competitionID
INNER JOIN Divisions ON Events.divisionID = Divisions.divisionID
INNER JOIN EventLevels ON Events.eventlevelID = EventLevels.eventlevelID
WHERE eventName = :Search_input_field

SELECT divisionID as 'ID', divisionName as 'Division' FROM Divisions;

SELECT eventlevelID as 'ID', eventLevelName as 'EventLevel' FROM EventLevels;

--add a new event
INSERT INTO Events(eventName, competitionID,divisionID,eventlevelID)
    Values(:competitionID_from_dropdown_Input, :divisionID_from_dropdown_Input,
           :eventlevelID_from_dropdown_Input,:eventNameInput);

SELECT eventID as 'ID',eventName as 'Event', Competitions.competitionName as 'Competition',
      Divisions.divisionName as 'Division', EventLevels.eventlevelName as 'EventLevel'
      FROM Events
      INNER JOIN Competitions ON Events.competitionID = Competitions.competitionID
      INNER JOIN Divisions ON Events.divisionID = Divisions.divisionID
      INNER JOIN EventLevels ON Events.eventlevelID = EventLevels.eventlevelID;

--delete an event
DELETE FROM Events WHERE Events.eventID = :eventID_selected_from_Event_page;

--update an event
SELECT EventID,competitionID,DivisionID,eventlevelID,eventName from Events
WHERE eventID = :eventID_selected_from_Event_page_update_from_dropdown_Input

UPDATE Events
    SET competitionID = :competitionID_from_dropdown_Input, DivsionID = :divisionID_from_dropdown_Input,
        eventlevelID = :eventlevelID_from_dropdown_Input, eventName = :eventNameInput
    WHERE eventID = :eventID_selected_from_Event_page_update_form_dropdown_Input;

--get all teams(add a where for searches)
SELECT teamID as `ID`, teamName as `Team Name`, coachName as `Coach Name`, coachPhone as `Coach Phone`, 
        coachEmail as `Coach Email` FROM Teams;

--get all teams from a Search by Name
SELECT teamID as `ID`, teamName as `Team Name`, coachName as `Coach Name`, coachPhone as `Coach Phone`, 
        coachEmail as `Coach Email` FROM Teams
WHERE teamName = :Search_input_field;

--add a new team
INSERT INTO Teams(teamName,coachName,coachPhone,CoachEmail)
    VALUES(:teamNameInput, :coachNameInput, :coachPhoneInput, :coachEmailInput)

SELECT Teams.teamID, Teams.teamName, Teams.coachName, Teams.coachPhone, Teams.coachEmail FROM Teams ORDER BY Teams.teamID ASC;

--delete a team
DELETE FROM Teams WHERE Teams.teamID = :teamID_selected_from_Teams_page;

--Update a team
UPDATE Teams
    SET teamName = :teamNameInput, coachName = :coachNameInput, coachPhone = :CoachPhoneInput,
        coachEmail = coachEmailInput
    WHERE teamID = ;teamID_selected_from_Teams_page_update_form_dropdown_Input;

--get all athletes
SELECT athleteID as 'ID', athleteName as 'Athlete', teamName as 'Team', divisionName as 'Division', 
    athletePhone as 'Athlete-Phone', athleteEmail as 'Athlete-Email', athleteAddress as 'Athlete-Address',
    athleteDOB as 'DOB', athleteAge as 'Age'
    FROM Athletes
    LEFT JOIN Teams ON Athletes.teamID = Teams.teamID
    LEFT JOIN Divisions ON Athletes.divisionID = Divisions.divisionID ORDER BY athleteID ASC;

--get all athletes from search
SELECT athleteID as 'ID', athleteName as 'Athlete', teamName as 'Team', divisionName as 'Division',
    athletePhone as 'Athlete-Phone', athleteEmail as 'Athlete-Email', athleteAddress as 'Athlete-Address',
    athleteDOB as 'DOB', athleteAge as 'Age'
    FROM Athletes
    LEFT JOIN Teams ON Athletes.teamID = Teams.teamID
    LEFT JOIN Divisions ON Athletes.divisionID = Divisions.divisionID WHERE athleteName LIKE = :search_input_field

--get teams and divisions for athletes browse table
SELECT divisionID as 'ID', divisionName as 'Division' FROM Divisions;

SELECT teamID as 'ID', teamName as 'Team' FROM Teams;

--add a new athlete
INSERT INTO Athletes
    VALUES(:teamID_from_dropdon_menu_Input,:divisionID_from_dropdown_Input, :athleteNameInput,
           :athletePhoneInput, :athleteEmailInput, :athleteAddressInput,
           :athleteAgeInput)

SELECT Athletes.athleteID as 'ID', athleteName as 'Athlete', Teams.teamName as 'Team', Divisions.divisionName as 'Division', 
            athletePhone as 'AthletePhone', athleteEmail as 'AthleteEmail', athleteAddress as 'AthleteAddress',
            athleteDOB as 'DOB', athleteAge as 'Age'
            FROM Athletes
            LEFT JOIN Teams ON Athletes.teamID = Teams.teamID
            LEFT JOIN Divisions ON Athletes.divisionID = Divisions.divisionID;
            
--delete an athlete
DELETE FROM Athletes WHERE Athletes.athleteID = ;athleteID_selected_from_Athletes_page;

--update an athlete
SELECT athleteName, Teams.teamName, Divisions.divisionName, 
            athletePhone, athleteEmail, athleteAddress,athleteDOB, athleteAge FROM Athletes
            INNER JOIN Teams ON Athletes.teamID = Teams.teamID
            INNER JOIN Divisions ON Athletes.divisionID = Divisions.divisionID WHERE athleteID = ?;
UPDATE Athletes
    SET teamID = :teamID_from_dropdon_menu_Input, :divisionID_from_dropdown_Input,
        athleteName = :athleteNameInput, :AthletePhone = athletePhoneInput, 
        athleteEmail =:athleteEmailInput, :athleteAddress = :athleteAddressInput,
         athleteAge = :athleteAgeInput
    WHERE  athleteID = :athleteID_choosen_from_athletes_update_form_dropdown_menu;

-- delete an Athlete
DELETE FROM Athletes WHERE athleteID = ?;

--get all athleteIDs and athleteNames for dropdown menus
SELECT atheleteID, athleteNme FROM athletes;

--get all athlete_events
SELECT athlete_eventID as 'ID', Athletes.athleteName as 'Athlete',
    Events.eventName as 'Event-Name', EventLevels.eventLevelName as 'Event-Level', Divisions.divisionName as 'Athlete-Division'
    FROM Athletes_Events
    LEFT JOIN Athletes ON Athletes_Events.athleteID =  Athletes.athleteID
    LEFT JOIN Divisions ON Divisions.divisionID = Athletes.divisionID
    LEFT JOIN Events ON Athletes_Events.eventID = Events.eventID
    LEFT JOIN EventLevels ON Events.eventlevelID = EventLevels.eventlevelID;

--get all athlete_events from a search by choosen attribute
SELECT athlete_eventID as 'ID', Athletes.athleteName as 'Athlete',
    Events.eventName as 'Event-Name', EventLevels.eventLevelName as 'Event-Level', Divisions.divisionName as 'Athlete-Division'
    FROM Athletes_Events
    LEFT JOIN Athletes ON Athletes_Events.athleteID =  Athletes.athleteID
    LEFT JOIN Divisions ON Divisions.divisionID = Athletes.divisionID
    LEFT JOIN Events ON Athletes_Events.eventID = Events.eventID
    LEFT JOIN EventLevels ON Events.eventlevelID = EventLevels.eventlevelID
    WHERE Athletes_Events.athleteID IN (SELECT athleteId FROM Athletes WHERE athleteName Like = :Search_input_field

--get all eventIDs for selecting events based on eventName,Athletes.divisionID, and eventLevel in Athlete_Events Table
SELECT eventID as 'ID',eventName as 'Event', Competitions.competitionName as 'Competition',
  Divisions.divisionName as 'Division', EventLevels.eventlevelName as 'Event-Level'
  FROM Events
  INNER JOIN Competitions ON Events.competitionID = Competitions.competitionID
  INNER JOIN Divisions ON Events.divisionID = Divisions.divisionID
  INNER JOIN EventLevels ON Events.eventlevelID = EventLevels.eventlevelID;

-- get athletes and left join with divisions
SELECT athleteID as 'ID', athleteName as 'Athlete', divisionName as 'Division'
  From Athletes
  LEFT JOIN Divisions on Athletes.divisionID = Divisions.divisionID;

--add a new athlete_event
INSERT INTO Athletes_Events(athleteID,eventID)
    VALUES(:athleteID_from_dropdown_Input, :eventID_from_dropdown_Input)

SELECT athlete_eventID as 'ID', Athletes.athleteName as 'Athlete', Events.eventName as 'Event',
        EventLevels.eventlevelName as 'EventLevel', Divisions.divisionName as 'Division'
        FROM Athletes_Events
        LEFT JOIN Athletes ON Athletes_Events.athleteID = Athletes.athleteID
        LEFT JOIN Events ON Athletes_Events.eventID = Events.eventID
        LEFT JOIN EventLevels ON Events.eventlevelID = EventLevels.eventlevelID
        LEFT JOIN Divisions ON Events.divisionID = Divisions.divisionID;

--update athletes_events
UPDATE Athletes_Events SET athleteID = :athleteID_from_dropdown_Input, eventID = :eventName_from_dropdown_Input WHERE athlete_eventID = :athlete_event_selected_from_dropdown_input;

SELECT Athletes.athleteName, Events.eventName,
  EventLevels.eventlevelName, Divisions.divisionName
  FROM Athletes_Events
  LEFT JOIN Athletes ON Athletes_Events.athleteID = Athletes.athleteID
  LEFT JOIN Events ON Athletes_Events.eventID = Events.eventID
  LEFT JOIN EventLevels ON Events.eventlevelID = EventLevels.eventlevelID
  LEFT JOIN Divisions ON Events.divisionID = Divisions.divisionID
  WHERE athlete_eventID = :athlete_event_selected_from_dropdown_input;

--delete an athlete_events
DELETE FROM Athlete_Events WHERE Athlete_Events.athlete_eventID = :athlete_eventID
