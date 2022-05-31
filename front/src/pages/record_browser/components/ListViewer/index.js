import { Table, message } from "antd"
import { CalendarOutlined, UnorderedListOutlined } from '@ant-design/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import NavBarBottom from "../../../part-navBarBottom"
import './index.css';


// Allows specify checked user and date range in search string like:
//  ?user_id=12&date_from=2020-01-02&date_to=2022-05-05
//
// - use ID `-1` or leave `user_id` ungiven for searching for the logged-in user themself
// - date range will be "today - today" if date_from is not given
//     (and ofc if both "from" and "to" are not given)
// - date range will be "from - today" if date_to is not given


const useRecordList = () => {
	const [recordList, setRecordList] = useState([]);
	const getRecordList = async () => {
		const todayString = moment().format("YYYY-MM-DD");
		// A fake domain is given for successfully construct URL object
		const urlSearch =
			(new URL("http://localhost" + window.location.hash.slice(1))).searchParams;

		// Parse checked params
		const checkedUserId = urlSearch.get("user_id") || "-1";
		const checkedDateFrom = urlSearch.get("date_from") || todayString;
		const checkedDateTo = (() => {
			if (checkedDateFrom === todayString) {
				return todayString
			} else {
				return (urlSearch.get("date_to") || todayString);
			}
		})();

		const res = await fetch(
			`/api/injury_form/get_dates/${checkedUserId}` +
			`/from/${checkedDateFrom}/to/${checkedDateTo}`
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
			result.sort((a, b) => {
				return (
					a.date < b.date ? -1 :
					a.date > b.date ? 1 :
					0
				)
			})
			setRecordList(result);
		}

		if (!readSucceed) {
			if (resFetched.hasOwnProperty("status") && resFetched.status === "failure") {
				message.error("Failed to get record list - " + resFetched.message);
			} else {
				message.error("Failed to get record list - please try later");
			}
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
			title: 'ID',
			dataIndex: 'report_id',
			key: 'report_id',
			render: (text) => (<a>{text}</a>),
			width: 50
		},
		{
			title: 'Date & Time',
			dataIndex: 'date',
			key: 'date',
			render: (text) => (<a>{text}</a>),
		},
	];

	return (
		<>
			<div className="common--page-title">
				<h1>
					Report List
					<p className="common--page-title-sub">{(() => {
						let todayString = moment().format("YYYY-MM-DD");
						// A fake domain is given for successfully construct URL object
						let urlSearch =
							(new URL("http://localhost" + window.location.hash.slice(1))).searchParams;

						// Parse checked params
						let checkedDateFrom = urlSearch.get("date_from") || todayString;
						let checkedDateTo = (() => {
							if (checkedDateFrom === todayString) {
								return todayString
							} else {
								return (urlSearch.get("date_to") || todayString);
							}
						})();

						if (checkedDateFrom === checkedDateTo) {
							return checkedDateFrom;
						} else {
							return `${checkedDateFrom} ~ ${checkedDateTo}`
						}
					})()}</p>
				</h1>
				<div className="page-title--icon-cont"><UnorderedListOutlined /></div>
			</div>

			<div className="common--page-main">
				<div className="list-viewer--list-section">
					<p className="list-viewer--instruction-text">Click report below for details:</p>
					<Table
						dataSource={dataSource}
						columns={tableColumns}
						onRow={(record, index) => {
							return {
								onClick: (ev) => {
									window.location.hash = `#/record_browser/view_record?report_id=${record.report_id}`;
								}
							}
						}}
						size="middle"
					/>
				</div>
			</div>

			<NavBarBottom />
		</>
	);
};


export default ListViewer;





