import { Button, Calendar, DatePicker } from 'antd';
import {
	CalendarOutline,
	LeftOutline
} from 'antd-mobile-icons';
import moment from 'moment'
import React, { useEffect, useState } from 'react';

import './index.css';

const { RangePicker } = DatePicker;


const useRecordDates = () => {
	const [recordDates, setRecordDates] = useState([]);
	const getRecordDates = async () => {
		// TODO: use proper API for getting date list
		const res = await fetch("/sample_record_dates.json");
		const resFetched = await res.json();

		let readSucceed = false;
		if (resFetched.status !== "success") {
			setRecordDates([]);
		} else {
			readSucceed = true;
			setRecordDates(resFetched.report_date_list);
		}

		if (!readSucceed) {
			alert("Failed to get record date list - please try later");
		}
	};

	useEffect(() => {
		getRecordDates();
	}, []);

	return recordDates;
};



const CalendarViewer = () => {
	// casual date specified for testing the calendar function
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
							// TODO (Place reserved for do the search)
							console.log(dateRangeSelected);
							alert("search triggered");
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

					// TODO (Place reserved for reading reports in the day)
					onSelect={ (dateSelected) => {
						// Only react to valid dates
						if (datesWithRecord.indexOf(dateSelected.format("YYYY-MM-DD")) > -1) {
							console.log(dateSelected);
							alert("selected " + dateSelected.format("YYYY-MM-DD"));
						}
					} }
				/>
			</div>

			<div className="nav-div">
				<div className="nav--icon">
					<a href="/">
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
