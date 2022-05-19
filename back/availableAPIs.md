# Available APIs

URL path for accessing implemented APIs will be list here for checking

- Login: `/api/login` (Receive POST only)
- Logout: `/api/logout` (Receive POST only)
- Registration: `/api/user/register` (Receive POST only)
	- See `/back/djangoProject/Frontend/reg_test.html`
- Injury form submission: `/api/injury_form/new` (Receive POST only)
	- See `/back/djangoProject/Frontend/form_sub_test.html` for accepted JSON
- Injury form view: `/api/injury_form/get/<form_id>` (Receive GET only)
	- See `/back/djangoProject/Frontend/form_get_test.html` for checking
