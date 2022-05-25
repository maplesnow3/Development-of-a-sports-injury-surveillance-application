import { Button, Drawer, Form, Input, Table, message, Modal } from "antd"
import {
	TeamOutline,
	SearchOutline
} from 'antd-mobile-icons';
import React, { useEffect, useState } from 'react';

import NavBarBottom from "../../../part-navBarBottom"

import './index.css';


// TODO:
// - Add new member REQUEST
// - Click name/ID for popup drawer menu
// - Jump to create new form
// - Jump to form list
// - Remove a single user


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
		},
		{
			title: "ID",
			dataIndex: "user_id",
			key: "user_id",
			width: 80
		}
	]

	const [tableRowKeysSelected, setTableRowKeysSelected] = useState([])

	const [addOverlayVisible, setAddOverlayVisible] = useState(false);
	const showAddOverlay = () => { setAddOverlayVisible(true); }
	const hideAddOverlay = () => { setAddOverlayVisible(false); }
	const [addMemberForm] = Form.useForm();

	const [removeModalVisible, setRemoveModalVisible] = useState(false);
	const showRemoveModal = () => { setRemoveModalVisible(true); }
	const hideRemoveModal = () => { setRemoveModalVisible(false); }

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

							// TODO: Call proper API
							console.log(requestJson);

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


					{/* <Button type="primary" className="team-create-confirm"
						onClick={
							() => {
								let teamNameInput = document.getElementById("team--new-team-name");
								if (!teamNameInput || teamNameInput.value === "") {
									message.warning("Please enter a team name");
								} else {
									let xhr = new XMLHttpRequest();
									xhr.onload = function (event) {
										if (this.status === 200) {
											let resJson = JSON.parse(this.responseText);

											if (resJson.status !== "success") {
												message.error("Failed to create new team - " + (resJson.message || "Please try later"));
											} else {

												// let newTeamId = resJson.team_id;
												message.success("New team created");
												window.location.reload();
												// if (newTeamId) {
												// 	window.location.hash = `#/team_func/members?team_id=${newTeamId}`
												// } else {
												// 	window.location.reload();
												// }
											}
										} else {
											message.error("Failed to create new team - Please try later");
										}
									};
									xhr.onerror = function () {
										message.error("Failed to create new team - Please try later");
									};
									xhr.withCredentials = true;
									xhr.open('POST', '/api/team/new', true);
									xhr.send(JSON.stringify({
										"name": teamNameInput.value
									}));

									hideOverlay();
								}
							}
						}
					>Create</Button> */}
			</Drawer>


			<Modal title="Remove member(s) from team" visible={removeModalVisible} onCancel={hideRemoveModal} onOk={() => {
				hideRemoveModal();

				let selectedRowUserId = [];
				for (let rowKey of tableRowKeysSelected) {
					let dataRawI = tableDataSourceRaw.findIndex((element) => element.key === rowKey)
					if (dataRawI < 0) {
						console.log("Remove member error: cannot find row with key " + rowKey);
					} else {
						// console.log(tableDataSourceRaw[dataRawI]);
						selectedRowUserId.push(tableDataSourceRaw[dataRawI].user_id);
					}

					// TODO: Remove selected user with API
					console.log(selectedRowUserId);
				}

				// let xhr = new XMLHttpRequest();
				// xhr.onload = function (event) {
				// 	if (this.status === 200) {
				// 		let resJson = JSON.parse(this.responseText);

				// 		if (resJson.status !== "success") {
				// 			message.error("Failed to delete the team - " + (resJson.message || "Please try later"));
				// 		} else {
				// 			message.success("Team deleted");
				// 			window.location.reload();
				// 		}
				// 	} else {
				// 		message.error("Failed to delete the team - Please try later");
				// 	}
				// };
				// xhr.onerror = function () {
				// 	message.error("Failed to delete the team - Please try later");
				// };
				// xhr.withCredentials = true;
				// xhr.open('POST', '/api/team/remove', true);
				// xhr.send(JSON.stringify({
				// 	"team_id": removedTeam.team_id
				// }));
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
