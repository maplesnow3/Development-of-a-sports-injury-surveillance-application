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
--   For simplification and flexibility, some columns use varchar for
--   storing data collections


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
	password VARCHAR(80) NOT NULL,
	type VARCHAR(20),
	CONSTRAINT Chk_userType CHECK(type IN ('admin', 'player', 'coach')),
	PRIMARY KEY (userId)
);

CREATE TABLE Team (
	teamId INT UNSIGNED AUTO_INCREMENT,
	teamName VARCHAR(40) NOT NULL,
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
	address VARCHAR(100),
	email VARCHAR(50),
	mobile VARCHAR(20),
	ethicBackground VARCHAR(60),
	country VARCHAR(4),
	PRIMARY KEY (perInfoId)
);

CREATE TABLE BaseInfo (
	baseInfoId INT UNSIGNED AUTO_INCREMENT,
	baseInfoTime DATETIME NOT NULL,
	sufferFrom VARCHAR(40),
	sufferLength VARCHAR(40),
	medicineTaken VARCHAR(600),
	injuryName VARCHAR(50),
	injuryLocation VARCHAR(400),
	surgeryName VARCHAR(400),
	surgeryYear VARCHAR(50),
	concuHistory VARCHAR(50),
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
	bodyPart VARCHAR(600),
	occurDuring VARCHAR(100),
	injuryType VARCHAR(500),
	removalWay VARCHAR(20),
	actAfterInjury VARCHAR(50),
	injuryMechanism VARCHAR(600),
	wearEquipment VARCHAR(150),
	contributFactor VARCHAR(100),
	provisionalDiag VARCHAR(1000),
	injuryPresent VARCHAR(30),
	initTreat VARCHAR(250),
	initTreatPerson VARCHAR(400),
	referralTo VARCHAR(200),
	PRIMARY KEY (injFormId),
	FOREIGN KEY (athleteId) REFERENCES Athlete(athleteId)
);

CREATE TABLE ConcuForm (
	concuFormId INT UNSIGNED AUTO_INCREMENT,
	injFormId INT UNSIGNED UNIQUE,
	concuFeature VARCHAR(30),
	sympRating VARCHAR(60),
	sympWorseQ VARCHAR(20),
	feelNormal TINYINT UNSIGNED,
	feelNormalWhy VARCHAR(1000),
	PRIMARY KEY (concuFormId),
	FOREIGN KEY (injFormId) REFERENCES InjForm(injFormId)
);

