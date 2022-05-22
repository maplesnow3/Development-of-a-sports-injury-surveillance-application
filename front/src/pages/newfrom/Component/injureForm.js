import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react'
import {
   Form, Button, Checkbox, Space, Input, DatePicker,
   Radio, TextArea, Collapse, Slider, Toast
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
            <Collapse defaultActiveKey={['1']}>
               <Collapse.Panel key='1' title='Injure Form'>

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

                                 <Checkbox value='Wrist' className="checkbox-level-2">Wrist</Checkbox>
                                 <Checkbox value='Hand/Fingers' className="checkbox-level-2">Hand/Fingers</Checkbox>
                                 <Checkbox value='Thorax (Chest)'>Thorax (Chest)</Checkbox>
                                 <Checkbox value='Sternum'>Sternum</Checkbox>
                                 <Checkbox value='Ribs'>Ribs</Checkbox>

                                 <Checkbox value='Upper back'>Upper back</Checkbox>
                                 <Checkbox value='Abdomen'>Abdomen</Checkbox>
                                 <Checkbox value='Lower back/sacrum'>Lower back/sacrum</Checkbox>
                                 <Checkbox value='Pelvis'>Pelvis</Checkbox>
                                 <Checkbox value='Hip'>Hip</Checkbox>

                                 <Checkbox value='Buttock'>Buttock</Checkbox>
                                 <Checkbox value='Groin'>Groin</Checkbox>
                                 <Checkbox value='Thigh'>Thigh</Checkbox>
                                 <Checkbox value='Quadriceps'>Quadriceps</Checkbox>
                                 <Checkbox value='Hamstring'>Hamstring</Checkbox>


                                 <Checkbox value='Adductors'>Adductors</Checkbox>
                                 <Checkbox value='Knee'>Knee</Checkbox>
                                 <Checkbox value='ACL'>ACL</Checkbox>
                                 <Checkbox value='PCL'>PCL</Checkbox>
                                 <Checkbox value='Meniscus'>Meniscus</Checkbox>

                                 <Checkbox value='Adductors'>Adductors</Checkbox>
                                 <Checkbox value='Knee'>Knee</Checkbox>
                                 <Checkbox value='ACL'>ACL</Checkbox>
                                 <Checkbox value='PCL'>PCL</Checkbox>
                                 <Checkbox value='Meniscus'>Meniscus</Checkbox>

                                 <Checkbox value='MCL'>MCL</Checkbox>
                                 <Checkbox value='Lower leg'>Lower leg</Checkbox>
                                 <Checkbox value='Calf'>Calf</Checkbox>
                                 <Checkbox value='Achilles tendon'>Achilles tendon</Checkbox>
                                 <Checkbox value='Ankle'>Ankle</Checkbox>

                                 <Checkbox value='MCL'>MCL</Checkbox>
                                 <Checkbox value='Lower leg'>Lower leg</Checkbox>
                                 <Checkbox value='Calf'>Calf</Checkbox>
                                 <Checkbox value='Achilles tendon'>Achilles tendon</Checkbox>
                                 <Checkbox value='Ankle'>Ankle</Checkbox>

                                 <Checkbox value='Foot'>Foot</Checkbox>
                                 <Checkbox value='Rear'>Rear</Checkbox>
                                 <Checkbox value='Fore'>Fore</Checkbox>
                                 <Checkbox value='Toe'>Toe</Checkbox>

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
                                 <Checkbox value='First Half'>First Half</Checkbox>
                                 <Checkbox value='Second Half'>Second Half</Checkbox>

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
                                    (checked) => {
                                       setConcuFormDisabled(!checked)
                                    }
                                 }>Concussion - Please fill the Concussion form in the end</Checkbox>
                                 <Checkbox value='Dental injury'>Dental injury</Checkbox>
                                 <Checkbox value='Fracture'>Fracture</Checkbox>

                                 <Checkbox value='Inflammation/swelling'>Inflammation/swelling</Checkbox>
                                 <Checkbox value='Joint injury'>Joint injury</Checkbox>
                                 <Checkbox value='Dislocation/Subluxation'>Dislocation/Subluxation</Checkbox>
                                 <Checkbox value='Sprain/ Ligament injury'>Sprain/ Ligament injury</Checkbox>
                                 <Checkbox value='Muscle injury'>Muscle injury</Checkbox>

                                 <Checkbox value='Muscle tear/rupture/strain'>Muscle tear/rupture/strain</Checkbox>
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

                     <Collapse.Panel key='4' title='4. Removal from field'>
                        <Form.Item name='removalFromField' label='removalFromField' rules={[
                           { required: true, message: 'please choose one at least!' },
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

                     <Collapse.Panel key='5' title='5. actionsFollowingInjury'>
                        <Form.Item name='actionsFollowingInjury' label='actionsFollowingInjury' rules={[
                           { required: true, message: 'please choose one at least!' },
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

                     <Collapse.Panel key='6' title='6. mechanismOfInjury'>
                        <Form.Item name='mechanismOfInjury' label='mechanismOfInjury' rules={[
                           { required: true, message: 'please choose one at least!' },
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

                                 <p>trainingSpecific:</p>
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

                     <Collapse.Panel key='7' title='7. protectiveEquipmentWorn'>
                        <Form.Item name='protectiveEquipmentWorn' label='protectiveEquipmentWorn'>
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

                     <Collapse.Panel key='8' title='8. contributingFactors'>
                        <Form.Item name='contributingFactors' label='contributingFactors'>
                           <Checkbox.Group>
                              <Space direction='vertical'>
                                 <Checkbox value='Weather: wet'>Weather: wet</Checkbox>
                                 <Checkbox value='Weather: hot'>Weather: hot</Checkbox>
                                 <Checkbox value='Weather: windy'>Weather: windy</Checkbox>
                                 <Checkbox value='Ground: hard'>Ground: hard</Checkbox>
                                 <Checkbox value='Ground: soft'>Ground: soft</Checkbox>
                                 <Checkbox value='Ground: muddy'>Ground: muddy</Checkbox>
                              </Space>
                           </Checkbox.Group>
                        </Form.Item>
                     </Collapse.Panel>

                     <Collapse.Panel key='9' title='9. Provisional Injury Diagnosis'>
                        <Form.Item name='provisionalInjuryDiagnosis' label='provisionalInjuryDiagnosis'>
                           <Input placeholder="Diagnosis..." />
                        </Form.Item>
                     </Collapse.Panel>

                     <Collapse.Panel key='10' title='10. Injury presentation'>
                        <Form.Item name='injuryPresentation' label='Injury presentation' rules={[
                           { required: true, message: 'please choose one at least!' },
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

                     <Collapse.Panel key='11' title='11. initialTreatment'>
                        <Form.Item name='initialTreatment' label='initialTreatment'>
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

                     <Collapse.Panel key='12' title='12. initialTreatingPerson'>
                        <Form.Item name='initialTreatingPerson' label='initialTreatingPerson'>
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

                     <Collapse.Panel key='13' title='13. referralTo'>
                        <Form.Item name='referralTo' label='referralTo' rules={[
                           { required: true, message: 'please choose one at least!' },
                        ]}>
                           <Checkbox.Group>
                              <Space direction='vertical'>
                                 <Checkbox value='None'>None</Checkbox>
                                 <Checkbox value='Hospital'>Hospital</Checkbox>
                                 <Checkbox value='Medical practitioner'>Medical practitioner</Checkbox>
                                 <Checkbox value='Physiotherapist'>Physiotherapist</Checkbox>
                                 <Checkbox value='Specialist physician (type)'>Specialist physician (type)</Checkbox>
                                 <Checkbox value='Other'>Other</Checkbox>
                              </Space>
                           </Checkbox.Group>
                        </Form.Item>
                     </Collapse.Panel>
                  </Collapse>
               </Collapse.Panel>

               <Collapse.Panel key='2' title='Concussion Form(Optional)' disabled={concuFormDisabled}>

                  <Collapse defaultActiveKey={['1', '2', '3']}>
                     <Collapse.Panel key='1' title='Questions'>
                        <p>
                           Structural Head or Neck Injury: an ambulance must be
                           called for immediate transfer to hospital if YES:
                        </p>

                        <Form.Item name='q1'
                           label="1 Are there clinical features of a potentially serious or structural head and/or neck injury, including
                           prolonged loss of consciousness (&lt;1 minute) requiring urgent and emergency hospital transfer?"
                           initialValue={0}
                           rules={[
                              { required: true, message: 'please choose one at least!' },
                           ]}
                        >
                           <Radio.Group name="q1" >
                              <Radio value={0}>Yes</Radio>
                              <Radio value={1}>No</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <p>Immediate removal from play if YES:</p>

                        <p>2 Loss of consciousness (or prolonged loss of movement of &lt; 1 – 2 seconds) or not </p>
                        <Form.Item name='q2' rules={[
                           { required: true, message: 'please choose one at least!' },
                        ]}>
                           <Radio.Group name="q2" >
                              <Radio value={0}>Yes(Observed directly)</Radio>
                              <Radio value={1}>Yes(Reported)</Radio>
                              <Radio value={2}>No</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <p>3 No protective action in fall to ground (not bracing for impact/ floppy or stiff)</p>
                        <Form.Item name='q3' rules={[
                           { required: true, message: 'please choose one at least!' },
                        ]}>
                           <Radio.Group name="q3" >
                              <Radio value={0}>Yes(Observed directly)</Radio>
                              <Radio value={1}>Yes(Reported)</Radio>
                              <Radio value={2}>No</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <p>4 Impact seizure/convulsion/fit (stiffening or shaking of arms and/or legs on impact)</p>
                        <Form.Item name='q4' rules={[
                           { required: true, message: 'please choose one at least!' },
                        ]}>
                           <Radio.Group name="q4" >
                              <Radio value={0}>Yes(Observed directly)</Radio>
                              <Radio value={1}>Yes(Reported)</Radio>
                              <Radio value={2}>No</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <p>5 Confusion or disorientation</p>
                        <Form.Item name='q5' rules={[
                           { required: true, message: 'please choose one at least!' },
                        ]}>
                           <Radio.Group name="q5" >
                              <Radio value={0}>Yes(Observed directly)</Radio>
                              <Radio value={1}>Yes(Reported)</Radio>
                              <Radio value={2}>No</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <p>6 Memory impairment (e.g. fails Maddocks questions – refer to CRT5)</p>
                        <Form.Item name='q6' rules={[
                           { required: true, message: 'please choose one at least!' },
                        ]}>
                           <Radio.Group name="q6" >
                              <Radio value={0}>Yes(Observed directly)</Radio>
                              <Radio value={1}>Yes(Reported)</Radio>
                              <Radio value={2}>No</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <p>7 Balance disturbance or Clumsy (loss of control over movements) or slow to get up
                           following a possible head injury (10-15 s) </p>
                        <Form.Item name='q7' rules={[
                           { required: true, message: 'please choose one at least!' },
                        ]}>
                           <Radio.Group name="q7" >
                              <Radio value={0}>Yes(Observed directly)</Radio>
                              <Radio value={1}>Yes(Reported)</Radio>
                              <Radio value={2}>No</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <p>8 Player reports or displays any other concussion symptoms (refer to CRT5) </p>
                        <Form.Item name='q8' rules={[
                           { required: true, message: 'please choose one at least!' },
                        ]}>
                           <Radio.Group name='q8'>
                              <Radio value={0}>Yes(Observed directly)</Radio>
                              <Radio value={1}>Yes(Reported)</Radio>
                              <Radio value={2}>No</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <p>9 Dazed or blank/vacant stare or not their normal selves/not reacting appropriately
                           to surroundings</p>
                        <Form.Item name='q9' rules={[
                           { required: true, message: 'please choose one at least!' },
                        ]}>
                           <Radio.Group name='q9'>
                              <Radio value={0}>Yes(Observed directly)</Radio>
                              <Radio value={1}>Yes(Reported)</Radio>
                              <Radio value={2}>No</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <p>10 Unusual or atypical behaviour for the player</p>
                        <Form.Item name='q10' rules={[
                           { required: true, message: 'please choose one at least!' },
                        ]}>
                           <Radio.Group name='q10'>
                              <Radio value={0}>Yes(Observed directly)</Radio>
                              <Radio value={1}>Yes(Reported)</Radio>
                              <Radio value={2}>No</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <p>11 Loss of responsiveness (player motionless for 2-3 seconds or until support staff arrives)</p>
                        <Form.Item name='q11' rules={[
                           { required: true, message: 'please choose one at least!' },
                        ]}>
                           <Radio.Group name='q11'>
                              <Radio value={0}>Yes(Observed directly)</Radio>
                              <Radio value={1}>Yes(Reported)</Radio>
                              <Radio value={2}>No</Radio>
                           </Radio.Group>
                        </Form.Item>
                     </Collapse.Panel>

                     <Collapse.Panel key='2' title='Concussion Symptoms Description'>
                        <p>
                           (Rate: None - 0; Mild - 1/2; Moderate - 3/4; Severe - 5/6)
                        </p>
                        <Form.Item name='headache' label="1. Headache" initialValue={0} rules={[
                           { required: true, message: 'please choose one at least!' },
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
                           { required: true, message: 'please choose one at least!' },
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
                           { required: true, message: 'please choose one at least!' },
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
                           { required: true, message: 'please choose one at least!' },
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
                           { required: true, message: 'please choose one at least!' },
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
                           { required: true, message: 'please choose one at least!' },
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
                           { required: true, message: 'please choose one at least!' },
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
                           { required: true, message: 'please choose one at least!' },
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
                           { required: true, message: 'please choose one at least!' },
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
                           { required: true, message: 'please choose one at least!' },
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
                           { required: true, message: 'please choose one at least!' },
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
                           { required: true, message: 'please choose one at least!' },
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
                           { required: true, message: 'please choose one at least!' },
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
                           { required: true, message: 'please choose one at least!' },
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
                           { required: true, message: 'please choose one at least!' },
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
                           { required: true, message: 'please choose one at least!' },
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
                           { required: true, message: 'please choose one at least!' },
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
                           { required: true, message: 'please choose one at least!' },
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
                           { required: true, message: 'please choose one at least!' },
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
                           { required: true, message: 'please choose one at least!' },
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
                           { required: true, message: 'please choose one at least!' },
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
                           { required: true, message: 'please choose one at least!' },
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

                     <Collapse.Panel key='3' title='Concussion Symptoms Description'>
                        <p>Do your symptoms get worse with physical activity?</p>
                        <Form.Item name='Y_N_1' rules={[
                           { required: true, message: 'please choose one at least!' },
                        ]}>
                           <Radio.Group name="Y_N_1" value={false}>
                              <Radio value={true}>yes</Radio>
                              <Radio value={false}>no</Radio>
                           </Radio.Group></Form.Item>

                        <p>Do your symptoms get worse with mental activity?</p>
                        <Form.Item name='Y_N_2' value={false}>
                           <Radio.Group name="Y_N_2" >
                              <Radio value={true}>yes</Radio>
                              <Radio value={false}>no</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <p>If 100% is feeling perfectly normal, what percent of normal do you feel?</p>
                        <Form.Item name='range'>
                           <Input type="number" min={0} max={100} defaultValue={100} />
                        </Form.Item>

                        <p>If not 100%, why?</p>
                        <Form.Item name='rangeReason'>
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
