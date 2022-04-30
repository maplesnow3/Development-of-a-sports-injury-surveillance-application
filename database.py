import mariadb

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
        print("mariadb.Error : " + e)
    
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
        print("mariadb.Error : " + e)

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


    except mariadb.Error as e:
        print("mariadb.Error : " + e)

    return "Success"

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
        return "Success"

    except mariadb.Error as e:
        print("mariadb.Error : " + e)


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