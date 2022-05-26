import { Button, Calendar, DatePicker, Input, message } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import NavBarBottom from "../../../part-navBarBottom"
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
				message.error("Failed to get record date list - " + resFetched.message);
			} else {
				message.error("Failed to get record date list - please try later");
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
		<>
			<div className="common--page-title">
				<h1>
					Report Viewer
          			<p className="common--page-title-sub">
						Select a date to view injury report(s)
					</p>
				</h1>
				<div className="page-title--icon-cont"><CalendarOutlined /></div>
			</div>

			<div className="common--page-main">

				<div className="calendar-viewer--date-range-section">
					<p className="calendar-viewer--instruction-text">
						Search by start/end date:
					</p>
					<Input.Group compact>
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
									message.warn("Please select a valid date range");
								} else {
									// Get checked user ID
									// A fake domain is given for successfully construct URL object
									let checkedUserId =
										(new URL("http://localhost" + window.location.hash.slice(1)).
											searchParams.get("user_id")) ||
										"-1";

									//console.log(dateRangeSelected);
									// Jump to list view with proper params
									window.location.hash =
										`#/record_browser/list?user_id=${checkedUserId}&` +
										`date_from=${dateRangeSelected[0].format("YYYY-MM-DD")}&` +
										`date_to=${dateRangeSelected[1].format("YYYY-MM-DD")}`
								}
							} }
						>Show</Button>
					</Input.Group>
				</div>

				<div className="calendar-viewer--calendar-section">
					<p className="calendar-viewer--instruction-text">
						Check by date:
					</p>

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
								window.location.hash =
									`#/record_browser/list?user_id=${checkedUserId}&` +
									`date_from=${dateString}&` +
									`date_to=${dateString}`
							}
						} }
					/>
				</div>
			</div>

			<NavBarBottom />
		</>
	)
};


export default CalendarViewer;
