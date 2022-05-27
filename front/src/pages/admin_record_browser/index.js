import { Button, Drawer, Form, Input, Table, message, Modal } from "antd"
import {
	TeamOutline,
	SearchOutline
} from 'antd-mobile-icons';
import React, { useEffect, useState } from 'react';

import NavBarBottom from "../part-navBarBottom"

import './index.css';


const useTableDataSourceRaw = (setTableDataMethod) => {
	const [memberList, setMemberList] = useState([]);
	const getMemberList = async () => {
		// TODO: test with API accessible
		const res = await fetch(`/api/team/get_all_players`);
		const resFetched = await res.json();

		let readSucceed = false;
		if (resFetched.status === "success") {
			readSucceed = true;

			let lines = []
			let keyCount=1;
			for (let memberInfo of resFetched.players) {
				lines.push({
					key: keyCount,
					user_id: memberInfo.user_id,
					name: memberInfo.name
				});
				keyCount++;
			}

			setMemberList(lines);
			setTableDataMethod(lines);
		}

		if (!readSucceed) {
			message.error("Failed to get player list - " + (resFetched.message || "please try later"))
			setMemberList([]);
		}
	};

	useEffect(() => {
		getMemberList();
	}, []);

	return memberList;
};



const TeamMemberManage = () => {
	// Member details drawer vars
	const [memberOverlayVisible, setMemberOverlayVisible] = useState(false);

	const memberOverlayPhRecord = { key: -1, user_id: -1, name: "Unset" };
	const [shownOverlayMemberRecord, setshownOverlayMemberRecord] = useState(memberOverlayPhRecord)

	const showMemberOverlay = () => { setMemberOverlayVisible(true); }
	const hideMemberOverlay = () => { setMemberOverlayVisible(false); }


	// Table vars

	// Fow shown rows
	const [tableDataSource, setTableDataSource] = useState([]);

	// For storing complete list without being affected by filters
	// func send to param for updating shown table as well
	const tableDataSourceRaw = useTableDataSourceRaw(setTableDataSource);

	const readSearchedTableDataSource = (searchStr) => {
		if (!searchStr) {
			setTableDataSource(tableDataSourceRaw);
		} else {
			setTableDataSource(tableDataSourceRaw.filter(
				(row) => row.name.includes(searchStr)
			));
		}
	}

	const tableColumns = [
		{
			title: "Name",
			dataIndex: 'name',
			key: 'name',
			render: (text, record) => {
				return (
					<a onClick={() => {
						setshownOverlayMemberRecord(record);
						showMemberOverlay();
					}}>{text}</a>
				);
			}
		},
		{
			title: "User ID",
			dataIndex: "user_id",
			key: "user_id",
			width: 80
		}
	]

	return (
		<>
			<div className="common--page-title">
				<h1>
					Report Viewer
					<p className="common--page-title-sub">Browse any injury reports from here</p>
				</h1>
				<div className="page-title--icon-cont"><TeamOutline /></div>
			</div>

			<div className="common--page-main">
				<div className="admin-record-browser--cont">

					<div className="admin-record-browser--direct-jump-section">
						<p className="admin-record-browser--instruction-text">
							Enter a form ID and view here:
						</p>
						<div className="admin-record-browser--direct-jump">
							<Input.Group compact>
								<Input
									id="admin-report-id-input"
									defaultValue=""
									placeholder="Enter a form ID here..."
									allowClear
								/>
								<Button
									type="primary"
									onClick={() => {
										let inputEle = window.document.getElementById("admin-report-id-input");
										if (inputEle) {
											let inputValue = inputEle.value;
											if (!inputValue) {
												message.warning("Please enter a form ID");
											} else if (inputValue.search(/[^0-9]/) > -1) {
												message.warning("Please enter a valid form ID");
											} else {
												window.location.hash = `#/record_browser/view_record?report_id=${inputValue}`
											}
										}
									}}
								>View</Button>
							</Input.Group>
						</div>
					</div>

					<div className="admin-record-browser--list-section">
						<p className="admin-record-browser--instruction-text">
							Or, select a member for viewing:
						</p>
						<div className="admin-record-browser--list-search">
							<Input.Group compact>
								<Input
									id="admin-players-search"
									defaultValue=""
									placeholder="Search for name..."
									allowClear
									onChange={(event) => {
										if (!event.target.value) { readSearchedTableDataSource(""); }
									}}
								/>
								<Button
									type="primary"
									onClick={()=> {
										let inputEle = window.document.getElementById("admin-players-search");
										if (inputEle) { readSearchedTableDataSource(inputEle.value); }
									}}
								><SearchOutline /></Button>
							</Input.Group>
						</div>
						<Table
							dataSource={tableDataSource}
							columns={tableColumns}
							size="middle"
						/>
					</div>

				</div>
			</div>

			<Drawer
				className="admin-record-browser--select-member-overlay"
				title={`${shownOverlayMemberRecord.name} - ${shownOverlayMemberRecord.user_id}`}
				placement="bottom"
				onClose={() => {
					hideMemberOverlay();
					setshownOverlayMemberRecord(memberOverlayPhRecord);
				}}
				visible={memberOverlayVisible}
				height={180}
			>
				<Button block size="middle" onClick={() => {
					// Jump to report calendar
					window.location.hash = `#/record_browser/calendar?user_id=${shownOverlayMemberRecord.user_id}${
						shownOverlayMemberRecord.name ?
							("&name=" + encodeURIComponent(shownOverlayMemberRecord.name)) :
							""
					}`;
					hideMemberOverlay();
					setshownOverlayMemberRecord(memberOverlayPhRecord);
				}}>View historical report(s)</Button>
			</Drawer>

			<NavBarBottom />
		</>
	)
}

export default TeamMemberManage;
