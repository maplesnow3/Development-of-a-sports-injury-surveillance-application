import { Table } from "antd"
import {
	LeftOutline
} from 'antd-mobile-icons';
import React, { useEffect, useState } from 'react';

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
		if (resFetched.status !== "success") {
			setReport([]);
		} else {
			readSucceed = true;

			const reportFetched = resFetched.report;
			console.log(reportFetched)

			let linesShown = [];
			let keyCount=1;

			// Read lines
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
						name: "2. Loss of consciousness (or prolonged loss of movement of < 1 – 2 seconds) or not responding appropriately to people",
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
						name: "6. Memory impairment (e.g. fails Maddocks questions – refer to CRT5)",
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
						name: "__Concussion Symptom Rating:__",
						value: " "
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "Headache",
						value: reportFetched.ConcussionSymptom[0]
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "“Pressure in head”",
						value: reportFetched.ConcussionSymptom[1]
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "Neck Pain",
						value: reportFetched.ConcussionSymptom[2]
					});
					keyCount++;
					linesShown.push({ key: keyCount,
						name: "Nausea or vomiting",
						value: reportFetched.ConcussionSymptom[3]
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "Dizziness",
						value: reportFetched.ConcussionSymptom[4]
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "Blurred vision",
						value: reportFetched.ConcussionSymptom[5]
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "Balance problems",
						value: reportFetched.ConcussionSymptom[6]
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "Sensitivity to light",
						value: reportFetched.ConcussionSymptom[7]
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "Sensitivity to noise",
						value: reportFetched.ConcussionSymptom[8]
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "Feeling slowed down",
						value: reportFetched.ConcussionSymptom[9]
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "Feeling like “in a fog“",
						value: reportFetched.ConcussionSymptom[10]
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "“Don’t feel right”",
						value: reportFetched.ConcussionSymptom[11]
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "Difficulty concentrating",
						value: reportFetched.ConcussionSymptom[12]
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "Difficulty remembering",
						value: reportFetched.ConcussionSymptom[13]
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "Fatigue or low energy",
						value: reportFetched.ConcussionSymptom[14]
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "Confusion",
						value: reportFetched.ConcussionSymptom[15]
					});
					keyCount++;


					linesShown.push({ key: keyCount,
						name: "Drowsiness",
						value: reportFetched.ConcussionSymptom[16]
					});
					keyCount++;


					linesShown.push({ key: keyCount,
						name: "More emotional",
						value: reportFetched.ConcussionSymptom[17]
					});
					keyCount++;


					linesShown.push({ key: keyCount,
						name: "Irritability",
						value: reportFetched.ConcussionSymptom[18]
					});
					keyCount++;


					linesShown.push({ key: keyCount,
						name: "Sadness",
						value: reportFetched.ConcussionSymptom[19]
					});
					keyCount++;


					linesShown.push({ key: keyCount,
						name: "Nervous or Anxious",
						value: reportFetched.ConcussionSymptom[20]
					});
					keyCount++;

					linesShown.push({ key: keyCount,
						name: "Trouble falling asleep",
						value: reportFetched.ConcussionSymptom[21]
					});
					keyCount++;

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
			alert("Failed to get specified report - please try later");
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

	// TODO: modify for matching response
	const tableColumns = [
		{
			title: '',
			dataIndex: 'name',
			key: 'name',
			render: (text) => {
				if (text.startsWith("__") && text.endsWith("__")) {
					return (<b>{text.replace(/^__/, "").replace(/__$/, "")}</b>);
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
						return "[empty]";
					}
					return text;
				} else if (Array.isArray(text)) {
					if (text.length <= 0 || text.length === 1 && text[0] === "") {
						return "[empty]";
					}
					return text.map((ele) => (<li>- {ele}</li>))
				}
			}
		},
	];

	return (
		<div>
			<div className="title-div">
				<p>Injury Form - ID: {(new URL("http://localhost" + window.location.hash.slice(1))).searchParams.get("report_id") || "?"}</p>
			</div>

			<div className="report-div">
				<Table dataSource={dataSource} columns={tableColumns} />
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


export default RecordViewer;
