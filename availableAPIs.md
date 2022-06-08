# Available APIs

URL path for accessing implemented APIs will be list here for checking

- *Login:*
	- `/api/login` (POST only)
- *Logout:*
	- `/api/logout` (POST only)
- *Change Password:*
	- `/api/user/change_password` (POST only)
- *Registration:*
	- `/api/user/register` (POST only)

<br>

- *View access code (aka invite code):*
	- `/api/user/access_code/get/<user_id>` (GET only)
- *Edit access code for user oneself:*
	- `/api/user/access_code/set` (POST only)

<br>

- *View personal info:*
	- `/api/user/personal_info/get/<target_user_id>` (GET only)
- *Edit personal info:*
	- `/api/user/personal_info/set` (POST only)
- *View baseline info:*
	- `/api/user/baseline/get/<target_user_id>` (GET only)
- *Get form ID-date list (all):*
	- `injury_form/get_dates/<user_id>` (GET only)
- *Get form ID-date list (in a specific date range):*
	- `injury_form/get_dates/<user_id>/from/<start_date>/to/<end_date>` (GET only)

<br>

- *Injury form submission:*
	- `/api/injury_form/new` (POST only)
- *Injury form view:*
	- `/api/injury_form/get/<form_id>` (GET only)

<br>


- *Create new team*
	- `/api/team/new` (POST only)
- *Remove a team*
	- `/api/team/new` (POST only)
- *View accessible team list*
	- `/api/team/get_all` (GET only)
- *Get members of team*
	- `/api/team/members/get/<team_id>` (GET only)
- *Add members into a team*
	- `/api/team/members/add` (POST only)
- *Add members into a team*
	- `/api/team/members/remove` (POST only)

<br>

- *Admin reset password for a user:*
	- `/api/user/reset_password` (POST only)
- *Admin get all players in database:*
	- `/api/team/get_all_players` (GET only)
...
