import { Button, Drawer, Form, Input, Table, message, Modal } from "antd"
import {
	TeamOutline,
	SearchOutline
} from 'antd-mobile-icons';
import React, { useEffect, useState } from 'react';

import NavBarBottom from "../../../part-navBarBottom"

import './index.css';


// TODO:
// - Add new member REQUEST - Added; TODO test with API
// - Remove member REQUEST - TODO test with API


const useTableDataSourceRaw = (setTableDataMethod, setTeamIdMethod) => {
	const [memberList, setMemberList] = useState([]);
	const getMemberList = async () => {
		// A fake domain is given for successfully construct URL object
		const urlSearch =
			(new URL("http://localhost" + window.location.hash.slice(1))).searchParams;

		const checkedTeamId = urlSearch.get("team_id") || null;
		if (checkedTeamId === null) {
			setMemberList([]);
			alert("Please specify the report read");
			return;
		}

		// Save the team_id found
		setTeamIdMethod(Number(checkedTeamId));

		const res = await fetch(`/api/team/members/get/${checkedTeamId}`);
		const resFetched = await res.json();

		let readSucceed = false;
		if (resFetched.status === "success") {
			readSucceed = true;

			let lines = []
			let keyCount=1;
			for (let memberInfo of resFetched.team_members) {
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
			message.error("Failed to get team member(s) - " + (resFetched.message || "please try later"))
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
	// setshownOverlayMemberRecord(selectedRecord);
	// setshownOverlayMemberRecord(memberOverlayPhRecord);


	// Add member drawer vars
	const [addOverlayVisible, setAddOverlayVisible] = useState(false);
	const showAddOverlay = () => { setAddOverlayVisible(true); }
	const hideAddOverlay = () => { setAddOverlayVisible(false); }
	const [addMemberForm] = Form.useForm();

	// Remove selected member modal vars
	const [removeOneModalVisible, setRemoveOneModalVisible] = useState(false);
	const showRemoveOneModal = () => { setRemoveOneModalVisible(true); }
	const hideRemoveOneModal = () => { setRemoveOneModalVisible(false); }

	// Remove multiple member(s) modal vars
	const [removeModalVisible, setRemoveModalVisible] = useState(false);
	const showRemoveModal = () => { setRemoveModalVisible(true); }
	const hideRemoveModal = () => { setRemoveModalVisible(false); }


	// Team id storage and Table vars
	const [targetTeamId, setTargetTeamId] = useState(-1)
	const [tableDataSource, setTableDataSource] = useState([]);

	// For storing complete list without being affected by filters
	// func send to param for updating shown table as well
	// second func for read targetId at the same time
	const tableDataSourceRaw = useTableDataSourceRaw(setTableDataSource, setTargetTeamId);

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
			title: "ID",
			dataIndex: "user_id",
			key: "user_id",
			width: 80
		}
	]

	// Storage for current selected table row key value(s)
	const [tableRowKeysSelected, setTableRowKeysSelected] = useState([])

	// Method for sending removing member request
	// TODO: Test with backend
	const sendRemoveMemberRequest = (requestJsonObj) => {
		console.log(requestJsonObj)

		let xhr = new XMLHttpRequest();
		xhr.onload = function (event) {
			if (this.status === 200) {
				let resJson = JSON.parse(this.responseText);

				if (resJson.status !== "success") {
					// TODO - add not-all-removed condition check
					message.error("Failed to remove member(s) - " + (resJson.message || "Please try later"));
				} else {
					message.success("Member(s) removed from the team");
					window.location.reload();
				}
			} else {
				message.error("Failed to remove member(s) - Please try later");
			}
		};
		xhr.onerror = function () {
			message.error("Failed to remove member(s) - Please try later");
		};
		xhr.withCredentials = true;
		xhr.open('POST', '/api/team/members/remove', true);
		xhr.send(JSON.stringify(requestJsonObj));
	}

	return (
		<>
			<div className="common--page-title">
				<h1>
					Team Members
					<p className="common--page-title-sub">{(() => {
						return (new URL("http://localhost" + window.location.hash.slice(1))).searchParams.get("name") || ""
					})()}</p>
				</h1>
				<div className="page-title--icon-cont"><TeamOutline /></div>
			</div>

			<div className="common--page-main">
				<div className="team-members--cont">

					<div className="team-members--list-section">
						<p className="team-members--instruction-text">
							Please select a member for more operations
						</p>
						<div className="team-members--list-search">
							<Input.Group compact>
								<Input
									id="team-members-search"
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
										let inputEle = window.document.getElementById("team-members-search");
										if (inputEle) { readSearchedTableDataSource(inputEle.value); }
									}}
								><SearchOutline /></Button>
							</Input.Group>
						</div>
						<Table
							rowSelection={{
								type: "checkbox",
								onChange: (selectedRowKeys) => {
									setTableRowKeysSelected(selectedRowKeys);
								}
							}}
							dataSource={tableDataSource}
							columns={tableColumns}
							size="middle"
						/>
					</div>

					<div className="team-members--button-cont">
						<Button block type="primary"
							onClick={() => {
								showAddOverlay();
							}}
						>Add a new member</Button>
						<Button block danger
							onClick={() => {
								if (tableRowKeysSelected.length < 1) {
									message.warn("Please tick the member(s) to be removed");
								} else {
									// Confirm from modal and run submit
									showRemoveModal();
								}
							}}
						>Remove selected member(s)</Button>
					</div>

				</div>
			</div>

			<Drawer
				className="team-members--select-member-overlay"
				title={`${shownOverlayMemberRecord.name} - ${shownOverlayMemberRecord.user_id}`}
				placement="bottom"
				onClose={() => {
					hideMemberOverlay();
					setshownOverlayMemberRecord(memberOverlayPhRecord);
				}}
				visible={memberOverlayVisible}
				height={320}
			>
				<Button block size="middle" onClick={() => {
					// Jump to add new report for the user
					window.location.hash = `#/newform?user_id=${shownOverlayMemberRecord.user_id}`;
					hideMemberOverlay();
					setshownOverlayMemberRecord(memberOverlayPhRecord);
				}}>Create a new injury report</Button>
				<Button block size="middle" onClick={() => {
					// Jump to report calendar
					window.location.hash = `#/record_browser/calendar?user_id=${shownOverlayMemberRecord.user_id}`;
					hideMemberOverlay();
					setshownOverlayMemberRecord(memberOverlayPhRecord);
				}}>View historical report(s)</Button>

				<hr />

				<Button block danger onClick={() => {
					showRemoveOneModal();
				}}>Remove from your team</Button>
			</Drawer>

			<Drawer
				className="team-members--add-member-overlay"
				title="Add a new member"
				placement="bottom"
				onClose={hideAddOverlay}
				visible={addOverlayVisible}
				height={320}
			>
				<p>Please specify ID and Access code:</p>
				<Form
					form={addMemberForm}
					layout='horizontal'
					onFinish={(inputObj) => {
						// console.log(inputObj);
						if (inputObj.user_id.search(/[^0-9]/) > -1) {
							message.warn("Please enter a valid ID number");
						} else {
							let requestJson = {
								"team_id": targetTeamId,
								"add_members": [
									{
										user_id: Number(inputObj.user_id),
										access_code: inputObj.access_code
									}
								]
							};

							let xhr = new XMLHttpRequest();
							xhr.onload = function (event) {
								if (this.status === 200) {
									let resJson = JSON.parse(this.responseText);

									if (resJson.status !== "success") {
										message.error("Failed to add new member - " + (resJson.message || "Please try later"));
									} else {
										message.success("Member added");
										window.location.reload();
									}
								} else {
									message.error("Failed to add new member - Please try later");
								}
							};
							xhr.onerror = function () {
								message.error("Failed to add new member - Please try later");
							};
							xhr.withCredentials = true;
							xhr.open('POST', '/api/team/members/add', true);
							xhr.send(JSON.stringify(requestJson));

							addMemberForm.resetFields();
							hideAddOverlay();
						}
					}}
				>
					<Form.Item name='user_id' rules={[
						{ required: true, message: "ID of the new member is required" }
					]}>
						<Input
							allowClear={true}
							defaultValue=""
							placeholder="ID of the new member..."
							type='text'
						/>
					</Form.Item>
					<Form.Item name='access_code' rules={[
						{ required: true, message: "Access code is required" }
					]}>
						<Input
							allowClear={true}
							defaultValue=""
							placeholder='Access code...'
							type='text'
						/>
					</Form.Item>

					<Button block size="middle" type="primary" htmlType="submit">Add</Button>
				</Form>
			</Drawer>

			<Modal title={`Remove a member from the team`} visible={removeOneModalVisible} onCancel={() => {
				hideRemoveOneModal();
			}} onOk={() => {
				hideRemoveOneModal();
				hideMemberOverlay();

				let requestJson = {
					"team_id": targetTeamId,
					"remove_members": [
						{ "user_id": shownOverlayMemberRecord.user_id || -1 }
					]
				};
				sendRemoveMemberRequest(requestJson);

				// Clear after close overlay and used the value
				setshownOverlayMemberRecord(memberOverlayPhRecord);
			}} >
				Do you really want to remove {shownOverlayMemberRecord.name} from your team?
			</Modal>

			<Modal title="Remove member(s) from team" visible={removeModalVisible} onCancel={hideRemoveModal} onOk={() => {
				hideRemoveModal();

				let selectedRowUserIds = [];
				for (let rowKey of tableRowKeysSelected) {
					let dataRawI = tableDataSourceRaw.findIndex((element) => element.key === rowKey)
					if (dataRawI < 0) {
						console.log("Remove member error: cannot find row with key " + rowKey);
					} else {
						// console.log(tableDataSourceRaw[dataRawI]);
						selectedRowUserIds.push(tableDataSourceRaw[dataRawI].user_id);
					}

					// TODO: Remove selected user with API
					console.log(selectedRowUserIds);
				}
			}} >
				Do you really want to remove the selected {
					tableRowKeysSelected.length > 1 ?
						`${tableRowKeysSelected.length} members` :
						`member`
				}?
			</Modal>

			<NavBarBottom />
		</>
	)
}

export default TeamMemberManage;
