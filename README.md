# Development-of-a-sports-injury-surveillance-application

This is a sports injury surveillance app. The purpose of this app is giving a new tool to coaches (and players themselves) for recording player's injury instead of using the pen n paper method.




## File Structure

There are three major components included in the project—the database, the backend for serving and the frontend for the UI. Here key parts are listed for finding the desired components

| File or Part               | File Path                   |
|----------------------------|-----------------------------|
| Database deployment code   | `/_db_deployment/setup.sql` |
| Frontend project           | `/front`                    |
| Backend project            | `/back`                     |
| Available backend API list | `/back/availableAPIs.md`    |




## Deploying and Viewing

### Preparation

Below the environment and dependencies are listed for referencing.

- *Database:* MariaDB
	- Version: `Ver 15.1 Distrib 10.6.7-MariaDB`

- *Backend:* Django
	- Python `3.10.4`
	- Python packages:
		- django `4.0.4`
		- djangorestframework `3.13.1`
		- iso3166 `2.0.2`
		- bcrypt `3.2.2`
		- mariadb `1.0.11` (or pymysql)

- *Frontend:* React
	- Since it is a NodeJS project, you can check `/front/package.json` for a full list of dependencies

- *OS:* tested with
	- Windows 10 1803
	- Ubuntu 22.04


### Setup the Database

> All the code for database deployment are stored in `/_db_deployment/setup.sql`

1. Create a database
	```sql
	CREATE DATABASE injury_surv_db_test;
	```

	here we are using `injury_surv_db_test` as the default name, but you can use anything prefered

	> This piece of code is also stored in `/_db_deployment/setup.sql` (line 8)

2. Create the database user account. The code will be like
	```sql
	CREATE USER 'injury_surv_editor'@'%' IDENTIFIED BY "##_PW_HIDDEN_##";
	GRANT ALL PRIVILEGES ON injury_surv_db_test.* TO 'injury_surv_editor'@'%';
	FLUSH PRIVILEGES;
	```

	note that you may need to change the database name and choose a password on your own.

	> This piece of code is also stored in `/_db_deployment/setup.sql` (line 21,23)

3. Enter the created database and create tables with the code starting from line 28 of `/_db_deployment/setup.sql`



### Configure the Backend

Currently the backend, Django, is configured for development. Here the steps for running the project after installing dependancies will be provided.

1. Connect to your database
	- Open `/back/djangoProject/Backend/database.py`
	- If you are using `pymysql` instead of `mariadb` for connecting to the database, replace
		```python
		import mariadb
		```

		with

		```python
		import pymysql as mariadb
		```

		The project should work fine with both of them.

	- Edit following lines:
		```python
		conn = mariadb.connect(
			user="injury_surv_editor",
			...
		)
		```

		and replace them with your database account settings

2. If you are either running the project for demostration or for developing without crossing region:
	- Open `/back/djangoProject/djangoProject/settings.py`
	- Replace
		```python
		SESSION_COOKIE_SAMESITE = 'None'
		CSRF_COOKIE_SAMESITE = 'None'
		```

		with

		```python
		SESSION_COOKIE_SAMESITE = 'Lax'
		CSRF_COOKIE_SAMESITE = 'Lax'
		```

		since newer versions of major browsers forbid cookies with `SameSite: None` when http protocol is used.

3. Change directory into `/back/djangoProject` and run the Django server with command:
	```bash
	python manage.py runserver 0.0.0.0:8000
	```

	and the server should be up on port `8000`.



### Build the Frontend and Serve it

1. Change directory into `/front` and run the build command:
	```bash
	npm run build
	```

2. After the build is finished, move all files in `/front/build` to `/back/djangoProject/Frontend`

3. Now you should be able to access the app. For running on your local machine, the URL should be `http://localhost:8000/front/index.html/#/home`




## For Setting Up an Admin Account

Due to security considerations, the frontend and the django server did not provide any method for setting up an admin account for the app. To create one, you should do it with the database directly.

1. Generate a hashed password
	- Since passwords are stored with hash values only, you need to convert your desired password into hash before inserting them into the database. A simple script is provided (`/back/pw_generator.py`) for generating a password hash for you.

2. Enter the database
	- For Linux, firstly start with command:
		```bash
		mariadb
		```

	- In MariaDB command line, enter your database:
		```sql
		-- Change the database name if appliable
		use injury_surv_db_test;
		```

3. Insert your desired admin account into the database:
	```sql
	INSERT INTO User (account, password, type) VALUES ('myadmin@account.com', '<HASHED_PASSWORD>', 'admin');
	```

	do not forget to replace `myadmin@account.com` and `<HASHED_PASSWORD>` with your own information.

4. Now you should be able to login with your admin account through the frontend page.


