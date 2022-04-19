-- ABOUT THIS: The code for setting up the database for the injury surveillance
--             application. Database itself and management account set up
--             is also included.


-- CREATE THE DATABASE
--   A shorted name is used for convenience
CREATE DATABASE injury_surv_db_test;


-- CREATE DB USER
--   - Password is removed here for security;
--   - Privileges are not strictly limited for development
--   - Following lines are appended to `/etc/mysql/my.cnf` for allowing remote
--     access for testing:
--       [mysqld]
--       bind-address=0.0.0.0
--
--   CLI login using command:
--     mariadb -u injury_surv_editor --password="##_PW_HIDDEN_##"
CREATE USER 'injury_surv_editor'@'%' IDENTIFIED BY "##_PW_HIDDEN_##";
GRANT ALL PRIVILEGES ON injury_surv_db_test.* TO 'injury_surv_editor'@'%';
FLUSH PRIVILEGES;




-- CREATE TABLES
--   For simplification, some columns use varchar for storing data collections


-- Drop statements used during testing:
--
-- DROP TABLE IF EXISTS ConcuForm;
-- DROP TABLE IF EXISTS InjForm;
-- DROP TABLE IF EXISTS Athlete;
-- DROP TABLE IF EXISTS BaseInfo;
-- DROP TABLE IF EXISTS PerInfo;
-- DROP TABLE IF EXISTS Manage;
-- DROP TABLE IF EXISTS Team;
-- DROP TABLE IF EXISTS User;


CREATE TABLE User (
	userId INT UNSIGNED AUTO_INCREMENT,
	account VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(20) NOT NULL,
	type VARCHAR(20),
	CONSTRAINT Chk_userType CHECK(type IN ('superadmin', 'admin', 'player', 'coach')),
	PRIMARY KEY (userId)
);

CREATE TABLE Team (
	teamId INT UNSIGNED AUTO_INCREMENT,
	teamName VARCHAR(20) NOT NULL,
	PRIMARY KEY (teamId)
);

CREATE TABLE Manage (
	userId INT UNSIGNED,
	teamId INT UNSIGNED,
	PRIMARY KEY (userId, teamId),
	FOREIGN KEY (userId) REFERENCES User(userId),
	FOREIGN KEY (teamId) REFERENCES Team(teamId)
);

CREATE TABLE PerInfo (
	perInfoId INT UNSIGNED AUTO_INCREMENT,
	surname VARCHAR(20),
	givenName VARCHAR(20),
	dateOfBirth DATE,
	address VARCHAR(50),
	email VARCHAR(50),
	mobile VARCHAR(20),
	country VARCHAR(4),
	PRIMARY KEY (perInfoId)
);

CREATE TABLE BaseInfo (
	baseInfoId INT UNSIGNED AUTO_INCREMENT,
	baseInfoTime DATETIME NOT NULL,
	sufferFrom VARCHAR(300),
	sufferLength VARCHAR(50),
	medicineTaken VARCHAR(300),
	injuryName VARCHAR(300),
	injuryLocation VARCHAR(300),
	surgeryName VARCHAR(300),
	surgeryYear VARCHAR(50),
	concuHistory VARCHAR(20),
	concuSympDesc VARCHAR(1000),
	PRIMARY KEY (baseInfoId)
);

CREATE TABLE Athlete (
	athleteId INT UNSIGNED AUTO_INCREMENT,
	code VARCHAR(20) NOT NULL,
	userId INT UNSIGNED UNIQUE,
	teamId INT UNSIGNED,
	perInfoId INT UNSIGNED UNIQUE,
	baseInfoId INT UNSIGNED UNIQUE,
	PRIMARY KEY (athleteId),
	FOREIGN KEY (userId) REFERENCES User(userId),
	FOREIGN KEY (teamId) REFERENCES Team(teamId),
	FOREIGN KEY (perInfoId) REFERENCES PerInfo(perInfoId),
	FOREIGN KEY (baseInfoId) REFERENCES BaseInfo(baseInfoId)
);

CREATE TABLE InjForm (
	injFormId INT UNSIGNED AUTO_INCREMENT,
	injFormTime DATETIME NOT NULL,
	athleteId INT UNSIGNED NOT NULL,
	bodyPart VARCHAR(30),
	occurDuring VARCHAR(30),
	injuryType VARCHAR(50),
	removalWay VARCHAR(20),
	actAfterInjury VARCHAR(50),
	injuryMechanism VARCHAR(50),
	wearEquipment VARCHAR(50),
	contributFactor VARCHAR(50),
	provisionalDiag VARCHAR(1000),
	injuryPresent VARCHAR(50),
	initTreat VARCHAR(100),
	initTreatPerson VARCHAR(50),
	referralTo VARCHAR(50),
	PRIMARY KEY (injFormId),
	FOREIGN KEY (athleteId) REFERENCES Athlete(athleteId)
);

CREATE TABLE ConcuForm (
	concuFormId INT UNSIGNED AUTO_INCREMENT,
	injFormId INT UNSIGNED UNIQUE,
	concuFeature VARCHAR(50),
	sympRating VARCHAR(50),
	sympWorseQ VARCHAR(10),
	feelNormal TINYINT UNSIGNED,
	feelNormalWhy VARCHAR(1000),
	PRIMARY KEY (concuFormId),
	FOREIGN KEY (injFormId) REFERENCES InjForm(injFormId)
);

