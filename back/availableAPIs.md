# Available APIs

URL path for accessing implemented APIs will be list here for checking

- *Login:*
	- `/api/login` (POST only)
- *Logout:*
	- `/api/logout` (POST only)
- *Change Password:*
	- `/api/user/change_password` (POST only)
	- See `/back/djangoProject/Frontend/pw_change_test.html`
- *Registration:*
	- `/api/user/register` (POST only)
	- See `/back/djangoProject/Frontend/reg_test.html`

<br>

- *View access code (aka invite code):*
	- `/api/user/access_code/get/<user_id>` (GET only)
	- Use `-1` for getting info for oneself
	- See `code_get_test.html` for sample
- *Edit access code for user oneself:*
	- `/api/user/access_code/set` (POST only)
	- See `code_set_test.html` for sample
		- Request JSON should be like `{ "code": "newCodeHere" }`

<br>

- *View personal info:*
	- `/api/user/personal_info/get/<target_user_id>` (GET only)
	- Use `-1` for getting info for oneself
	- See `perinfo_get_test.html` for sample
- *Edit personal info:*
	- `/api/user/personal_info/set` (POST only)
	- See `perinfo_set_test.html` for sample request
- *View baseline info:*
	- `/api/user/baseline/get/<target_user_id>` (GET only)
	- Use `-1` for getting info for oneself
	- See `baseline_get_test.html` for sample
- *Get form ID-date list (all):*
	- `injury_form/get_dates/<user_id>` (GET only)
	- Use `-1` for getting info for oneself
- *Get form ID-date list (in a specific date range):*
	- `injury_form/get_dates/<user_id>/from/<start_date>/to/<end_date>` (GET only)
	- Use `user_id` = `-1` for getting info for oneself
	- `start_date` and `end_date` should be like `YYYY-MM-DD`

<br>

- *Injury form submission:*
	- `/api/injury_form/new` (POST only)
	- See `/back/djangoProject/Frontend/form_sub_test.html` for accepted JSON
- *Injury form view:*
	- `/api/injury_form/get/<form_id>` (GET only)
	- See `/back/djangoProject/Frontend/form_get_test.html` for checking

<br>

> For testing coach, use `testcoach@testcoach.com`, `testcoach`

- *Create new team*
	- `/api/team/new` (POST only)
	- JSON: `{ "name": "New Team Name" }`
- *Remove a team*
	- `/api/team/new` (POST only)
	- JSON: `{ "team_id": 123 }`
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
	- See `pw_reset_mock_test.html` for old sample **with mock**
	- In:
		```json
		{ "account": "account@email.addr" }
		```
	- Out:
		```json
		{
			"status": "success",
			"new_password": "passwordAfterReset"
		}
		```
- *Admin get all players in database:*
	- `/api/team/get_all_players` (GET only)
	- TODO
	- In: None
	- Out:
		```json
		{
			"status": "success",
			"players": [
				{
					"user_id": 123,
					"name": "Jack Jon"
				},
				{...}
			]
		}
		```


# TODO - others

- Injury date writein
	- API
	- Frontend submit page
- Injury date print
	- API
	- Frontend submit page