#### A simple script for checking the remote connectivity of the database


import mariadb

print("Connecting...")

try:
    conn = mariadb.connect(
        user = "injury_surv_editor",
        password = "##_PW_HIDDEN_HERE_##",
        host = "108.61.184.187",
        port = 3306,
        database = "injury_surv_db_test"
    )
    print("Connected")
except mariadb.Error as e:
    print(f"ERR: {e}")

cur = conn.cursor()
cur.execute("SELECT id,text FROM helloworld")

print("")
print("Printing testing table:")
for (id, text) in cur:
    print(f"{id} - {text}")
print("End")
