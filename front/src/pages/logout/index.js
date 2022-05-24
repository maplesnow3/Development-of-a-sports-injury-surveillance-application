import Cookies from 'js-cookie'


const requestLogout = () => {
	let xhr = new XMLHttpRequest();
	xhr.onload = function (event) {
		if (this.status === 200) {
			let responseJson = JSON.parse(this.responseText);
			if (responseJson.status === "success") {
				// Remove cached cookie
				Cookies.remove("user_id");
				Cookies.remove("user_type");
				// window.document.cookie = `user_id=-1; path=/; expires=Sun, 20 Aug 2000 12:00:00 UTC`
				// window.document.cookie = `user_type=unknown; path=/; expires=Sun, 20 Aug 2000 12:00:00 UTC`

				window.location.hash = "#/login";
				return;
			}
		}

		alert("Logout request failed.");
		return;
	};
	xhr.withCredentials = true;
	xhr.open('POST', '/api/logout', true);
	xhr.send();
}

const LogoutPage = () => {
	const callRequest = requestLogout();
	return (<p>Logging out...</p>)
};


export default LogoutPage;
