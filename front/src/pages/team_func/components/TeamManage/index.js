import { Button, Drawer, Input, Table, message, Modal } from "antd"
import {
	TeamOutline,
	LeftOutline
} from 'antd-mobile-icons';
import React, { useEffect, useState } from 'react';

import './index.css';

import NavBarBottom from "../../../part-navBarBottom"

const useTeamList = () => {
	const [teamList, setTeamList] = useState([]);
	const getTeamList = async () => {
		const res = await fetch(
			`/api/team/get_all`
		);
		if (!res.ok) { alert("Failed to get team list - please try later"); }
		const resFetched = await res.json();

		if (resFetched.status !== "success") {
			setTeamList([]);
			if (resFetched.status === "failure") {
				alert("Failed to get team(s) - " + resFetched.message);
			}
		} else {
			let result = [];
			let keyCurrent = 1;
			for (let r of resFetched.team_list) {
				result.push({
					key: keyCurrent,
					team_id: r.team_id,
					name: r.name,
				});
				keyCurrent++;
			}

			result.sort((a, b) => {
				let aLower = a.name.toLowerCase();
				let bLower = b.name.toLowerCase();
				return (
					aLower > bLower ? 1 :
					aLower < bLower ? -1 :
					0
				);
			})

			setTeamList(result);
		}
	};

	useEffect(() => {
		getTeamList();
	}, []);

	return teamList;
};


const TeamManage = () => {
	const [overlayVisible, setOverlayVisible] = useState(false);
	const showOverlay = () => { setOverlayVisible(true); }
	const hideOverlay = () => { setOverlayVisible(false); }

	const [removeModalVisible, setRemoveModalVisible] = useState(false);
	const showRemoveModal = () => { setRemoveModalVisible(true); }
	const hideRemoveModal = () => { setRemoveModalVisible(false); }

	const [removedTeam, setRemovedTeam] = useState({
		team_id: -1,
		name: "unknown"
	})

	const dataSource = useTeamList();
	const tableColumns = [
		{
			title: 'Team Name',
			dataIndex: 'name',
			key: 'name',
			render: (text, record) => (<a href={`#/team_func/members?team_id=${record.team_id}&name=${encodeURIComponent(record.name)}`}>{text}</a>),
		},
		{
			title: 'ID',
			dataIndex: 'team_id',
			key: 'team_id',
			width: 50
		},
		{
			title: '',
			dataIndex: 'team_id',
			key: 'actions',
			width: 100,
			render: (id_text, record) => (<Button type="text" danger
				onClick = {() => {
					setRemovedTeam({
						team_id: record.team_id,
						name: record.name
					});
					showRemoveModal();
				}}
			>Delete</Button>),
		},
	];

	return (
		<>
			<div className="common--page-title">
				<h1>Team Management</h1>
				<div className="page-title--icon-cont"><TeamOutline /></div>
			</div>

			<div className="common--page-main">

				<div className="teams--list-section">
					<p className="teams--instruction-text">
						Please select the team to be viewed:
					</p>
					<Table
						dataSource={dataSource}
						columns={tableColumns}
						size="middle"
					/>
				</div>

				<div className="teams--button-cont">
					<Button type="primary" onClick={showOverlay}>
						Create a new team
					</Button>
				</div>

				<Drawer
					className="team-create-overlay"
					title="Create a new team"
					placement="bottom"
					onClose={hideOverlay}
					visible={overlayVisible}
					height={240}
				>
					<p>Please enter a name:</p>
					<Input.Group>
						<Input
							id="team--new-team-name"
							allowClear={true}
							defaultValue=""
							placeholder="Enter a team name here"
						/>
						<Button block type="primary" className="teams--create-confirm-btn"
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
						>Create</Button>
					</Input.Group>
				</Drawer>

				<Modal title="Delete team" visible={removeModalVisible} onCancel={hideRemoveModal} onOk={() => {
					hideRemoveModal();

					let xhr = new XMLHttpRequest();
					xhr.onload = function (event) {
						if (this.status === 200) {
							let resJson = JSON.parse(this.responseText);

							if (resJson.status !== "success") {
								message.error("Failed to delete the team - " + (resJson.message || "Please try later"));
							} else {
								message.success("Team deleted");
								window.location.reload();
							}
						} else {
							message.error("Failed to delete the team - Please try later");
						}
					};
					xhr.onerror = function () {
						message.error("Failed to delete the team - Please try later");
					};
					xhr.withCredentials = true;
					xhr.open('POST', '/api/team/remove', true);
					xhr.send(JSON.stringify({
						"team_id": removedTeam.team_id
					}));
				}} >
					Do you really want to delete "{removedTeam.name}"?
				</Modal>

			</div>

			<NavBarBottom />
		</>
	);
};


export default TeamManage;





