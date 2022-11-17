--get all competiitions
SELECT competitionID as `ID`, competitionName as `Competition Name`, Date, startTime as `Start Time`, locationName as `Location Name`,
locationAddress as `Location Address`,locationPhone as `Location Phone` FROM Competitions;

--get all competitions from a search by Name
SELECT competitionID as `ID`, competitionName as `Competition Name`, Date, startTime as `Start Time`, locationName as `Location Name`,
locationAddress as `Location Address`,locationPhone as `Location Phone` FROM Competitions
Where competitionName = :Search_input_field;



--add a new competition
INSERT INTO Competitions(competitionName,date,startTime,locationName,locationAddress,LocationPhone)
    VALUES(:CompetitionNameInput,:dateInput,:startTimeInput,:locationNameInput,:locationAddressInput,
           :LocationPhoneInput);

--delete a competition
Delete FROM Competitions where competitionID = :competitionID_selected_from_competition_page;

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

--get all divisionIDs and divisionNames to populate Division dropdown menus
SELECT divisionID,divisionName FROM Divisions;

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

--add a new event
INSERT INTO Events(competitionID,divisionID,eventlevelID,eventName)
    Values(:competitionID_from_dropdown_Input, :divisionID_from_dropdown_Input,
           :eventlevelID_from_dropdown_Input,:eventNameInput);

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

--delete a team
DELETE FROM Teams WHERE Teams.teamID = :teamID_selected_from_Teams_page;

--Update a team
UPDATE Teams
    SET teamName = :teamNameInput, coachName = :coachNameInput, coachPhone = :CoachPhoneInput,
        coachEmail = coachEmailInput
    WHERE teamID = ;teamID_selected_from_Teams_page_update_form_dropdown_Input;

--get all athletes
SELECT Athletes.athleteID as `ID`,Teams.teamName as Team, Divisions.divisionName as Division, athleteName as `Athlete Name`,
       athletePhone as "Athlete Phone", athleteEmail as `Athlete Email`, athleteAddress as `Athlete Address`,
        athleteDOB as `Athlete DOB`, athleteAge as `Athlete Age`
FROM Athletes
INNER JOIN Teams ON Athletes.teamID = Teams.teamID
INNER JOIN Divisions ON Athletes.divisionID = Divisions.divisionID

--get all athletes from search
SELECT Athlete.athleteID as 'ID',Teams.teamName as Team, Divisions.divisionName as Division, athleteName as `Athlete Name`,
       athletePhone as "Athlete Phone", athleteEmail as `Athlete Email`, athleteAddress as `Athlete Address`,
        athleteDOB as `Athlete DOB`, athleteAge as `Athlete Age`
FROM Athletes
INNER JOIN Teams ON Athletes.teamID = Teams.teamID
INNER JOIN Divisions ON Athletes.divisionID = Divisions.divisionID
WHERE athlete.:attribute_from_dropdown = :search_input_field

--add a new athlete
INSERT INTO Athletes
    VALUES(:teamID_from_dropdon_menu_Input,:divisionID_from_dropdown_Input, :athleteNameInput,
           :athletePhoneInput, :athleteEmailInput, :athleteAddressInput,
           :athleteAgeInput)

--delete an athlete
DELETE FROM Athletes WHERE Athletes.athleteID = ;athleteID_selected_from_Athletes_page;

--update an athlete
SELECT athleteID, teamID, divisionID, athleteName,AthletePhone, athleteEmail,athleteAddress,athleteAge
FROM Athletes
WERE Athletes.athleteID = athleteID_choosen_from_athletes_update_form_dropdown_menu.
UPDATE Athletes
    SET teamID = :teamID_from_dropdon_menu_Input, :divisionID_from_dropdown_Input,
        athleteName = :athleteNameInput, :AthletePhone = athletePhoneInput, 
        athleteEmail =:athleteEmailInput, :athleteAddress = :athleteAddressInput,
         athleteAge = :athleteAgeInput
    WHERE  athleteID = :athleteID_choosen_from_athletes_update_form_dropdown_menu;

--get all athleteIDs and athleteNames for dropdown menus
SELECT atheleteID, athleteNme FROM athletes;

--get all athlete_events
SELECT athlete_eventID as `ID`, Athletes.athleteName as `Athlete`,
       Events.eventName as 'Event Name',EventLevels.eventLevelName as 'Event Level', Divisions.divisionName as `Athlete Division`
FROM Athletes_Events
INNER JOIN Athletes ON Athletes_Events.athleteID =  Athletes.athleteID
INNER JOIN Divisions ON Athletes.divisionID = Divisions.divisionID
INNER JOIN Events ON Athletes_Events.eventID = Events.eventID
INNER JOIN EventLevels ON Events.eventlevelID = EventLevels.eventlevelID;

--get all athlete)events from a search by choosen attribute
SELECT athlete_eventID as `ID`, Athletes.athleteName as `Athlete`,
       Events.eventName as 'Event Name',EventLevels.eventLevelName as 'Event Level', Divisions.divisionName as `Athlete Division`
FROM Athletes_Events
INNER JOIN Athletes ON Athletes_Events.athleteID =  Athletes.athleteID
INNER JOIN Divisions ON Athletes.divisionID = Divisions.divisionID
INNER JOIN Events ON Athletes_Events.eventID = Events.eventID
INNER JOIN EventLevels ON Events.eventlevelID = EventLevels.eventlevelID;
WHERE Athletes_Events.:attribute_from_dropdown = :Search_input_field

--get all eventIDs for selecting events based on eventName,Athletes.divisionID, and eventLevel in Athlete_Events Table
SELECT eventID FROM Events;

-- get unique EventNames from Events for dropdown menu in athlete_Events
SELECT DISTINCT eventName from Events 

--add a new athlete_event
INSERT INTO Athletes_Events(athleteID,eventID)
    VALUES(:athleteID_from_dropdown_Input, 
            SELECT eventID FROM Events WHERE Events.eventName = :eventName_from_dropdown_Input(no id associated) and 
            Events.eventlevelID = :eventLevel_from_dropdown_Input and
            Events.DivisionID = SELECT DivisionID FROM Athletes WHERE Athletes.athleteID = :athleteId_from_dropdown_Input)
/* I can really fully test this until we try to implement it with database connected to webapp
Insert INTO athletes_events works when I put two values in for athleteID and EventID but 
select is going to be harder.  So for Review I am wanting to select the eventID based
on the eventName(this are not unique in events),eventLevel and the divisionID of an athlete. */


--delete an athlete_events
DELETE FROM Athlete_Events WHERE Athlete_Events.athlete_eventID = :athlete_eventID
