-- Project Group 4 Database Project 
-- CS340 
-- Baton Twirling Competition Entry Form Database 
-- DDL Files
-- Amy Mummert and Joel Vrieze

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT=0;

DROP TABLE IF EXISTS Competitions;
DROP TABLE IF EXISTS Athletes;
DROP TABLE IF EXISTS Teams;
DROP TABLE IF EXISTS EventLevels;
DROP TABLE IF EXISTS Divisions;
DROP TABLE IF EXISTS Events;
DROP TABLE IF EXISTS Athletes_Events;

CREATE TABLE Competitions (
    competitionID int NOT NULL AUTO_INCREMENT,
    competitionName varchar(255) NOT NULL,
    date DATE, 
    startTime TIME,
    locationName varchar(255) NOT NULL,
    locationAddress varchar(255) NOT NULL,
    locationPhone varchar(15) NOT NULL,
    PRIMARY KEY (competitionID)
);

INSERT INTO Competitions(competitionName,date,startTime,locationName,locationAddress,LocationPhone)
    VALUES('Kelly Kadet Baton Extravaganza','2023-03-04','09:00:00', 'Knova Gym','1000 SE 182nd Ave. Portland, OR 97233','503-555-1234'),
          ('Oregon State Baton Championships','2023-04-29','08:30:00','Knova Gym','1000 SE 182nd Ave Portland, OR 97233','503-555-1234'),
          ('2023 Western Regional Championships','2023-06-18','9:30:00','Heritage High School Gym','Heritage High School 101 American Ave, Brentwood, CA 94513','925-456-1234');

CREATE TABLE Divisions (
    divisionID int NOT NULL AUTO_INCREMENT, 
    divisionName varchar(255) NOT NULL,
    PRIMARY KEY (divisionID)
);  

INSERT INTO Divisions (divisionName)
        Values('Tiny Tot (0-6)'),
                ('Primary (0-9)'),
                ('Juvenile (10-13)'), 
                ('Junior (14-17)'),
                ('Senior (18-21)'),
                ('Adult (22+)');

CREATE TABLE EventLevels(
    eventlevelID int NOT NULL AUTO_INCREMENT,
    eventlevelName varchar(255) NOT NULL,
    PRIMARY KEY (eventlevelID)
);

INSERT INTO EventLevels (eventLevelName)
        Values('Novice'),
               ('Beginner'),
               ('Intermediate'),
               ('Advance'),
               ('Elite');



CREATE TABLE Events (
    eventID int NOT NULL AUTO_INCREMENT,
    competitionID int,
    divisionID int ,
    eventlevelID int,
    eventName varchar(255) NOT NULL,
    PRIMARY KEY (eventID),
    CONSTRAINT FK_Events_CompetitionID_ FOREIGN KEY (competitionID) REFERENCES Competitions(competitionID)
    ON DELETE CASCADE,
    CONSTRAINT FK_Events_divisionID FOREIGN KEY (divisionID)    REFERENCES Divisions(divisionID)
    ON DELETE CASCADE,
    CONSTRAINT FK_Events_eventLevelID FOREIGN KEY (eventlevelID)  REFERENCES EventLevels(eventlevelID)
    ON DELETE CASCADE
);

INSERT INTO Events (competitionID,divisionID,eventlevelID,eventName)
    VALUES((SELECT competitionID FROM Competitions WHERE competitionName = 'Kelly Kadet Baton Extravaganza'), (SELECT divisionID from Divisions where divisionName = 'Primary (0-9)'),
              (SELECT eventlevelID FROM EventLevels WHERE eventlevelName = 'Novice'), 'Solo' ),
          ((SELECT competitionID FROM Competitions WHERE competitionName = 'Kelly Kadet Baton Extravaganza'), (SELECT divisionID from Divisions where divisionName = 'Senior (18-21)'),
              (SELECT eventlevelID FROM EventLevels WHERE eventlevelName = 'Beginner'), 'Solo' ) , 
          ((SELECT competitionID FROM Competitions WHERE competitionName = 'Kelly Kadet Baton Extravaganza'), (SELECT divisionID from Divisions where divisionName = 'Senior (18-21)'),
              (SELECT eventlevelID FROM EventLevels WHERE eventlevelName = 'Advance'), 'Solo' ),
          ((SELECT competitionID FROM Competitions WHERE competitionName = 'Kelly Kadet Baton Extravaganza'),(SELECT divisionID from Divisions where divisionName = 'Juvenile (10-13)'),
              (SELECT eventlevelID FROM EventLevels WHERE eventlevelName = 'Novice'), 'Strut' ),
     ((SELECT competitionID FROM Competitions WHERE competitionName = 'Kelly Kadet Baton Extravaganza'), (SELECT divisionID from Divisions where divisionName = 'Senior (18-21)'),
     (SELECT eventlevelID FROM EventLevels WHERE eventlevelName = 'Beginner'), 'Strut' );

CREATE TABLE Teams (
    teamID int NOT NULL AUTO_INCREMENT,
    teamName varchar(255) NOT NULL,
    coachName varchar(255) NOT NULL,
    coachPhone varchar(15) NOT NULL,
    coachEmail  varchar(255) NOT NULL,
    PRIMARY KEY (teamID)
);

INSERT INTO Teams(teamName,coachName,coachPhone,CoachEmail)
    VALUES("Kelly's Kadets",'Shanon Baker','503-555-5555','shanonbaker@batonfun.com'),
          ('ST. Helens Baton Club','Donna McAtee','503-555-1565','donnamcatee@batonfun.com'),
          ('Vrieze Twirling Academy','Kendra Vrieze','503-555-8923','kendravrieze@batonfun.com');

CREATE TABLE Athletes (
    athleteID int NOT NULL AUTO_INCREMENT,
    divisionID int, -- choosen based on age
    teamID int NULL,
    athleteName varchar(255) NOT NULL,
    athleteAddress varchar(255) NOT NULL,
    athletePhone varchar(15) NOT NULL,
    athleteEmail varchar(255) NOT NULL,
    athleteDOB date NOT NULL,
    athleteAge int NOT NULL, -- Determined by what there age will be on or before 8/31 of current year
    PRIMARY KEY (athleteID),
    CONSTRAINT FK_Athletes_teamID FOREIGN KEY (teamID) REFERENCES Teams(teamID) ON DELETE SET NULL,
    CONSTRAINT FK_Athletes_divisionID FOREIGN KEY (divisionID) REFERENCES Divisions(divisionID) ON DELETE SET NULL
);

INSERT INTO Athletes (TeamID,divisionID,AthleteName,AthletePhone,AthleteEmail,AthleteAddress,AthleteDOB,AthleteAge)
                Values(1,5,"Oleg Kemp","1-719-465-8475","torquent@aol.org","876-3439 Mauris, St Spokane,Wa 30107",'2002-06-12',21),
  (2,3,"Hoyt Moreno","1-537-906-7525","nam@yahoo.ca","345-617 Suspendisse Avenue Portland, OR 62481-04160", '2010-09-20',12),
  (3,5,"Fallon English","1-244-346-3338","libero.at@google.net","7493 Mauris Avenue Gresham, OR 65276", '2005-08-01', 18),
  (3,4,"Ethan Santana","(273) 741-8978","imperdiet.erat.nonummy@icloud.org","356-2820 Cras Avenue Salem, OR 86585", '2008-10-30',14),
  (2,2,"Jonah Baker","1-347-476-2792","pede@outlook.edu","P.O. Box 884, 4714 Tincidunt, Av. Sacremento, CA 93855", '2015-07-21', 8);

CREATE TABLE Athletes_Events(
    athlete_eventID int NOT NULL AUTO_INCREMENT,
    eventID int NULL,
    athleteID int NULL,
    PRIMARY KEY (athlete_eventID),
    CONSTRAINT FK__Athletes_Events__eventID FOREIGN KEY (eventID) REFERENCES Events(eventID) 
    ON DELETE SET NULL,  
    CONSTRAINT FK__Athletes_Events__athleteID FOREIGN KEY(athleteID) REFERENCES Athletes(athleteID)
    ON DELETE SET NULL
);

          
INSERT INTO Athletes_Events(athleteID,eventID)
        VALUES( 1,(Select eventID from Events INNER JOIN Athletes ON Events.divisionID = Athletes.divisionID WHERE Events.eventName = 'Strut' and Events.eventlevelID = '2' and Athletes.athleteID = '1')),
              (2,(Select eventID from Events INNER JOIN Athletes ON Events.divisionID = Athletes.divisionID WHERE Events.eventName = 'Strut' and Events.eventlevelID = '1' and Athletes.athleteID = '2')),
              (3,(Select eventID from Events INNER JOIN Athletes ON Events.divisionID = Athletes.divisionID WHERE Events.eventName = 'Solo' and Events.eventlevelID = '4' and Athletes.athleteID = '3')),
              (1,(Select eventID from Events INNER JOIN Athletes ON Events.divisionID = Athletes.divisionID WHERE Events.eventName = 'Solo' and Events.eventlevelID = '2' and Athletes.athleteID = '1'));

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
