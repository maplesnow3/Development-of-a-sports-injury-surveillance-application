import { Table, message } from "antd"
import { DatabaseOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';

import NavBarBottom from "../../../part-navBarBottom"
import './index.css';


// Use search string `?report_id=123` for reading apporpriate report


const useReport = () => {
	const [report, setReport] = useState([]);
	const getReport = async () => {
		// A fake domain is given for successfully construct URL object
		const urlSearch =
			(new URL("http://localhost" + window.location.hash.slice(1))).searchParams;

		const checkedReportId = urlSearch.get("report_id") || null;
		if (checkedReportId === null) {
			setReport([]);
			alert("Please specify the report read");
			return;
		}

		const res = await fetch(`/api/injury_form/get/${checkedReportId}`);
		const resFetched = await res.json();

		let readSucceed = false;
		if (resFetched.status === "success") {
			readSucceed = true;

			const reportFetched = resFetched.report;
			console.log(reportFetched)

			let linesShown = [];
			let keyCount=1;

			// Read lines
			linesShown.push({ key: keyCount,
				name: "Report Date",
				value: reportFetched.date
			});
			keyCount++;

			linesShown.push({ key: keyCount,
				name: "Report ID",
				value: checkedReportId
			});
			keyCount++;

			linesShown.push({ key: keyCount,
				name: "Player ID",
				value: reportFetched.targetId
			});
			keyCount++;

			linesShown.push({ key: keyCount,
				name: "Injured body part",
				value: reportFetched.injuredBodyPart
			});
			keyCount++;

			linesShown.push({ key: keyCount,
				name: "Injury occurrence",
				value: reportFetched.injuryOccurrence
			});
			keyCount++;

			linesShown.push({ key: keyCount,
				name: "Nature / Type of Injury",
				value: reportFetched.nature_typeOfInjury
			});
			keyCount++;

			linesShown.push({ key: keyCount,
				name: "Removal from field",
				value: reportFetched.removalFromField
			});
			keyCount++;

			linesShown.push({ key: keyCount,
				name: "Actions following Injury",
				value: reportFetched.actionsFollowingInjury
			});
			keyCount++;

			linesShown.push({ key: keyCount,
				name: "Mechanism of Injury",
				value: reportFetched.mechanismOfInjury
			});
			keyCount++;

			linesShown.push({ key: keyCount,
				name: "Protective equipment worn",
				value: reportFetched.protectiveEquipmentWorn
			});
			keyCount++;

			linesShown.push({ key: keyCount,
				name: "Contributing Factors",
				value: reportFetched.contributingFactors
			});
			keyCount++;

			linesShown.push({ key: keyCount,
				name: "Provisional Injury Diagnosis",
				value: reportFetched.provisionalInjuryDiagnosis
			});
			keyCount++;

			linesShown.push({ key: keyCount,
				name: "Injury presentation",
				value: reportFetched.injuryPresentation
			});
			keyCount++;

			linesShown.push({ key: keyCount,
				name: "Initial Treatment",
				value: reportFetched.initialTreatment
			});
			keyCount++;

			linesShown.push({ key: keyCount,
				name: "Initial treating person",
				value: reportFetched.initialTreatingPerson
			});
			keyCount++;

			linesShown.push({ key: keyCount,
				name: "Referral to",
				value: reportFetched.referralTo
			});
			keyCount++;

			if (reportFetched.hasOwnProperty("concussionFormRetrived")) {
				if (!reportFetched.concussionFormRetrived) {
					linesShown.push({ key: keyCount,
						name: "__Concussion Details:__",
						value: "(Not available)"
					});
					keyCount++;
				} else {
					let concussionProblemsConverter = (intValue) => (
						intValue === 0 ? "No" :
						intValue === 1 ? "Yes (Reported)" :
						"Yes (Observed directly)"
					)

					linesShown.push({ key: keyCount,
						name: "__Concussion Details:__",
						value: " "
					});
					keyCount++;

					// concussionProblems
					linesShown.push({ key: keyCount,
						name: "1. Are there clinical features of a potentially serious or structural head and/or neck injury, including prolonged loss of consciousness (>1 minute) requiring urgent and emergency hospital transfer?",
						value: concussionProblemsConverter(reportFetched.concussionProblems[0])
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "2. Loss of consciousness (or prolonged loss of movement of < 1 ??? 2 seconds) or not responding appropriately to people",
						value: concussionProblemsConverter(reportFetched.concussionProblems[1])
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "3. No protective action in fall to ground (not bracing for impact/ floppy or stiff)",
						value: concussionProblemsConverter(reportFetched.concussionProblems[2])
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "4. Impact seizure/convulsion/fit (stiffening or shaking of arms and/or legs on impact)",
						value: concussionProblemsConverter(reportFetched.concussionProblems[3])
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "5. Confusion or disorientation",
						value: concussionProblemsConverter(reportFetched.concussionProblems[4])
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "6. Memory impairment (e.g. fails Maddocks questions ??? refer to CRT5)",
						value: concussionProblemsConverter(reportFetched.concussionProblems[5])
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "7. Balance disturbance or Clumsy (loss of control over movements) or slow to get up following a possible head injury (10-15 s)",
						value: concussionProblemsConverter(reportFetched.concussionProblems[6])
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "8. Player reports or displays any other concussion symptoms (refer to CRT5)",
						value: concussionProblemsConverter(reportFetched.concussionProblems[7])
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "9. Dazed or blank/vacant stare or not their normal selves/not reacting appropriately to surroundings",
						value: concussionProblemsConverter(reportFetched.concussionProblems[8])
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "10. Unusual or atypical behaviour for the player",
						value: concussionProblemsConverter(reportFetched.concussionProblems[9])
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "11. Loss of responsiveness (player motionless for 2-3 seconds or until support staff arrives)",
						value: concussionProblemsConverter(reportFetched.concussionProblems[10])
					});
					keyCount++;

					// ConcussionSymptom
					linesShown.push({ key: keyCount,
						name: "__Concussion Symptom(s) and Rating:__",
						value: " "
					});
					keyCount++;

					if (reportFetched.ConcussionSymptom[0] > 0) {
						linesShown.push({ key: keyCount,
							name: "Headache",
							value: reportFetched.ConcussionSymptom[0]
						});
						keyCount++;
					}
					if (reportFetched.ConcussionSymptom[1] > 0) {
						linesShown.push({ key: keyCount,
							name: "???Pressure in head???",
							value: reportFetched.ConcussionSymptom[1]
						});
						keyCount++;
					}

					if (reportFetched.ConcussionSymptom[2] > 0) {
						linesShown.push({ key: keyCount,
							name: "Neck Pain",
							value: reportFetched.ConcussionSymptom[2]
						});
						keyCount++;
					}

					if (reportFetched.ConcussionSymptom[3] > 0) {
						linesShown.push({ key: keyCount,
							name: "Nausea or vomiting",
							value: reportFetched.ConcussionSymptom[3]
						});
						keyCount++;
					}

					if (reportFetched.ConcussionSymptom[4] > 0) {
						linesShown.push({ key: keyCount,
							name: "Dizziness",
							value: reportFetched.ConcussionSymptom[4]
						});
						keyCount++;
					}

					if (reportFetched.ConcussionSymptom[5] > 0) {
						linesShown.push({ key: keyCount,
							name: "Blurred vision",
							value: reportFetched.ConcussionSymptom[5]
						});
						keyCount++;
					}

					if (reportFetched.ConcussionSymptom[6] > 0) {
						linesShown.push({ key: keyCount,
							name: "Balance problems",
							value: reportFetched.ConcussionSymptom[6]
						});
						keyCount++;
					}

					if (reportFetched.ConcussionSymptom[7] > 0) {
						linesShown.push({ key: keyCount,
							name: "Sensitivity to light",
							value: reportFetched.ConcussionSymptom[7]
						});
						keyCount++;
					}

					if (reportFetched.ConcussionSymptom[8] > 0) {
						linesShown.push({ key: keyCount,
							name: "Sensitivity to noise",
							value: reportFetched.ConcussionSymptom[8]
						});
						keyCount++;
					}

					if (reportFetched.ConcussionSymptom[9] > 0) {
						linesShown.push({ key: keyCount,
							name: "Feeling slowed down",
							value: reportFetched.ConcussionSymptom[9]
						});
						keyCount++;
					}

					if (reportFetched.ConcussionSymptom[10] > 0) {
						linesShown.push({ key: keyCount,
							name: "Feeling like ???in a fog???",
							value: reportFetched.ConcussionSymptom[10]
						});
						keyCount++;
					}

					if (reportFetched.ConcussionSymptom[11] > 0) {
						linesShown.push({ key: keyCount,
							name: "???Don???t feel right???",
							value: reportFetched.ConcussionSymptom[11]
						});
						keyCount++;
					}

					if (reportFetched.ConcussionSymptom[12] > 0) {
						linesShown.push({ key: keyCount,
							name: "Difficulty concentrating",
							value: reportFetched.ConcussionSymptom[12]
						});
						keyCount++;
					}

					if (reportFetched.ConcussionSymptom[13] > 0) {
						linesShown.push({ key: keyCount,
							name: "Difficulty remembering",
							value: reportFetched.ConcussionSymptom[13]
						});
						keyCount++;
					}

					if (reportFetched.ConcussionSymptom[14] > 0) {
						linesShown.push({ key: keyCount,
							name: "Fatigue or low energy",
							value: reportFetched.ConcussionSymptom[14]
						});
						keyCount++;
					}

					if (reportFetched.ConcussionSymptom[15] > 0) {
						linesShown.push({ key: keyCount,
							name: "Confusion",
							value: reportFetched.ConcussionSymptom[15]
						});
						keyCount++;
					}


					if (reportFetched.ConcussionSymptom[16] > 0) {
						linesShown.push({ key: keyCount,
							name: "Drowsiness",
							value: reportFetched.ConcussionSymptom[16]
						});
						keyCount++;
					}

					if (reportFetched.ConcussionSymptom[17] > 0) {
						linesShown.push({ key: keyCount,
							name: "More emotional",
							value: reportFetched.ConcussionSymptom[17]
						});
						keyCount++;
					}

					if (reportFetched.ConcussionSymptom[18] > 0) {
						linesShown.push({ key: keyCount,
							name: "Irritability",
							value: reportFetched.ConcussionSymptom[18]
						});
						keyCount++;
					}


					if (reportFetched.ConcussionSymptom[19] > 0) {
						linesShown.push({ key: keyCount,
							name: "Sadness",
							value: reportFetched.ConcussionSymptom[19]
						});
						keyCount++;
					}

					if (reportFetched.ConcussionSymptom[20] > 0) {
						linesShown.push({ key: keyCount,
							name: "Nervous or Anxious",
							value: reportFetched.ConcussionSymptom[20]
						});
						keyCount++;
					}

					if (reportFetched.ConcussionSymptom[21] > 0) {
						linesShown.push({ key: keyCount,
							name: "Trouble falling asleep",
							value: reportFetched.ConcussionSymptom[21]
						});
						keyCount++;
					}

					linesShown.push({ key: keyCount,
						name: "__Total number of symptom(s)__",
						value: reportFetched.ConcussionSymptom.reduce((prevV, currV) => {
							return (prevV + (currV === 0 ? 0 : 1))
						}, 0)
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "__Total rating__",
						value: reportFetched.ConcussionSymptom.reduce((prevV, currV) => {
							return (prevV + currV)
						}, 0)
					});
					keyCount++;

					// 2 Questions and the percent stuff
					linesShown.push({ key: keyCount,
						name: "Do your symptoms get worse with physical activity?",
						value: reportFetched.physicalActivity === true ? "Yes" : "No"
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "Do your symptoms get worse with mental activity?",
						value: reportFetched.mentalActivity === true ? "Yes" : "No"
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "If 100% is feeling perfectly normal, what percent of normal do you feel?",
						value: reportFetched.percentOfFeel
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "If not 100%, why?",
						value: reportFetched.why
					});
					keyCount++;
				}
			}

			setReport(linesShown);
		}

		if (!readSucceed) {
			if (resFetched.hasOwnProperty("status") && resFetched.status === "failure") {
				message.error("Failed to get specified report - " + resFetched.message || "please try laater");
			} else {
				message.error("Failed to get specified report - please try later");
			}
			setReport([]);
		}
	};

	useEffect(() => {
		getReport();
	}, []);

	return report;
};



const RecordViewer = () => {
	const dataSource = useReport();

	const tableColumns = [
		{
			title: '',
			dataIndex: 'name',
			key: 'name',
			render: (text) => {
				if (text.startsWith("__") && text.endsWith("__")) {
					return (<b><i>{text.replace(/^__/, "").replace(/__$/, "")}</i></b>);
				} else {
					return text;
				}
			}
		},
		{
			title: '',
			dataIndex: 'value',
			key: 'value',
			render: (text) => {
				if (typeof text === "string" || typeof text === "number") {
					if (typeof text === "string" && text === "") {
						return (<i>(empty)</i>);
					}
					return text;
				} else if (Array.isArray(text)) {
					if (text.length <= 0 || text.length === 1 && text[0] === "") {
						return (<i>(empty)</i>);
					}
					return text.map((ele) => (<li>- {ele}</li>))
				}
			}
		},
	];

	return (
		<>
			<div className="common--page-title">
				<h1>
					Injury Details
          			<p className="common--page-title-sub">
					  Form ID: {(new URL("http://localhost" + window.location.hash.slice(1))).searchParams.get("report_id") || "?"}
					</p>
				</h1>
				<div className="page-title--icon-cont"><DatabaseOutlined /></div>
			</div>

			<div className="common--page-main">
				<div className="record-viewer--details-section">
					<p className="record-viewer--instruction-text">Submitted report details:</p>
					<Table dataSource={dataSource} columns={tableColumns} />
				</div>
			</div>

			<NavBarBottom />
		</>
	);
};


export default RecordViewer;
