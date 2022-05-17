import { Table } from "antd"
import {
	CalendarOutline,
	LeftOutline
} from 'antd-mobile-icons';
import React, { useEffect, useState } from 'react';

import './index.css';


const useRecordList = () => {
	const [recordList, setRecordList] = useState([]);
	const getRecordList = async () => {
		// TODO: use proper API for getting date list
		const res = await fetch(
			"/sample_record_list.json" +
			window.location.search
		);
		const resFetched = await res.json();

		let readSucceed = false;
		if (resFetched.status !== "success") {
			setRecordList([]);
		} else {
			readSucceed = true;

			let result = [];
			let keyCurrent = 1;
			for (let r of resFetched.report_date_list) {
				result.push({
					key: keyCurrent,
					report_id: r.report_id,
					date: r.date,
				});
				keyCurrent++;
			}
			setRecordList(result);
		}

		if (!readSucceed) {
			alert("Failed to get record list - please try later");
		}
	};

	useEffect(() => {
		getRecordList();
	}, []);

	return recordList;
};


const ListViewer = () => {
	const dataSource = useRecordList();

	const tableColumns = [
		{
			title: 'Report ID',
			dataIndex: 'report_id',
			key: 'report_id',
			render: (text) => (<a>{text}</a>),
		},
		{
			title: 'Date & Time',
			dataIndex: 'date',
			key: 'date',
			render: (text) => (<a>{text}</a>),
		},
	];

	return (
		<div>
			<div className="title-div">
				<p>Select a date to view injury report(s)</p>
				<span className="title--icon">
					<CalendarOutline />
				</span>
			</div>

			<div className="record-table-div">
				<p>Click report below for details:</p>
				<Table
					dataSource={dataSource}
					columns={tableColumns}
					onRow={(record, index) => {
						return {
							onClick: (ev) => {
								// TODO: Proper path for viewing specific
								window.location.href = `/front/#/record_browser/view_record?report_id=${record.report_id}`;
							}
						}
					}}
				/>
			</div>

			<div className="nav-div">
				<div className="nav--icon">
					<a href="/front/index.html/#/home">
						<svg viewBox="64 64 896 896" focusable="false" data-icon="home" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path></svg>
					</a>
				</div>
				<div className="nav--icon">
					<a href="javascript:history.back();"><LeftOutline /></a>
				</div>
			</div>
		</div>
	);
};


export default ListViewer;





