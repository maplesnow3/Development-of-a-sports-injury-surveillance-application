# Available APIs

URL path for accessing implemented APIs will be list here for checking

- *Login:*
	- `/api/login` (Receive POST only)
- *Logout:*
	- `/api/logout` (Receive POST only)
- *Change Password:*
	- `/api/user/change_password` (Receive POST only)
	- See `/back/djangoProject/Frontend/pw_change_test.html`
- *Registration:*
	- `/api/user/register` (Receive POST only)
	- See `/back/djangoProject/Frontend/reg_test.html`

<br>

- *View personal info:*
	- `/api/user/personal_info/get/<target_user_id>` (Receive GET only)
	- Use `-1` for getting info for oneself
	- See `perinfo_get_test.html` for sample
- *Edit personal info:*
	- `/api/user/personal_info/set` (Receive POST only)
	- See `perinfo_set_test.html` for sample request
- *View baseline info:*
	- `/api/user/baseline/get/<target_user_id>` (Receive GET only)
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
	- `/api/injury_form/new` (Receive POST only)
	- See `/back/djangoProject/Frontend/form_sub_test.html` for accepted JSON
- *Injury form view:*
	- `/api/injury_form/get/<form_id>` (Receive GET only)
	- See `/back/djangoProject/Frontend/form_get_test.html` for checking



## TODO - for individual

- View injury report content
