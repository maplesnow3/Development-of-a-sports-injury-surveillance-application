-- ABOUT THIS: The code for inserting simple test cases


-- User table
INSERT INTO User (account, password, type) VALUES ('testuser1', 'hashedpw', 'player');
INSERT INTO User (account, password, type) VALUES ('testcoach1', 'hashedpw', 'coach');
--   The following one fails
INSERT INTO User (account, password, type) VALUES ('testuser2', 'hashedpw2', 'p');


-- Team
INSERT INTO Team (teamName) VALUES ('test team daaaa');
INSERT INTO Team (teamName) VALUES ('another test team');

-- Manage
INSERT INTO Manage (userId, teamId) VALUES (2, 1);

-- Personal Info
INSERT INTO PerInfo (
	surname,
	givenName,
	dateOfBirth,
	address,
	email,
	mobile,
	country
) VALUES (
	'mysurname',
	'Kivin Name',
	'1990-01-02',
	'My home addr',
	'aemailaddr@example.com',
	'123456788',
	'AUS'
);

-- Baseline Info
INSERT INTO BaseInfo (
	baseInfoTime,
	sufferFrom,
	sufferLength,
	medicineTaken,
	injuryName,
	injuryLocation,
	surgeryName,
	surgeryYear,
	ConcuHistory,
	ConcuSympDesc
) VALUES (
	CURRENT_TIMESTAMP(),
	'suff',
	'sufferLen',
	'medtake',
	'injuries',
	'injuryLoc',
	'sur name',
	'sur Year',
	'Con Hist',
	'Con Symptoms'
);

-- Athlete
INSERT INTO Athlete (
	code,
	userId,
	teamId,
	perInfoId,
	baseInfoId
) VALUES (
	'access code',
	1,
	1,
	1,
	1
);

-- InjForm
INSERT INTO InjForm (
	injFormTime,
	athleteId,
	bodyPart,
	occurDuring,
	injuryType,
	removalWay,
	actAfterInjury,
	injuryMechanism,
	wearEquipment,
	contributFactor,
	provisionalDiag,
	injuryPresent,
	initTreat,
	initTreatPerson,
	referralTo
) VALUES (
	CURRENT_TIMESTAMP(),
	1,
	'1 bodyPart',
	'1 occurDuring',
	'1 injuryType',
	'1 removalWay',
	'1 actAfterInjury',
	'1 injuryMechanism',
	'1 wearEquipment',
	'1 contributFactor',
	'1 provisionalDiag',
	'1 injuryPresent',
	'1 initTreat',
	'1 initTreatPerson',
	'1 referralTo'
);

-- ConcuForm
INSERT INTO ConcuForm (
	injFormId,
	concuFeature,
	sympRating,
	sympWorseQ,
	feelNormal,
	feelNormalWhy
) VALUES (
	1,
	'AconcuFeature',
	'AsympRating',
	'AsQ',
	99,
	'AfeelNormalWhy'
);
