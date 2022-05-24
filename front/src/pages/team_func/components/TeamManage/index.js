import { Button, Drawer, Input, Table, message, Modal } from "antd"
import {
	TeamOutline,
	LeftOutline
} from 'antd-mobile-icons';
import React, { useEffect, useState } from 'react';

import './index.css';


const useTeamList = () => {
	const [teamList, setTeamList] = useState([]);
	const getTeamList = async () => {
		// TODO: use proper API for getting date list
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
			render: (text, record) => (<a href={`#/team_func/members?team_id=${record.team_id}`}>{text}</a>),
		},
		{
			title: 'ID',
			dataIndex: 'team_id',
			key: 'team_id',
		},
		{
			title: '',
			dataIndex: 'team_id',
			key: 'actions',
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
			<div className="title-div">
				<p>Team Management</p>
				<span className="title--icon">
					<TeamOutline />
				</span>
			</div>

			<div className="team-table-div">
				<p>Select the team to be viewed:</p>
				<Table
					dataSource={dataSource}
					columns={tableColumns}
				/>
			</div>

			<div className="team-button-div">
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
					<Button type="primary" className="team-create-confirm"
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
		</>
	);
};


export default TeamManage;





