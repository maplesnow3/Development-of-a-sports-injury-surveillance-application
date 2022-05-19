import mariadb
import random
import re
import datetime
from iso3166 import countries

'''
Connects to the database using the connection string
'''
def openConnection():
    # Create a connection to the database
    conn = None
    try:
        # Parses the config file and connects using the connection string
        conn = mariadb.connect(
            user="injury_surv_editor",
            password="3c697dbb262165796fbddb80c071fc",
            host="108.61.184.187",
            port=3306,
            database="injury_surv_db_test"
        )
    except mariadb.Error as e:
        print(e)

    # return the connection to use
    return conn

'''
Validate a user login request based on account and password
'''
def login(account,password):


    conn=openConnection()
    try:
        curs = conn.cursor()
        # execute the query  #/
        curs.execute(
            "SELECT * FROM User WHERE account=%r and password=%r"
            %(account, password))

        # loop through the resultset #/
        nr = 0
        row = curs.fetchone()
        if row is not None:
            nr += 1
        if nr == 0:
            return None

        userInfo = [str(row[0]), str(row[1]), str(row[2]), str(row[3])]
        curs.close()

    except mariadb.Error as e:
        print(e)

    # default:userInfo = ['1', 'test01@test.com', 'test01', 'player']
    return userInfo

'''
Change password for a given userId
'''
def changePw(userid, oldpw, newpw):

    conn = openConnection()
    try:

        curs = conn.cursor()
        # Check whether the given old password is correct
        curs.execute(
            "SELECT * FROM User WHERE userId=%r and password=%r"
            %(userid, oldpw))
        check = curs.fetchone()
        if check is None:
            # Not correct, return Fail
            return "Fail"
        else:
            # Correct, update the password with the new one and return Success
            curs.execute(
                "Update User Set password=%r Where userId=%r"
                %(newpw, userid))
            conn.commit()

        curs.close()
        return "Success"


    except mariadb.Error as e:
        print(e)
        return "Fail"

'''
Register a new user with given account, password and user type
'''
def register(account, password, type):
    conn = openConnection()
    try:
        curs = conn.cursor()
        # Insert the new user
        userid=key('userId', 'User')
        curs.execute(
            "Insert into User (userId, account, password, type) values (%r, %r, %r, %r)"
            %(userid, account, password, type)
        )
        conn.commit()
        curs.close()
        if type=="player":
            registerAth=addAth(userid)
            if registerAth == "Success":
                return userid
            else:
                return "Fail"
        else:
            return userid
    except mariadb.Error as e:
        print(e)
        return "Fail"

def addAth(userid):
    conn = openConnection()
    try:
        curs = conn.cursor()
        # Insert a new athlete
        athleteid = key('athleteId', 'Athlete')
        code = random.sample("abcdefghijklmnopqrstuvwxyz",10)
        newcode = ''
        for x in code:
            newcode = newcode + x
        curs.execute(
            "Insert into Athlete (athleteId, code, userId) values (%r, %r, %r)"
            % (athleteid, newcode, userid)
        )
        conn.commit()
        curs.close()
        return "Success"

    except mariadb.Error as e:
        print(e)
        return "Fail"

'''
Delete the baseline information for the given user
'''
def removeBaseInf(userId):
    conn = openConnection()
    try:
        curs = conn.cursor()
        curs.execute(
            "SELECT baseInfoId FROM Athlete WHERE userId=%r"
            % (userId))
        baseInfoId = curs.fetchone()
        if baseInfoId is not None:
            baseInfoId = str(baseInfoId[0])
        curs.execute("Update Athlete Set baseInfoId = Null Where userId=%r"
                     %(userId))
        curs.execute("Delete from BaseInfo where baseInfoId = %r"
                     %(baseInfoId))
        conn.commit()
        return "Success"

    except mariadb.Error as e:
        print(e)
        return "Fail"

'''
Delete the user and athlete information for the given user
'''
def unregister(userId):
    conn = openConnection()
    try:
        curs = conn.cursor()
        curs.execute("Delete from Athlete where userId=%r"
                     %(userId))
        curs.execute("Delete from User where userId=%r"
                     %(userId))
        conn.commit()
        return "Success"

    except mariadb.Error as e:
        print(e)
        return "Fail"

'''
Check the user type for the given user
'''
def isPlayerUser(userId):
    conn = openConnection()
    try:
        curs = conn.cursor()
        curs.execute("Select type from User where userId=%r"
                     %(userId))
        userType=curs.fetchone()
        if userType is not None:
            curs.close()
            userType = str(userType[0])
            if userType == "player":
                return True
            else:
                return False
        else:
            curs.close()
            return False

    except mariadb.Error as e:
        print(e)
        return False

'''
Insert the personal information for a new user
'''
def addPerInf(userid, surname, givenName, dateofbirth, ebackground, mobile, address, country):
    conn = openConnection()
    try:

        curs = conn.cursor()
        # Get the email which is the account
        curs.execute(
            "SELECT account FROM User WHERE userId=%r"
            %(userid))
        getemail = curs.fetchone()
        if getemail is None:
            # No such a user, return Fail
            return "Fail"
        else:
            email = str(getemail[0])
        perInfId = key('perInfoId', 'PerInfo')
        country_inf = countries.get(country)
        country_code=country_inf[3]
        curs.execute(
            "Insert into PerInfo (perInfoId, surname, givenName, dateOfBirth, address, email, mobile, country, ethicBackground) "
            "values (%r, %r, %r, %r, %r, %r, %r, %r, %r)"
            %(perInfId, surname, givenName, dateofbirth, address, email, mobile, country_code, ebackground))
        conn.commit()
        curs.execute(
            "Update Athlete Set perInfoId=%r Where userId=%r"
            % (perInfId, userid))
        conn.commit()
        curs.close()
        return "Success"

    except mariadb.Error as e:
        print(e)
        return "Fail"

'''
Insert the baseline information for a new user
'''
def addBaseInf(userid, medHistory, medHisInput, medicine, takeMedicine, injHistory, injHisInput, surgery, surYear, concHis, concDes):
    conn = openConnection()
    try:
        curs = conn.cursor()
        baseInfoId=key('baseInfoId', 'BaseInfo')
        now = datetime.datetime.now()
        baseInfoTime = now.strftime('%Y-%m-%d %H:%M:%S')
        sufferFrom=list2str(medHistory)
        sufferLength=list2str(medHisInput)
        for x in takeMedicine:
            medicine.append(x)
        medicineTaken=list2str(medicine)
        injuryName=list2str(injHistory)
        injuryLocation=list2str(injHisInput)
        surgeryName=list2str(surgery)
        surgeryYear=list2str(surYear)
        concuHistory=list2str(concHis)
        curs.execute("Insert into BaseInfo (baseInfoId, baseInfoTime, sufferFrom, sufferLength, "
                     "medicineTaken, injuryName, injuryLocation, surgeryName, surgeryYear, concuHistory, concuSympDesc) "
                     "values (%r, %r, %r, %r, %r, %r, %r, %r, %r, %r, %r)"
                     %(baseInfoId, baseInfoTime, sufferFrom, sufferLength, medicineTaken, injuryName, injuryLocation,
                       surgeryName, surgeryYear, concuHistory, concDes))
        conn.commit()
        curs.execute(
            "Update Athlete Set baseInfoId=%r Where userId=%r"
            % (baseInfoId, userid))
        conn.commit()
        curs.close()
        return "Success"

    except mariadb.Error as e:
        print(e)
        return "Fail"

'''
Get the personal information for a given user
'''
def viewPerInf(userid):
    conn = openConnection()
    try:

        curs = conn.cursor()
        curs.execute("Select * from PerInfo where perInfoId in (Select perInfoId from Athlete where userId=%r)"
                     %(userid))
        row = curs.fetchone()
        if row is not None:
            # Return the personal information except personal information id
            country_inf=countries.get(str(row[8]))
            country_name=country_inf[4]
            perInf=[str(row[1]), str(row[2]), str(row[3]),str(row[4]),str(row[5]), str(row[6]), str(row[7]), country_name]
            curs.close()
            return perInf
        else:
            curs.close()
            return None

    except mariadb.Error as e:
        print(e)
        return "Fail"

'''
Get the baseline information for a given user
'''
def viewBaseInf(userid):
    conn = openConnection()
    try:

        curs = conn.cursor()
        curs.execute("Select * from BaseInfo where baseInfoId in (Select baseInfoId from Athlete where userId=%r)"
                     % (userid))
        row = curs.fetchone()
        if row is not None:
            # medHistory, medHisInput, medicine, takeMedicine, injHistory, injHisInput, surgery, surYear, concHis, concDes
            medHistory=str2list(str(row[2]))
            medHisInput=str2list(str(row[3]))
            medicinedata=str2list(str(row[4]))
            n=0
            medicine=[]
            takeMedicine=[]
            for x in medicinedata:
                if n<3:
                    medicine.append(x)
                else:
                    takeMedicine.append(x)
                n=n+1
            injHistory=str2list(str(row[5]))
            injHisInput=str2list(str(row[6]))
            surgery=str2list(str(row[7]))
            surYear=str2list(str(row[8]))
            concHis=str2list(str(row[9]))
            concDes=str(row[10])
            baseInf = [medHistory, medHisInput, medicine, takeMedicine, injHistory, injHisInput, surgery, surYear, concHis, concDes]
            curs.close()
            return baseInf
        else:
            curs.close()
            return None

    except mariadb.Error as e:
        print(e)
        return "Fail"

'''
Update the personal information for a given user
'''
def updatePerInf(userid, address, mobile):
    conn = openConnection()
    try:
        curs = conn.cursor()
        curs.execute("Update PerInfo Set address=%r, mobile=%r Where perInfoId in (Select perInfoId from Athlete where userId=%r)"
                     %(address, mobile, userid))
        conn.commit()
        curs.close()
        return "Success"

    except mariadb.Error as e:
        print(e)
        return "Fail"

'''
Get the invitation code for a given individual user
'''
def viewAthcode(userid):
    conn = openConnection()
    try:

        curs = conn.cursor()
        # Get the code with the given userId
        curs.execute(
            "SELECT code FROM Athlete WHERE userId=%r"
            %(userid))
        code = curs.fetchone()
        if code is not None:
            curs.close()
            return [userid, str(code[0])]
        else:
            curs.close()
            return None

    except mariadb.Error as e:
        print(e)
        return None

'''
Update the invitation code for a given individual user
'''
def updateAthcode(userid, code):
    conn = openConnection()
    try:
        curs = conn.cursor()
        curs.execute("Update Athlete Set code=%r Where userId=%r"
                     %(code, userid))
        conn.commit()
        curs.close()
        return "Success"

    except mariadb.Error as e:
        print(e)
        return "Fail"

'''
Insert a new injury report for a given user
'''
def addInj(userid, bodyPart, occurDuring, injType, remoWay, actAfterInj, injMech, trainSpe, wearEquip,
           conFact, proDia, injPres, iniTreat, iniTreatPer, referTo):
    conn = openConnection()
    try:
        curs = conn.cursor()
        injFormId = key('injFormId', 'InjForm')
        now = datetime.datetime.now()
        injFormTime = now.strftime('%Y-%m-%d %H:%M:%S')
        athleteId=getAthid(userid)
        bodyPart = list2str(bodyPart, ";")
        occurDuring=list2str(occurDuring, ";")

        # Check whether this injury report has a concussion report followed
        isConcussion=0
        for x in injType:
            if x =="Concussion":
                isConcussion=1

        injType = list2str(injType, ";")
        injMech = list2str(injMech, ";")
        trainSpe = list2str(trainSpe, ";")
        injMehcan=[]
        injMehcan.append(injMech)
        injMehcan.append(trainSpe)
        injMehcan=list2str(injMehcan, "|")
        wearEquip = list2str(wearEquip, ";")
        conFact = list2str(conFact)
        iniTreat = list2str(iniTreat, ";")
        iniTreatPer = list2str(iniTreatPer, ";")
        referTo = list2str(referTo, ";")
        curs.execute("Insert into InjForm (injFormId, injFormTime, bodyPart, occurDuring, "
                     "injuryType, removalWay, actAfterInjury, injuryMechanism, wearEquipment, contributFactor, "
                     "provisionalDiag, injuryPresent, initTreat, initTreatPerson, referralTo, athleteId) "
                     "values (%r, %r, %r, %r, %r, %r, %r, %r, %r, %r, %r, %r, %r, %r, %r, %r)"
                     % (injFormId, injFormTime, bodyPart, occurDuring, injType, remoWay, actAfterInj, injMehcan,
                        wearEquip, conFact, proDia, injPres, iniTreat, iniTreatPer, referTo, athleteId))
        conn.commit()
        curs.close()
        # Return injFormId as well which is used for insert a concussion report
        # Return isConcussion to show whether a concussion report is followed
        return "Success", injFormId, isConcussion

    except mariadb.Error as e:
        print(e)
        return "Fail", "Fail", "Fail"

def addConc(injFormId, concuFeature, sympRating, PsympWorseQ, MsympWorseQ, feelNormal, feelNormalWhy):
    conn = openConnection()
    try:
        curs = conn.cursor()
        concuFormId=key('concuFormId', 'ConcuForm')
        concuFeature=list2str(concuFeature)
        sympRating=list2str(sympRating)
        sympWorseQ=[]
        sympWorseQ.append(PsympWorseQ)
        sympWorseQ.append(MsympWorseQ)
        sympWorseQ=list2str(sympWorseQ)
        curs.execute(
            "Insert into ConcuForm (concuFormId, concuFeature, sympRating, sympWorseQ, feelNormal, feelNormalWhy, injFormId) "
            "values (%r, %r, %r, %r, %r, %r, %r)"
            % (concuFormId, concuFeature, sympRating, sympWorseQ, feelNormal, feelNormalWhy, injFormId))
        conn.commit()
        return "Success"

    except mariadb.Error as e:
        print(e)
        return "Fail"

'''
Delete the injury form for the given injury form id
'''
def removeInj(injId):
    conn = openConnection()
    try:
        curs = conn.cursor()
        curs.execute("Delete from InjForm where injFormId = %r"
                     %(injId))
        conn.commit()
        curs.close()
        return "Success"

    except mariadb.Error as e:
        print(e)
        return "Fail"

'''
Get all the injury report id and datetime for a given individual user
'''
def viewAllDate(userid):
    conn = openConnection()
    date=[]
    try:
        curs = conn.cursor()
        athleteId=getAthid(userid)
        curs.execute("Select injFormId, injFormTime from InjForm Where athleteId=%r"
                     %(athleteId))
        nr = 0
        row = curs.fetchone()
        while row is not None:
            nr += 1
            date.append([str(row[0]), str(row[1])])
            row = curs.fetchone()

        if nr == 0:
            return None
        curs.close()

    except mariadb.Error as e:
        print(e)
        return "Fail"

    date_list = [{
        "report_id": row[0],
        "date": row[1]
    } for row in date]
    return date_list

'''
Get all the injury report id and datetime for a given individual user and a range of date
'''
def viewRangeDate(userid, startDate, endDate):
    conn = openConnection()
    date=[]
    try:
        curs = conn.cursor()
        athleteId = getAthid(userid)
        curs.execute("Select injFormId, injFormTime from InjForm "
                     "Where athleteId=%r and injFormTime >= '%s 00:00:00' and injFormTime <= '%s 23:59:59'"
                     %(athleteId, startDate, endDate))
        nr = 0
        row = curs.fetchone()
        while row is not None:
            nr += 1
            date.append([str(row[0]), str(row[1])])
            row = curs.fetchone()

        if nr == 0:
            return None
        curs.close()

    except mariadb.Error as e:
        print(e)
        return "Fail"

    date_list = [{
        "report_id": row[0],
        "date": row[1]
    } for row in date]
    return date_list

'''
Get the injury report for a given report id
'''
def viewInj(injId):
    conn = openConnection()
    try:

        curs = conn.cursor()
        curs.execute("Select * from InjForm where injFormId = %r"
                     % (injId))
        row = curs.fetchone()
        if row is not None:
            bodyPart=str2list(str(row[3]), ";")
            occurDuring=str2list(str(row[4]), ";")
            injType=str2list(str(row[5]), ";")
            remoWay=str(row[6])
            actAfterInj=str(row[7])
            injMehcan=str2list(str(row[8]), "|")
            injMech=injMehcan[0]
            injMech=str2list(injMech, ";")
            trainSpe=injMehcan[1]
            trainSpe=str2list(trainSpe, ";")
            wearEquip=str2list(str(row[9]), ";")
            conFact=str2list(str(row[10]))
            proDia=str(row[11])
            injPres=str(row[12])
            iniTreat=str2list(str(row[13]), ";")
            iniTreatPer=str2list(str(row[14]), ";")
            referTo=str2list(str(row[15]), ";")
            injReport=[bodyPart, occurDuring, injType, remoWay, actAfterInj, injMech, trainSpe, wearEquip,
                       conFact, proDia, injPres, iniTreat, iniTreatPer, referTo]
            curs.close()
            return injReport
        else:
            curs.close()
            return None

    except mariadb.Error as e:
        print(e)
        return "Fail"

def viewConc(injId):
    conn = openConnection()
    try:

        curs = conn.cursor()
        curs.execute("Select * from ConcuForm where injFormId = %r"
                     % (injId))
        row = curs.fetchone()
        if row is not None:
            concuFeature=str2list(str(row[2]),"|","int")
            sympRating=str2list(str(row[3]),"|","int")
            sympWorseQ=str2list(str(row[4]))
            PsympWorseQ=(sympWorseQ[0] == "True")
            MsympWorseQ=(sympWorseQ[1] == "True")
            feelNormal=row[5]
            feelNormalWhy=str(row[6])
            concuReport=[concuFeature, sympRating, PsympWorseQ, MsympWorseQ, feelNormal, feelNormalWhy]
            curs.close()
            return concuReport
        else:
            curs.close()
            return None

    except mariadb.Error as e:
        print(e)
        return "Fail"

'''
Create a new team managed by a given user id(coach)
'''
def createTeam(userId, teamName):
    conn = openConnection()
    try:
        curs = conn.cursor()
        teamId=key('teamId', 'Team')
        curs.execute("Insert into Team (teamId, teamName) values (%r, %r)"
                     %(teamId, teamName))
        curs.execute("Insert into Manage (userId, teamId) values (%r, %r)"
                     %(userId, teamId))
        conn.commit()
        curs.close()
        return "Success"

    except mariadb.Error as e:
        print(e)
        return "Fail"

'''
Remove the given team from all the teams managed by a given user id(coach)
'''
def removeTeam(userId, teamId):
    conn = openConnection()
    try:
        curs = conn.cursor()
        curs.execute("Delete from Manage where userId = %r and teamId = %r"
                     %(userId, teamId))
        conn.commit()
        curs.close()
        return "Success"

    except mariadb.Error as e:
        print(e)
        return "Fail"

'''
Sub-functions
'''
def getAthid(userid):
    conn = openConnection()
    try:

        curs = conn.cursor()
        # Get the athleteId with the given userId
        curs.execute(
            "SELECT athleteId FROM Athlete WHERE userId=%r"
            %(userid))
        athleteid = curs.fetchone()
        if athleteid is not None:
            curs.close()
            return str(athleteid[0])
        else:
            curs.close()
            return None

    except mariadb.Error as e:
        print(e)
        return None

def key(pkey, table):
    # Get the primary key for the new data to be inserted
    conn = openConnection()
    try:

        curs = conn.cursor()
        curs.execute(
            "Select max(%s) from %s"
            %(pkey, table)
        )
        row = curs.fetchone()
        max = int(row[0])
        next = max + 1

        curs.close()
    except mariadb.Error as e:
        print("Fail, error: " + e)

    return next

def list2str(input_list, delimiter = "|"):
	"""
	Convert a list into one single string with values separated by given delimiter.
	Support str, int and float lists.

	The delimiter character in input strings will be prefixed by a backslash.
	i.e.,  `|`  will become  `\|`
	"""
	output = ""

	if len(input_list) < 1:
		return output

	for ele in input_list:
		# Escape delimiter characters from original input
		ele_converted = str(ele).replace(delimiter, "\\"+delimiter)
		# Concat the piece with a delimiter followed
		output += ele_converted + delimiter

	# Remove last char, which is a redundant delimiter
	output_len = len(output)
	if output[output_len-1] == delimiter:
		output = output[:-1]

	return output


def str2list(input_str, delimiter = "|", output_type = "str"):
	"""
	Convert a string including delimiters into a list of values.

	Elements in the returned list can be either "str", "int" or "float", which
	is specified in parameter `output_type`.

	Validation of input values will not be checked, therefore "int" and "float"
	may cause error if input contains non-numeric stuffs.
	"""
	output = []

	# Separate on delimiter `|`, but not escaped ones
	input_frags = re.split(r'(?<!\\)[' + delimiter + r']', input_str)

	# Restore escaped delimiters `\|`, convert types and return values
	for frag in input_frags:
		frag_unescaped = frag.replace("\\|", "|")

		if output_type == "int":
			output.append(int(frag_unescaped))
		elif output_type == "float":
			output.append(float(frag_unescaped))
		else:
			output.append(frag_unescaped)

	return output