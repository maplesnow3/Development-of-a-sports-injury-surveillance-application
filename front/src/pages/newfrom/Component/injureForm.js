import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react'
import {
   Form, Button, Checkbox, Space, Input, DatePicker,
   Radio, TextArea, Collapse, Slider, Tag, Toast
} from 'antd-mobile'
import { HeartOutline } from 'antd-mobile-icons'



const InjureForm = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const { state } = location;
   const targetId = (() => {
      let specifiedTargetId =
         Number((new URL("http://localhost" + window.location.hash.slice(1))).searchParams.get("user_id")) || -1;
      return specifiedTargetId;
   })();
   let [concuFormDisabled, setConcuFormDisabled] = useState(true)
   let [concuFormPromptStyle, setConcuFormPromptStyle] = useState({display: "none"})

   return (
      <div>
         <Form
            name='form'
            onFinish={async (values) => {
               const {
                  injuredBodyPart, injuryOccurrence, nature_typeOfInjury, nature_typeOfInjuryOther, removalFromField,
                  actionsFollowingInjury, mechanismOfInjury, mechanismOfInjuryOther, protectiveEquipmentWorn, protectiveEquipmentWornOther,
                  contributingFactors, provisionalInjuryDiagnosis, injuryPresentation, initialTreatment, initialTreatmentOther,
                  initialTreatingPerson, initialTreatingPersonOther, referralTo, referralToOther,
                  q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11,
                  headache, pressureInHead, neckPain, NauseaOrVomiting, dizziness,
                  blurredVision, balanceProblems, sensitivityToLight, sensitivityToNoise,
                  feelingSlowedDown, feelingLikeInAFog, dontFeelRight, difficultyConcentrating,
                  difficultyRemembering, fatigueOrLowEnergy, confusion, drowsiness, moreEmotional,
                  irritability, sadness, nervousOrAnxious, troubleFallingAsleep, Y_N_1, Y_N_2,
                  range, rangeReason,
               } = { ...state, ...values }

               let formData = {
                  targetId: targetId,
                  injuredBodyPart: injuredBodyPart || [],
                  injuryOccurrence: injuryOccurrence || [],
                  nature_typeOfInjury: nature_typeOfInjury || [],
                  removalFromField: removalFromField || "",
                  actionsFollowingInjury: actionsFollowingInjury || "",
                  mechanismOfInjury: mechanismOfInjury || [],
                  trainingSpecific: [],
                  protectiveEquipmentWorn: protectiveEquipmentWorn || [],
                  contributingFactors: contributingFactors || [],
                  provisionalInjuryDiagnosis: provisionalInjuryDiagnosis || "",
                  injuryPresentation: injuryPresentation || "",
                  initialTreatment: initialTreatment || [],
                  initialTreatingPerson: initialTreatingPerson || [],
                  referralTo: referralTo || []
               }

               if (formData.nature_typeOfInjury.indexOf("Other") > -1) {
                  formData.nature_typeOfInjury[formData.nature_typeOfInjury.indexOf("Other")] =
                     "[Other] " + nature_typeOfInjuryOther
               }
               if (formData.mechanismOfInjury.indexOf("Other") > -1) {
                  formData.mechanismOfInjury[formData.mechanismOfInjury.indexOf("Other")] =
                     "[Other] " + mechanismOfInjuryOther
               }
               if (formData.protectiveEquipmentWorn.indexOf("Other") > -1) {
                  formData.protectiveEquipmentWorn[formData.protectiveEquipmentWorn.indexOf("Other")] =
                     "[Other] " + protectiveEquipmentWornOther
               }
               if (formData.initialTreatment.indexOf("Other") > -1) {
                  formData.initialTreatment[formData.initialTreatment.indexOf("Other")] =
                     "[Other] " + initialTreatmentOther
               }
               if (formData.initialTreatingPerson.indexOf("Other") > -1) {
                  formData.initialTreatingPerson[formData.initialTreatingPerson.indexOf("Other")] =
                     "[Other] " + initialTreatingPersonOther
               }
               if (formData.referralTo.indexOf("Other") > -1) {
                  formData.initialTreatingPerson[formData.referralTo.indexOf("Other")] =
                     "[Other] " + referralToOther
               }

               // Append concussion details if required
               if (formData.nature_typeOfInjury.indexOf("Concussion") > -1) {
                  formData["concussionProblems"] = [
                     q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11
                  ] || [0,0,0,0,0,0,0,0,0,0,0];
                  formData["ConcussionSymptom"] = [
                     headache, pressureInHead, neckPain, NauseaOrVomiting, dizziness,
                     blurredVision, balanceProblems, sensitivityToLight, sensitivityToNoise,
                     feelingSlowedDown, feelingLikeInAFog, dontFeelRight, difficultyConcentrating,
                     difficultyRemembering, fatigueOrLowEnergy, confusion, drowsiness, moreEmotional,
                     irritability, sadness, nervousOrAnxious, troubleFallingAsleep
                  ] || [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                  formData["physicalActivity"] = Y_N_1 || false;
                  formData["mentalActivity"] = Y_N_2 || false;
                  formData["percentOfFeel"] = range || 0;
                  formData["why"] = rangeReason || "";

               }
               console.log(formData)
               // console.log(values)

               let xhr = new XMLHttpRequest();
               xhr.onload = function (event) {
                  if (this.status === 200) {
                     let resFetched = JSON.parse(this.responseText) || {
                        status: "failure",
                        message: "Cannot parse response"
                     }
                     if (resFetched.status === "success") {
                        window.location.hash = `#/record_browser/view_record?report_id=${resFetched.inj_form_id}`
                        return;
                     }
                     if (resFetched.status === "failure") {
                        alert("Submission failed: " + resFetched.message);
                     }
                  } else {
                     alert("Submission failed: please try later");
                  }
               };
               xhr.open('POST', '/api/injury_form/new', true);
               xhr.send(JSON.stringify(formData));

            }}
            footer={
               <Button style={{ backgroundColor: '#1DB860' }} block type='submit' color='primary' size='large'>
                  Submit the form
               </Button>
            }
         >
            <Collapse defaultActiveKey='1' accordion>
               <Collapse.Panel key='1' title='Match or Training Injury Form'>

                  <Collapse defaultActiveKey={(() => {
                     let actived = []
                     for (let n = 1; n <= 13; n++) {
                        actived.push(n.toString());
                     }
                     return actived;
                  })()}>
                     <Collapse.Panel key='1' title='1. Injured Body Part'>
                        <Form.Item name='injuredBodyPart' label='Please choose at least one'
                           rules={[
                              { required: true, message: 'Please choose at least one' },
                           ]}
                        >
                           <Checkbox.Group>
                              <Space direction='vertical'>
                                 <Checkbox value='Right'>Right</Checkbox>
                                 <Checkbox value='Left'>Left</Checkbox>
                                 <Checkbox value='Bilateral'>Bilateral</Checkbox>
                                 <Checkbox value='Centre'>Centre</Checkbox>
                                 <Checkbox value='Head/Face'>Head/Face</Checkbox>
                                 <Checkbox value='Neck/Cervical spine'>Neck/Cervical spine</Checkbox>
                                 <Checkbox value='Shoulder/Clavicle'>Shoulder/Clavicle</Checkbox>
                                 <Checkbox value='Upper arm'>Upper arm</Checkbox>
                                 <Checkbox value='Elbow'>Elbow</Checkbox>

                                 <Checkbox value='Forearm'>Forearm</Checkbox>
                                 <Checkbox value='Forearm: Wrist' className="checkbox-level-2">Wrist</Checkbox>
                                 <Checkbox value='Forearm: Hand/Fingers' className="checkbox-level-2">Hand/Fingers</Checkbox>

                                 <Checkbox value='Thorax (Chest)'>Thorax (Chest)</Checkbox>
                                 <Checkbox value='Thorax (Chest): Sternum' className="checkbox-level-2">Sternum</Checkbox>
                                 <Checkbox value='Thorax (Chest): Ribs' className="checkbox-level-2">Ribs</Checkbox>
                                 <Checkbox value='Thorax (Chest): Upper back' className="checkbox-level-2">Upper back</Checkbox>

                                 <Checkbox value='Abdomen'>Abdomen</Checkbox>
                                 <Checkbox value='Lower back/sacrum'>Lower back/sacrum</Checkbox>

                                 <Checkbox value='Pelvis'>Pelvis</Checkbox>
                                 <Checkbox value='Pelvis: Hip' className="checkbox-level-2">Hip</Checkbox>
                                 <Checkbox value='Pelvis: Buttock' className="checkbox-level-2">Buttock</Checkbox>
                                 <Checkbox value='Pelvis: Groin' className="checkbox-level-2">Groin</Checkbox>

                                 <Checkbox value='Thigh'>Thigh</Checkbox>
                                 <Checkbox value='Thigh: Quadriceps' className="checkbox-level-2">Quadriceps</Checkbox>
                                 <Checkbox value='Thigh: Hamstring' className="checkbox-level-2">Hamstring</Checkbox>
                                 <Checkbox value='Thigh: Adductors' className="checkbox-level-2">Adductors</Checkbox>

                                 <Checkbox value='Knee'>Knee</Checkbox>
                                 <Checkbox value='Knee: ACL' className="checkbox-level-2">ACL</Checkbox>
                                 <Checkbox value='Knee: PCL' className="checkbox-level-2">PCL</Checkbox>
                                 <Checkbox value='Knee: Meniscus' className="checkbox-level-2">Meniscus</Checkbox>
                                 <Checkbox value='Knee: MCL' className="checkbox-level-2">MCL</Checkbox>

                                 <Checkbox value='Lower leg'>Lower leg</Checkbox>
                                 <Checkbox value='Lower leg: Calf' className="checkbox-level-2">Calf</Checkbox>
                                 <Checkbox value='Lower leg: Achilles tendon' className="checkbox-level-2">Achilles tendon</Checkbox>

                                 <Checkbox value='Ankle'>Ankle</Checkbox>

                                 <Checkbox value='Foot'>Foot</Checkbox>
                                 <Checkbox value='Foot: Rear' className="checkbox-level-2">Rear</Checkbox>
                                 <Checkbox value='Foot: Fore' className="checkbox-level-2">Fore</Checkbox>
                                 <Checkbox value='Foot: Toe' className="checkbox-level-2">Toe</Checkbox>

                              </Space>
                           </Checkbox.Group>
                        </Form.Item>
                     </Collapse.Panel>

                     <Collapse.Panel key='2' title='2. Injury Occurrence'>
                        <Form.Item name='injuryOccurrence' label='Please choose at least one' rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Checkbox.Group>
                              <Space direction='vertical'>
                                 <Checkbox value='Match'>Match</Checkbox>
                                 <Checkbox value='Match: First Half' className="checkbox-level-2">First Half</Checkbox>
                                 <Checkbox value='Match: Second Half' className="checkbox-level-2">Second Half</Checkbox>
                                 <Checkbox value='Training'>Training</Checkbox>
                                 <Checkbox value='Warm up/cool down'>Warm up/cool down</Checkbox>
                              </Space>
                           </Checkbox.Group>
                        </Form.Item>
                     </Collapse.Panel>

                     <Collapse.Panel key='3' title='3. Nature / Type of Injury'>
                        <Form.Item name='nature_typeOfInjury' label='Please choose at least one' rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Checkbox.Group>
                              <Space direction='vertical'>
                                 <Checkbox value='Abrasion/graze'>Abrasion/graze</Checkbox>
                                 <Checkbox value='Bleeding'>Bleeding</Checkbox>
                                 <Checkbox value='Bruise/Contusion/Haematoma/Cork'>Bruise/Contusion/Haematoma/Cork</Checkbox>

                                 <Checkbox value='Concussion' onChange={
                                    async (checked) => {
                                       setConcuFormDisabled(!checked);
                                       checked ?
                                          setConcuFormPromptStyle({display: "block"}) :
                                          setConcuFormPromptStyle({display: "none"});
                                    }
                                 }>Concussion</Checkbox>
                                 <p className="checkbox-level-2" style={concuFormPromptStyle}>
                                    Please fill the concussion form in the end
                                 </p>
                                 <Checkbox value='Dental injury'>Dental injury</Checkbox>
                                 <Checkbox value='Fracture'>Fracture</Checkbox>

                                 <Checkbox value='Inflammation/swelling'>Inflammation/swelling</Checkbox>
                                 <Checkbox value='Joint injury'>Joint injury</Checkbox>
                                 <Checkbox value='Joint injury: Dislocation/Subluxation' className="checkbox-level-2">Dislocation/Subluxation</Checkbox>
                                 <Checkbox value='Joint injury: Sprain/ Ligament injury' className="checkbox-level-2">Sprain/ Ligament injury</Checkbox>
                                 <Checkbox value='Muscle injury'>Muscle injury</Checkbox>
                                 <Checkbox value='Muscle injury: Muscle tear/rupture/strain' className="checkbox-level-2">Muscle tear/rupture/strain</Checkbox>
                                 <Checkbox value='Nerve injury'>Nerve injury</Checkbox>
                                 <Checkbox value='Suspected spinal injury'>Suspected spinal injury</Checkbox>
                                 <Checkbox value='Heart problem'>Heart problem</Checkbox>
                                 <Checkbox value='Respiratory problem'>Respiratory problem</Checkbox>
                                 <Checkbox value='Unknown'>Unknown</Checkbox>
                                 <Checkbox value='Other'>Other</Checkbox>
                              </Space>
                           </Checkbox.Group>
                        </Form.Item>
                        <Form.Item name='nature_typeOfInjuryOther'>
                              <Input placeholder="Other - Please specify details" />
                        </Form.Item>
                     </Collapse.Panel>

                     <Collapse.Panel key='4' title='4. Removal from Field'>
                        <Form.Item name='removalFromField' label='Please choose one' rules={[
                           { required: true, message: 'Please choose one' },
                        ]}>
                           <Radio.Group>
                              <Space direction='vertical'>
                                 <Radio value='Walked'>Walked</Radio>
                                 <Radio value='Assisted off'>Assisted off</Radio>
                                 <Radio value='Stretcher'>Stretcher</Radio>
                                 <Radio value='Ambulance'>Ambulance</Radio>
                              </Space>
                           </Radio.Group>
                        </Form.Item>
                     </Collapse.Panel>

                     <Collapse.Panel key='5' title='5. Action Following Injury'>
                        <Form.Item name='actionsFollowingInjury' label='Please choose one' rules={[
                           { required: true, message: 'Please choose one' },
                        ]}>
                           <Radio.Group>
                              <Space direction='vertical'>
                                 <Radio value='Completed game'>Completed game</Radio>
                                 <Radio value='Left field then returned to play'>Left field then returned to play</Radio>
                                 <Radio value='No further play'>No further play</Radio>
                              </Space>
                           </Radio.Group>
                        </Form.Item>
                     </Collapse.Panel>

                     <Collapse.Panel key='6' title='6. Mechanism of Injury'>
                        <Form.Item name='mechanismOfInjury' label='Please choose at least one' rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Checkbox.Group>
                              <Space direction='vertical'>
                                 <Checkbox value='Tackling - being tackled'>Tackling - being tackled</Checkbox>
                                 <Checkbox value='Tackling - tackling a player'>Tackling - tackling a player</Checkbox>
                                 <Checkbox value='Non-tackle - Collision with body part'>Non-tackle - Collision with body part</Checkbox>
                                 <Checkbox value='Non-tackle - Collision with objects'>Non-tackle - Collision with objects</Checkbox>
                                 <Checkbox value='Non-tackle - Collision with player/referee'>Non-tackle - Collision with player/referee</Checkbox>
                                 <Checkbox value='Catching'>Catching</Checkbox>
                                 <Checkbox value='Diving'>Diving</Checkbox>
                                 <Checkbox value='Foul play'>Foul play</Checkbox>
                                 <Checkbox value='Jumping'>Jumping</Checkbox>
                                 <Checkbox value='Kicking'>Kicking</Checkbox>
                                 <Checkbox value='Landing/fall'>Landing/fall</Checkbox>
                                 <Checkbox value='Passing / twisting while passing'>Passing / twisting while passing</Checkbox>

                                 <Checkbox value='Running/sprinting'>Running/sprinting</Checkbox>
                                 <Checkbox value='Scrum'>Scrum</Checkbox>
                                 <Checkbox value='Sidestep / changing direction'>Sidestep / changing direction</Checkbox>
                                 <Checkbox value='Slip/trip/stumble'>Slip/trip/stumble</Checkbox>
                                 <Checkbox value='Temperature related eg heat exertion'>Temperature related eg heat exertion</Checkbox>
                                 <Checkbox value='Unknown'>Unknown</Checkbox>

                                 <p>Training specific:</p>
                                 <Checkbox value='Aerobic Conditioning'>Aerobic Conditioning</Checkbox>
                                 <Checkbox value='Skills training - contact'>Skills training - contact</Checkbox>
                                 <Checkbox value='Skills training - non contact'>Skills training - non contact</Checkbox>
                                 <Checkbox value='Weight training'>Weight training</Checkbox>

                                 <Checkbox value='Other'>Other</Checkbox>
                              </Space>
                           </Checkbox.Group>
                        </Form.Item>
                        <Form.Item name='mechanismOfInjuryOther'>
                              <Input placeholder="Other - Please specify details" />
                        </Form.Item>
                     </Collapse.Panel>

                     <Collapse.Panel key='7' title='7. Protective Equipment Worn'>
                        <Form.Item name='protectiveEquipmentWorn'>
                           <Checkbox.Group>
                              <Space direction='vertical'>
                                 <Checkbox value='Headgear/helmet'>Headgear/helmet</Checkbox>
                                 <Checkbox value='Strapping'>Strapping</Checkbox>
                                 <Checkbox value='Other'>Other</Checkbox>
                              </Space>
                           </Checkbox.Group>
                        </Form.Item>
                        <Form.Item name='protectiveEquipmentWornOther'>
                              <Input placeholder="Other - Please specify details" />
                        </Form.Item>
                     </Collapse.Panel>

                     <Collapse.Panel key='8' title='8. Contributing Factors'>
                        <Form.Item name='contributingFactors'>
                           <Checkbox.Group>
                              <Space direction='vertical'>
                                 <p>Weather is...</p>
                                 <Checkbox value='Weather: wet'>Wet</Checkbox>
                                 <Checkbox value='Weather: hot'>Hot</Checkbox>
                                 <Checkbox value='Weather: windy'>Windy</Checkbox>
                                 <p>Ground is...</p>
                                 <Checkbox value='Ground: hard'>Hard</Checkbox>
                                 <Checkbox value='Ground: soft'>Soft</Checkbox>
                                 <Checkbox value='Ground: muddy'>Muddy</Checkbox>
                              </Space>
                           </Checkbox.Group>
                        </Form.Item>
                     </Collapse.Panel>

                     <Collapse.Panel key='9' title='9. Provisional Injury Diagnosis'>
                        <Form.Item name='provisionalInjuryDiagnosis' label='Fill below if possible...'>
                           <Input placeholder="Diagnosis..." />
                        </Form.Item>
                     </Collapse.Panel>

                     <Collapse.Panel key='10' title='10. Injury Presentation'>
                        <Form.Item name='injuryPresentation' label='Please choose one' rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group>
                              <Space direction='vertical'>
                                 <Radio value='New'>New</Radio>
                                 <Radio value='Exacerbated'>Exacerbated</Radio>
                                 <Radio value='Recurrent'>Recurrent</Radio>
                                 <Radio value='Overuse'>Overuse</Radio>
                                 <Radio value='On-going treatment'>On-going treatment</Radio>
                              </Space>
                           </Radio.Group>
                        </Form.Item>
                     </Collapse.Panel>

                     <Collapse.Panel key='11' title='11. Initial Treatment'>
                        <Form.Item name='initialTreatment'>
                           <Checkbox.Group>
                              <Space direction='vertical'>
                                 <Checkbox value='None (not required)'>None (not required)</Checkbox>
                                 <Checkbox value='Dressing'>Dressing</Checkbox>
                                 <Checkbox value='RICE'>RICE</Checkbox>
                                 <Checkbox value='Sling/splint'>Sling/splint</Checkbox>
                                 <Checkbox value='Strapping/taping'>Strapping/taping</Checkbox>
                                 <Checkbox value='Other'>Other</Checkbox>
                              </Space>
                           </Checkbox.Group>
                        </Form.Item>
                        <Form.Item name='initialTreatmentOther'>
                              <Input placeholder="Other - Please specify details" />
                        </Form.Item>
                     </Collapse.Panel>

                     <Collapse.Panel key='12' title='12. Initial Treating Person '>
                        <Form.Item name='initialTreatingPerson'>
                           <Checkbox.Group>
                              <Space direction='vertical'>
                                 <Checkbox value='Ambulance'>Ambulance</Checkbox>
                                 <Checkbox value='First aid officer'>First aid officer</Checkbox>
                                 <Checkbox value='Medical/Sport trainer'>Medical/Sport trainer</Checkbox>
                                 <Checkbox value='Physiotherapist'>Physiotherapist</Checkbox>
                                 <Checkbox value='Teacher'>Teacher</Checkbox>
                                 <Checkbox value='Other'>Other</Checkbox>
                              </Space>
                           </Checkbox.Group>
                        </Form.Item>
                        <Form.Item name='initialTreatingPersonOther'>
                              <Input placeholder="Other - Please specify details" />
                        </Form.Item>
                     </Collapse.Panel>

                     <Collapse.Panel key='13' title='13. Referral to'>
                        <Form.Item name='referralTo' label='Please choose at least one' rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Checkbox.Group>
                              <Space direction='vertical'>
                                 <Checkbox value='None'>None</Checkbox>
                                 <Checkbox value='Hospital'>Hospital</Checkbox>
                                 <Checkbox value='Medical practitioner'>Medical practitioner</Checkbox>
                                 <Checkbox value='Physiotherapist'>Physiotherapist</Checkbox>
                                 <Checkbox value='Specialist physician'>Specialist physician</Checkbox>
                                 <Checkbox value='Other'>Other</Checkbox>
                              </Space>
                           </Checkbox.Group>
                        </Form.Item>
                     </Collapse.Panel>
                  </Collapse>
               </Collapse.Panel>

               <Collapse.Panel key='2' title='Concussion Form' disabled={concuFormDisabled}>

                  <Collapse defaultActiveKey={['1', '2', '3']}>
                     <Collapse.Panel key='1' title='1. Questions'>
                        <p style={{color: "red"}}>
                           Structural Head or Neck Injury: an ambulance must be
                           called for immediate transfer to hospital if YES:
                        </p>

                        <Form.Item name='q1'
                           label="1. Are there clinical features of a potentially serious or structural head and/or neck injury, including
                              prolonged loss of consciousness (&lt;1 minute) requiring urgent and emergency hospital transfer?"
                           initialValue={0}
                           rules={[
                              { required: true, message: 'Please choose at least one' },
                           ]}
                        >
                           <Radio.Group name="q1" >
                              <Space direction='vertical'>
                                 <Radio value={1}>Yes</Radio>
                                 <Radio value={0}>No</Radio>
                              </Space>
                           </Radio.Group>
                        </Form.Item>

                        <p style={{color: "red"}}>
                           Immediate removal from play if YES for following questions:
                        </p>

                        <Form.Item name='q2'
                           label="2. Loss of consciousness (or prolonged loss of
                              movement of &lt; 1 – 2 seconds) or not responding appropriately to people"
                           initialValue={0}
                           rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="q2" >
                              <Space direction='vertical'>
                                 <Radio value={2}>Yes(Observed directly)</Radio>
                                 <Radio value={1}>Yes(Reported)</Radio>
                                 <Radio value={0}>No</Radio>
                              </Space>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='q3'
                           label="3. No protective action in fall to ground
                              (not bracing for impact/ floppy or stiff)"
                           initialValue={0}
                           rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="q3" >
                              <Space direction='vertical'>
                                 <Radio value={2}>Yes(Observed directly)</Radio>
                                 <Radio value={1}>Yes(Reported)</Radio>
                                 <Radio value={0}>No</Radio>
                              </Space>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='q4'
                           label="4. Impact seizure/convulsion/fit (stiffening or shaking of arms and/or legs on impact)"
                           initialValue={0}
                           rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="q4" >
                              <Space direction='vertical'>
                                 <Radio value={2}>Yes(Observed directly)</Radio>
                                 <Radio value={1}>Yes(Reported)</Radio>
                                 <Radio value={0}>No</Radio>
                              </Space>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='q5'
                           label="5. Confusion or disorientation"
                           initialValue={0}
                           rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="q5" >
                              <Space direction='vertical'>
                                 <Radio value={2}>Yes(Observed directly)</Radio>
                                 <Radio value={1}>Yes(Reported)</Radio>
                                 <Radio value={0}>No</Radio>
                              </Space>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='q6'
                           label="6. Memory impairment (e.g. fails Maddocks questions – refer to CRT5)"
                           initialValue={0}
                           rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="q6" >
                              <Space direction='vertical'>
                                 <Radio value={2}>Yes(Observed directly)</Radio>
                                 <Radio value={1}>Yes(Reported)</Radio>
                                 <Radio value={0}>No</Radio>
                              </Space>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='q7'
                           label="7. Balance disturbance or Clumsy (loss of control over movements) or slow to get up
                           following a possible head injury (10-15 s)"
                           initialValue={0}
                           rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="q7" >
                              <Space direction='vertical'>
                                 <Radio value={2}>Yes(Observed directly)</Radio>
                                 <Radio value={1}>Yes(Reported)</Radio>
                                 <Radio value={0}>No</Radio>
                              </Space>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='q8'
                           label="8. Player reports or displays any other concussion symptoms (refer to CRT5)"
                           initialValue={0}
                           rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name='q8'>
                              <Space direction='vertical'>
                                 <Radio value={2}>Yes(Observed directly)</Radio>
                                 <Radio value={1}>Yes(Reported)</Radio>
                                 <Radio value={0}>No</Radio>
                              </Space>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='q9'
                           label="9. Dazed or blank/vacant stare or not their normal selves/not reacting appropriately
                           to surroundings"
                           initialValue={0}
                           rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name='q9'>
                              <Space direction='vertical'>
                                 <Radio value={2}>Yes(Observed directly)</Radio>
                                 <Radio value={1}>Yes(Reported)</Radio>
                                 <Radio value={0}>No</Radio>
                              </Space>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='q10'
                           label="10. Unusual or atypical behaviour for the player"
                           initialValue={0}
                           rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name='q10'>
                              <Space direction='vertical'>
                                 <Radio value={2}>Yes(Observed directly)</Radio>
                                 <Radio value={1}>Yes(Reported)</Radio>
                                 <Radio value={0}>No</Radio>
                              </Space>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='q11'
                           label="11. Loss of responsiveness (player motionless for 2-3 seconds or until support staff arrives)"
                           initialValue={0}
                           rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name='q11'>
                              <Space direction='vertical'>
                                 <Radio value={2}>Yes(Observed directly)</Radio>
                                 <Radio value={1}>Yes(Reported)</Radio>
                                 <Radio value={0}>No</Radio>
                              </Space>
                           </Radio.Group>
                        </Form.Item>
                     </Collapse.Panel>

                     <Collapse.Panel key='2' title='2. Concussion Symptoms Description'>
                        <p>
                           (Rate: None - 0; Mild - 1/2; Moderate - 3/4; Severe - 5/6)
                        </p>
                        <Form.Item name='headache' label="1. Headache" initialValue={0} rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="headache" >
                              <Radio value={0}>0</Radio>
                              <Radio value={1}>1</Radio>
                              <Radio value={2}>2</Radio>
                              <Radio value={3}>3</Radio>
                              <Radio value={4}>4</Radio>
                              <Radio value={5}>5</Radio>
                              <Radio value={6}>6</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='pressureInHead' label="2. pressureInHead" initialValue={0} rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="pressureInHead" >
                              <Radio value={0}>0</Radio>
                              <Radio value={1}>1</Radio>
                              <Radio value={2}>2</Radio>
                              <Radio value={3}>3</Radio>
                              <Radio value={4}>4</Radio>
                              <Radio value={5}>5</Radio>
                              <Radio value={6}>6</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='neckPain' label="3. neckPain" initialValue={0} rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="neckPain" >
                              <Radio value={0}>0</Radio>
                              <Radio value={1}>1</Radio>
                              <Radio value={2}>2</Radio>
                              <Radio value={3}>3</Radio>
                              <Radio value={4}>4</Radio>
                              <Radio value={5}>5</Radio>
                              <Radio value={6}>6</Radio>
                           </Radio.Group>
                        </Form.Item>


                        <Form.Item name='NauseaOrVomiting' label="NauseaOrVomiting" initialValue={0} rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="NauseaOrVomiting" >
                              <Radio value={0}>0</Radio>
                              <Radio value={1}>1</Radio>
                              <Radio value={2}>2</Radio>
                              <Radio value={3}>3</Radio>
                              <Radio value={4}>4</Radio>
                              <Radio value={5}>5</Radio>
                              <Radio value={6}>6</Radio>
                           </Radio.Group>
                        </Form.Item>


                        <Form.Item name='dizziness' label="dizziness" initialValue={0} rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="dizziness" >
                              <Radio value={0}>0</Radio>
                              <Radio value={1}>1</Radio>
                              <Radio value={2}>2</Radio>
                              <Radio value={3}>3</Radio>
                              <Radio value={4}>4</Radio>
                              <Radio value={5}>5</Radio>
                              <Radio value={6}>6</Radio>
                           </Radio.Group></Form.Item>

                        <Form.Item name='blurredVision' label="blurredVision" initialValue={0} rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="blurredVision" >
                              <Radio value={0}>0</Radio>
                              <Radio value={1}>1</Radio>
                              <Radio value={2}>2</Radio>
                              <Radio value={3}>3</Radio>
                              <Radio value={4}>4</Radio>
                              <Radio value={5}>5</Radio>
                              <Radio value={6}>6</Radio>
                           </Radio.Group></Form.Item>

                        <Form.Item name='balanceProblems' label="balanceProblems" initialValue={0} rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="balanceProblems" >
                              <Radio value={0}>0</Radio>
                              <Radio value={1}>1</Radio>
                              <Radio value={2}>2</Radio>
                              <Radio value={3}>3</Radio>
                              <Radio value={4}>4</Radio>
                              <Radio value={5}>5</Radio>
                              <Radio value={6}>6</Radio>
                           </Radio.Group></Form.Item>

                        <Form.Item name='sensitivityToLight' label="sensitivityToLight" initialValue={0} rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="sensitivityToLight" >
                              <Radio value={0}>0</Radio>
                              <Radio value={1}>1</Radio>
                              <Radio value={2}>2</Radio>
                              <Radio value={3}>3</Radio>
                              <Radio value={4}>4</Radio>
                              <Radio value={5}>5</Radio>
                              <Radio value={6}>6</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='sensitivityToNoise' label="sensitivityToNoise" initialValue={0} rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="sensitivityToNoise" >
                              <Radio value={0}>0</Radio>
                              <Radio value={1}>1</Radio>
                              <Radio value={2}>2</Radio>
                              <Radio value={3}>3</Radio>
                              <Radio value={4}>4</Radio>
                              <Radio value={5}>5</Radio>
                              <Radio value={6}>6</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='feelingSlowedDown' label="feelingSlowedDown" initialValue={0} rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="feelingSlowedDown" >
                              <Radio value={0}>0</Radio>
                              <Radio value={1}>1</Radio>
                              <Radio value={2}>2</Radio>
                              <Radio value={3}>3</Radio>
                              <Radio value={4}>4</Radio>
                              <Radio value={5}>5</Radio>
                              <Radio value={6}>6</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='feelingLikeInAFog' label="feelingLikeInAFog" initialValue={0} rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="feelingLikeInAFog" >
                              <Radio value={0}>0</Radio>
                              <Radio value={1}>1</Radio>
                              <Radio value={2}>2</Radio>
                              <Radio value={3}>3</Radio>
                              <Radio value={4}>4</Radio>
                              <Radio value={5}>5</Radio>
                              <Radio value={6}>6</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='dontFeelRight' label="dontFeelRight" initialValue={0} rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="dontFeelRight" >
                              <Radio value={0}>0</Radio>
                              <Radio value={1}>1</Radio>
                              <Radio value={2}>2</Radio>
                              <Radio value={3}>3</Radio>
                              <Radio value={4}>4</Radio>
                              <Radio value={5}>5</Radio>
                              <Radio value={6}>6</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='difficultyConcentrating' label="difficultyConcentrating" initialValue={0} rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="difficultyConcentrating" >
                              <Radio value={0}>0</Radio>
                              <Radio value={1}>1</Radio>
                              <Radio value={2}>2</Radio>
                              <Radio value={3}>3</Radio>
                              <Radio value={4}>4</Radio>
                              <Radio value={5}>5</Radio>
                              <Radio value={6}>6</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='difficultyRemembering' label="difficultyRemembering" initialValue={0} rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="difficultyRemembering" >
                              <Radio value={0}>0</Radio>
                              <Radio value={1}>1</Radio>
                              <Radio value={2}>2</Radio>
                              <Radio value={3}>3</Radio>
                              <Radio value={4}>4</Radio>
                              <Radio value={5}>5</Radio>
                              <Radio value={6}>6</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='fatigueOrLowEnergy' label="fatigueOrLowEnergy" initialValue={0} rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="fatigueOrLowEnergy" >
                              <Radio value={0}>0</Radio>
                              <Radio value={1}>1</Radio>
                              <Radio value={2}>2</Radio>
                              <Radio value={3}>3</Radio>
                              <Radio value={4}>4</Radio>
                              <Radio value={5}>5</Radio>
                              <Radio value={6}>6</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='confusion' label="confusion" initialValue={0} rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="confusion" >
                              <Radio value={0}>0</Radio>
                              <Radio value={1}>1</Radio>
                              <Radio value={2}>2</Radio>
                              <Radio value={3}>3</Radio>
                              <Radio value={4}>4</Radio>
                              <Radio value={5}>5</Radio>
                              <Radio value={6}>6</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='drowsiness' label="drowsiness" initialValue={0} rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="drowsiness" >
                              <Radio value={0}>0</Radio>
                              <Radio value={1}>1</Radio>
                              <Radio value={2}>2</Radio>
                              <Radio value={3}>3</Radio>
                              <Radio value={4}>4</Radio>
                              <Radio value={5}>5</Radio>
                              <Radio value={6}>6</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='moreEmotional' label="moreEmotional" initialValue={0} rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="moreEmotional" >
                              <Radio value={0}>0</Radio>
                              <Radio value={1}>1</Radio>
                              <Radio value={2}>2</Radio>
                              <Radio value={3}>3</Radio>
                              <Radio value={4}>4</Radio>
                              <Radio value={5}>5</Radio>
                              <Radio value={6}>6</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='irritability' label="irritability" initialValue={0} rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="irritability" >
                              <Radio value={0}>0</Radio>
                              <Radio value={1}>1</Radio>
                              <Radio value={2}>2</Radio>
                              <Radio value={3}>3</Radio>
                              <Radio value={4}>4</Radio>
                              <Radio value={5}>5</Radio>
                              <Radio value={6}>6</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='sadness' label="sadness" initialValue={0} rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="sadness" >
                              <Radio value={0}>0</Radio>
                              <Radio value={1}>1</Radio>
                              <Radio value={2}>2</Radio>
                              <Radio value={3}>3</Radio>
                              <Radio value={4}>4</Radio>
                              <Radio value={5}>5</Radio>
                              <Radio value={6}>6</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='nervousOrAnxious' label="nervousOrAnxious" initialValue={0} rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="nervousOrAnxious" >
                              <Radio value={0}>0</Radio>
                              <Radio value={1}>1</Radio>
                              <Radio value={2}>2</Radio>
                              <Radio value={3}>3</Radio>
                              <Radio value={4}>4</Radio>
                              <Radio value={5}>5</Radio>
                              <Radio value={6}>6</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='troubleFallingAsleep' label="troubleFallingAsleep" initialValue={0} rules={[
                           { required: true, message: 'Please choose at least one' },
                        ]}>
                           <Radio.Group name="troubleFallingAsleep" >
                              <Radio value={0}>0</Radio>
                              <Radio value={1}>1</Radio>
                              <Radio value={2}>2</Radio>
                              <Radio value={3}>3</Radio>
                              <Radio value={4}>4</Radio>
                              <Radio value={5}>5</Radio>
                              <Radio value={6}>6</Radio>
                           </Radio.Group>
                        </Form.Item>
                     </Collapse.Panel>

                     <Collapse.Panel key='3' title='3. Miscellaneous'>
                        <Form.Item name='Y_N_1' value={false}
                           label="Do your symptoms get worse with physical activity?"
                           rules={[
                           { required: true, message: 'Please choose one' },
                        ]}>
                           <Radio.Group name="Y_N_1">
                              <Radio value={true}>yes</Radio>
                              <Radio value={false}>no</Radio>
                           </Radio.Group></Form.Item>

                        <Form.Item name='Y_N_2' value={false}
                           label="Do your symptoms get worse with mental activity?"
                           rules={[
                              { required: true, message: 'Please choose one' },
                        ]}>
                           <Radio.Group name="Y_N_2" >
                              <Radio value={true}>yes</Radio>
                              <Radio value={false}>no</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item name='range'
                           label="If 100% is feeling perfectly normal, what percent of normal do you feel?"
                        >
                           <Input type="number" min={0} max={100} defaultValue={100} />
                        </Form.Item>

                        <Form.Item name='rangeReason'
                           label="If not 100%, why?"
                        >
                           <Input type="text" placeholder="Reason..."/>
                        </Form.Item>
                     </Collapse.Panel>
                  </Collapse>

               </Collapse.Panel>
            </Collapse>
         </Form>
      </div >
   )
}
export default InjureForm;
