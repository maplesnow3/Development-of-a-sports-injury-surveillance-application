import { Button, Calendar, DatePicker } from 'antd';
import {
	CalendarOutline,
	LeftOutline
} from 'antd-mobile-icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import './index.css';

const { RangePicker } = DatePicker;


// Allows specify checked user in search string like:
//   ?user_id=12
// use ID `-1` or leave `user_id` ungiven for searching for the logged-in user themself


const useRecordDates = () => {
	const [recordDates, setRecordDates] = useState([]);
	const getRecordDates = async () => {
		// Get checked user ID
		// A fake domain is given for successfully construct URL object
		const checkedUserId =
			(new URL("http://localhost" + window.location.hash.slice(1)).
				searchParams.get("user_id")) ||
			"-1";

		// Query date list from API
		const res = await fetch(`/api/injury_form/get_dates/${checkedUserId}`);
		const resFetched = await res.json();

		let readSucceed = false;
		if (resFetched.status !== "success") {
			setRecordDates([]);
		} else {
			readSucceed = true;

			let dates = resFetched.report_date_list.
				map((item) => {
					return item.date.replace(
						/ [0-9]{2}:[0-9]{2}:[0-9]{2}$/,
						""
					);  // Remove HMS and keep YMD only
				}).filter((item, i, arr) => {
					return arr.indexOf(item) === i;
				});

			setRecordDates(dates);
		}

		if (!readSucceed) {
			if (resFetched.hasOwnProperty("status") && resFetched.status === "failure") {
				alert("Failed to get record date list - " + resFetched.message);
			} else {
				alert("Failed to get record date list - please try later");
			}
		}
	};

	useEffect(() => {
		getRecordDates();
	}, []);

	return recordDates;
};



const CalendarViewer = () => {
	const datesWithRecord = useRecordDates();

	// Storage for selected date range
	const [dateRangeSelected, setDateRangeSelected] = useState([])

	return (
		<div>
			<div className="title-div">
				<p>Select a date to view injury report(s)</p>
				<span className="title--icon">
					<CalendarOutline />
				</span>
			</div>

			<div className="range-div">
				<RangePicker  // Date range selector
					// Disable days after today
					disabledDate={
						(checkedDate) => (checkedDate && checkedDate > moment().endOf("day"))
					}

					// Record current date range
					onChange={ (dates) => setDateRangeSelected(dates) }
				/>
				<Button  // "Check selected results" button
					type="primary"
					onClick={() => {
						if (!dateRangeSelected || dateRangeSelected.length < 2) {
							alert("Please select a valid date range");  // TODO: more user friendly here
						} else {
							// Get checked user ID
							// A fake domain is given for successfully construct URL object
							let checkedUserId =
								(new URL("http://localhost" + window.location.hash.slice(1)).
									searchParams.get("user_id")) ||
								"-1";

							//console.log(dateRangeSelected);
							// Jump to list view with proper params
							window.location.href =
								`/front/index.html/#/record_browser/list?user_id=${checkedUserId}&` +
								`date_from=${dateRangeSelected[0].format("YYYY-MM-DD")}&` +
								`date_to=${dateRangeSelected[1].format("YYYY-MM-DD")}`
						}
					} }
				>Show</Button>
			</div>

			<div className="calendar-div">
				<Calendar  // Report calendar
					fullscreen={false}
					mode={"month"}

					// Disable dates without a report available
					disabledDate={ (checkedDate) => {
						return !(datesWithRecord.indexOf(checkedDate.format("YYYY-MM-DD")) > -1);
					} }

					onSelect={ (dateSelected) => {
						// Only react to valid dates
						let dateString = dateSelected.format("YYYY-MM-DD");
						if (datesWithRecord.indexOf(dateString) > -1) {
							// Get checked user ID
							// A fake domain is given for successfully construct URL object
							let checkedUserId =
								(new URL("http://localhost" + window.location.hash.slice(1)).
									searchParams.get("user_id")) ||
								"-1";

							//console.log(dateRangeSelected);
							// Jump to list view with proper params
							window.location.href =
								`/front/index.html/#/record_browser/list?user_id=${checkedUserId}&` +
								`date_from=${dateString}&` +
								`date_to=${dateString}`
						}
					} }
				/>
			</div>

			<div className="nav-div">
				<div className="nav--icon">
					<a href="/front/index.html/#/">
						<svg viewBox="64 64 896 896" focusable="false" data-icon="home" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path></svg>
					</a>
				</div>
				<div className="nav--icon">
					<a href="javascript:history.back();"><LeftOutline /></a>
				</div>
			</div>

		</div>
	)
};


export default CalendarViewer;
