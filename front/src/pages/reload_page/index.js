// A walkaround for reload a page

import { useState } from "react";

const reloadPage = () => {
	// const [reloadResult, setReloadResult] = useState("");

	return (
		<>
			{(() => {
				let urlSearch =
					(new URL("http://localhost" + window.location.hash.slice(1))).searchParams;

				let backTarget = urlSearch.get("to");
				if (backTarget) {
					window.location.hash = "#" + backTarget;
					return `Jumping to ${backTarget}`
				} else {
					return "Invalid reload param 'to'";
				}
			})()}
		</>
	)
}

export default reloadPage;