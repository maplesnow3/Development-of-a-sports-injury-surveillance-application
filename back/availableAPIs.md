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

<br>

- *Injury form submission:*
	- `/api/injury_form/new` (Receive POST only)
	- See `/back/djangoProject/Frontend/form_sub_test.html` for accepted JSON
- *Injury form view:*
	- `/api/injury_form/get/<form_id>` (Receive GET only)
	- See `/back/djangoProject/Frontend/form_get_test.html` for checking



## TODO - for individual

- Set personal info
- View injury report date list & filter by date