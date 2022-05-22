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
   const targetId = -1;
   const [value, setValue] = useState('');



   const toastValue = (value: number | number[]) => {
      let text = ''
      if (typeof value === 'number') {
         text = `${value}`
      } else {
         text = `[${value.join(',')}]`
      }
      Toast.show(`当前选中值为：${text}`)
      console.log(value)
   }
   
   function checkboxOnclick(checkbox) {

      if (checkbox.checked == true) {

         //Action for checked
         var obj = document.getElementById("other");
         obj.setAttribute("readOnly", true);

      } else {

         //Action for not checked
         var obj = document.getElementById("other");
         obj.setAttribute("readOnly", false);
      }

   }





   return (

      <div>
         <Form
            name='form'
            onFinish={async (values) => {
               const {

                  targetId, injuredBodyPart, injuryOccurrence, nature_typeOfInjury, removalFromField,
                  actionsFollowingInjury, mechanismOfInjury, trainingSpecific, protectiveEquipmentWorn,
                  contributingFactors, provisionalInjuryDiagnosis, injuryPresentation, initialTreatment,
                  initialTreatingPerson, referralTo,


                  q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11,
                  headache, pressureInHead, neckPain, NauseaOrVomiting, dizziness,
                  blurredVision, balanceProblems, sensitivityToLight, sensitivityToNoise,
                  feelingSlowedDown, feelingLikeInAFog, dontFeelRight, difficultyConcentrating,
                  difficultyRemembering, fatigueOrLowEnergy, confusion, drowsiness, moreEmotional,
                  irritability, sadness, nervousOrAnxious, troubleFallingAsleep, Y_N_1, Y_N_2,
                  range, rangeReason,

               } = { ...state, ...values }

               let data = {

                  targetId,
                  injuredBodyPart,
                  injuryOccurrence,
                  nature_typeOfInjury,
                  removalFromField,
                  actionsFollowingInjury,
                  mechanismOfInjury,
                  trainingSpecific,
                  protectiveEquipmentWorn,
                  contributingFactors,
                  provisionalInjuryDiagnosis,
                  injuryPresentation,
                  initialTreatment,
                  initialTreatingPerson,
                  referralTo,


                  concussionProblems: [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11],
                  ConcussionSymptom: [headache, pressureInHead, neckPain, NauseaOrVomiting, dizziness,
                     blurredVision, balanceProblems, sensitivityToLight, sensitivityToNoise,
                     feelingSlowedDown, feelingLikeInAFog, dontFeelRight, difficultyConcentrating,
                     difficultyRemembering, fatigueOrLowEnergy, confusion, drowsiness, moreEmotional,
                     irritability, sadness, nervousOrAnxious, troubleFallingAsleep],

                  physicalActivity: Y_N_1,
                  mentalActivity: Y_N_2,
                  percentOfFeel: range,
                  why: rangeReason
               }
               console.log(values)

            }}
            footer={
               <Button style={{ backgroundColor: '#1DB860' }} block type='submit' color='primary' size='large'>
                  submit
               </Button>
            }
         >


            <Collapse defaultActiveKey={['1']}>
               <Collapse.Panel key='1' title='Injure Form'>

                  <div className='Injury Form'>



                     <table className='injured_form_table'>
                        <caption className='table_title'>Injured Form</caption>
                        <tbody>
                           <tr>
                              <th colSpan={2}>Injured Body Part</th>
                           </tr>


                           <Form.Item name='injuredBodyPart' label='Injured Body Part'
                              rules={[
                                 { required: true, message: 'please choose one at least!' },
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

                                    <Checkbox value='Wrist'>Wrist</Checkbox>
                                    <Checkbox value='Hand/Fingers'>Hand/Fingers</Checkbox>
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

                           <tr>
                              <th colSpan={2}>injuryOccurrence</th>
                           </tr>

                           <Form.Item name='injuryOccurrence' label='injuryOccurrence' rules={[
                              { required: true, message: 'please choose one at least!' },
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

                           <tr>
                              <th colSpan={2}>nature_typeOfInjury</th>
                           </tr>

                           <Form.Item name='nature_typeOfInjury' label='nature_typeOfInjury' rules={[
                              { required: true, message: 'please choose one at least!' },
                           ]}>
                              <Checkbox.Group>
                                 <Space direction='vertical'>
                                    <Checkbox value='Abrasion/graze'>Abrasion/graze</Checkbox>
                                    <Checkbox value='Bleeding'>Bleeding</Checkbox>
                                    <Checkbox value='Bruise/Contusion/Haematoma/Cork'>Bruise/Contusion/Haematoma/Cork</Checkbox>

                                    <Checkbox value='Concussion PTO to record symptoms'>Concussion PTO to record symptoms</Checkbox>
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
                                    <Checkbox value='Other' οnclick="checkboxOnclick(this)">Other</Checkbox>

                                 </Space>
                                 <Input id='other'
                                    placeholder='请输入内容'
                                    value={value}
                                    onChange={val => {
                                       setValue(val)
                                    }}
                                 />
                              </Checkbox.Group>
                           </Form.Item>





                           <tr>
                              <th colSpan={2}>removalFromField</th>
                           </tr>

                           <Form.Item name='removalFromField' label='removalFromField' rules={[
                              { required: true, message: 'please choose one at least!' },
                           ]}>
                              <Checkbox.Group>
                                 <Space direction='vertical'>


                                    <Checkbox value='Walked'>Walked</Checkbox>
                                    <Checkbox value='Assisted off'>Assisted off</Checkbox>
                                    <Checkbox value='Stretcher'>Stretcher</Checkbox>
                                    <Checkbox value='Ambulance'>Ambulance</Checkbox>

                                 </Space>
                              </Checkbox.Group>
                           </Form.Item>

                           <tr>
                              <th colSpan={2}>actionsFollowingInjury</th>
                           </tr>
                           <Form.Item name='actionsFollowingInjury' label='actionsFollowingInjury' rules={[
                              { required: true, message: 'please choose one at least!' },
                           ]}>
                              <Checkbox.Group>
                                 <Space direction='vertical'>
                                    <Checkbox value='Completed game'>Completed game</Checkbox>
                                    <Checkbox value='Left field then returned to play'>Left field then returned to play</Checkbox>
                                    <Checkbox value='No further play'>No further play</Checkbox>
                                 </Space>
                              </Checkbox.Group>
                           </Form.Item>

                           <tr>
                              <th colSpan={2}>mechanismOfInjury</th>
                           </tr>
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
                                    <Checkbox value='Other'>Other</Checkbox>




                                    <Checkbox value='Meniscus'>Meniscus</Checkbox>
                                    <Checkbox value='Knee'>Knee</Checkbox>
                                    <Checkbox value='ACL'>ACL</Checkbox>
                                    <Checkbox value='PCL'>PCL</Checkbox>
                                    <Checkbox value='Meniscus'>Meniscus</Checkbox>
                                    <Checkbox value='Knee'>Knee</Checkbox>
                                    <Checkbox value='ACL'>ACL</Checkbox>
                                    <Checkbox value='PCL'>PCL</Checkbox>
                                    <Checkbox value='Meniscus'>Meniscus</Checkbox>
                                 </Space>
                              </Checkbox.Group>
                           </Form.Item>



                           <tr>
                              <th colSpan={2}>trainingSpecific</th>
                           </tr>

                           <Form.Item name='trainingSpecific' label='trainingSpecific' rules={[
                              { required: true, message: 'please choose one at least!' },
                           ]}>
                              <Checkbox.Group>
                                 <Space direction='vertical'>
                                    <Checkbox value='Aerobic Conditioning'>Aerobic Conditioning</Checkbox>
                                    <Checkbox value='Skills training - contact'>Skills training - contact</Checkbox>
                                    <Checkbox value='Skills training - non contact'>Skills training - non contact</Checkbox>
                                    <Checkbox value='Weight training'>Weight training</Checkbox>
                                 </Space>
                              </Checkbox.Group>
                           </Form.Item>

                           <tr>
                              <th colSpan={2}>protectiveEquipmentWorn</th>
                           </tr>

                           <Form.Item name='protectiveEquipmentWorn' label='protectiveEquipmentWorn' rules={[
                              { required: true, message: 'please choose one at least!' },
                           ]}>
                              <Checkbox.Group>
                                 <Space direction='vertical'>
                                    <Checkbox value='Headgear/helmet'>Headgear/helmet</Checkbox>
                                    <Checkbox value='Strapping'>Strapping</Checkbox>
                                    <Checkbox value='Other'>Other</Checkbox>
                                 </Space>
                              </Checkbox.Group>
                           </Form.Item>


                           <tr>
                              <th colSpan={2}>contributingFactors</th>
                           </tr>
                           <Form.Item name='contributingFactors' label='contributingFactors' rules={[
                              { required: true, message: 'please choose one at least!' },
                           ]}>
                              <Checkbox.Group>
                                 <Space direction='vertical'>
                                    <Checkbox value='wet'>wet</Checkbox>
                                    <Checkbox value='hot'>hot</Checkbox>
                                    <Checkbox value='windy'>windy</Checkbox>
                                    <Checkbox value='hard'>hard</Checkbox>
                                    <Checkbox value='soft'>soft</Checkbox>
                                    <Checkbox value='muddy'>muddy</Checkbox>
                                 </Space>
                              </Checkbox.Group>

                           </Form.Item>
                           <tr>
                              <th colSpan={2}>injuryPresentation</th>
                           </tr>
                           <Form.Item name='initialTreatment' label='initialTreatment' rules={[
                              { required: true, message: 'please choose one at least!' },
                           ]}>
                              <Checkbox.Group>
                                 <Space direction='vertical'>
                                    <Checkbox value='>New'>New</Checkbox>
                                    <Checkbox value='Exacerbated'>Exacerbated</Checkbox>
                                    <Checkbox value='Recurrent'>Recurrent</Checkbox>
                                    <Checkbox value='Overuse'>Overuse</Checkbox>
                                    <Checkbox value='On-going treatment'>On-going treatment</Checkbox>
                                 </Space>
                              </Checkbox.Group>
                           </Form.Item>
                           <tr>
                              <th colSpan={2}>initialTreatment (more than 1 possible)</th>
                           </tr>
                           <Form.Item name='initialTreatment' label='initialTreatment' rules={[
                              { required: true, message: 'please choose one at least!' },
                           ]}>
                              <Checkbox.Group>
                                 <Space direction='vertical'>
                                    <Checkbox value='>None (not required)'>None (not required)</Checkbox>
                                    <Checkbox value='Dressing'>Dressing</Checkbox>
                                    <Checkbox value='RICE'>RICE</Checkbox>
                                    <Checkbox value='Sling/splint'>Sling/splint</Checkbox>
                                    <Checkbox value='Strapping/taping'>Strapping/taping</Checkbox>
                                    <Checkbox value='Other'>Other</Checkbox>
                                 </Space>
                              </Checkbox.Group>
                           </Form.Item>

                           <tr>
                              <th colSpan={2}>initialTreatingPerson</th>
                           </tr>
                           <Form.Item name='initialTreatingPerson' label='initialTreatingPerson' rules={[
                              { required: true, message: 'please choose one at least!' },
                           ]}>
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

                           <tr>
                              <th colSpan={2}>referralTo</th>
                           </tr>

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



                        </tbody>
                     </table>
                  </div>

               </Collapse.Panel>



//-----------------------------------------------------------------------------
               <Collapse.Panel key='2' title='Concussion Form(Optional)'>
                  <div className='Concussion Symptom'>

                     <div className='questionform'>
                        <p>1 Are there clinical features of a potentially serious or structural head and/or neck injury, including 
          prolonged loss of consciousness (>1 minute) requiring urgent and emergency hospital transfer?</p>
                        <Form.Item name='q1' rules={[
                           { required: true, message: 'please choose one at least!' },
                        ]}>
                           <Radio.Group name="q1" >
                              <Radio value={0}>Yes</Radio>
                              <Radio value={1}>No</Radio>
                           </Radio.Group>
                        </Form.Item>
                        <p>2 Loss of consciousness (or prolonged loss of movement of > 1 – 2 seconds) or not </p>
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
                     </div>







                     <table className='form_table'>

                        <caption className='table_title'>Concussion Symptom</caption>
                        <tbody>
                           <tr>

                              <th id="col_1">Concussion Symptom</th>
                              <th id="col_2">None</th>
                              <th id="col_3" colSpan={2} >Mild</th>
                              <th id="col_4" colSpan={2}>Moderate</th>
                              <th id="col_5" colSpan={2}>Severe</th>
                           </tr>

                           <tr>
                              <td className='items'>Headache</td>
                              <Form.Item name='headache' rules={[
                                 { required: true, message: 'please choose one at least!' },
                              ]}>
                                 <Radio.Group name="headache" >
                                    <td><Radio value={0}>0</Radio></td>
                                    <td><Radio value={1}>1</Radio></td>
                                    <td><Radio value={2}>2</Radio></td>
                                    <td><Radio value={3}>3</Radio></td>
                                    <td><Radio value={4}>4</Radio></td>
                                    <td><Radio value={5}>5</Radio></td>
                                    <td><Radio value={6}>6</Radio></td>
                                 </Radio.Group>
                              </Form.Item>
                           </tr>
                           <tr>
                              <td className='items'>“Pressure in head”</td>
                              <Form.Item name='pressureInHead' rules={[
                                 { required: true, message: 'please choose one at least!' },
                              ]}>
                                 <Radio.Group name="pressureInHead" >
                                    <td><Radio value={0}>0</Radio></td>
                                    <td><Radio value={1}>1</Radio></td>
                                    <td><Radio value={2}>2</Radio></td>
                                    <td><Radio value={3}>3</Radio></td>
                                    <td><Radio value={4}>4</Radio></td>
                                    <td><Radio value={5}>5</Radio></td>
                                    <td><Radio value={6}>6</Radio></td>
                                 </Radio.Group>
                              </Form.Item>
                           </tr>
                           <tr>
                              <td className='items'>Neck Pain</td>
                              <Form.Item name='neckPain' rules={[
                                 { required: true, message: 'please choose one at least!' },
                              ]}>
                                 <Radio.Group name="neckPain" >
                                    <td><Radio value={0}>0</Radio></td>
                                    <td><Radio value={1}>1</Radio></td>
                                    <td><Radio value={2}>2</Radio></td>
                                    <td><Radio value={3}>3</Radio></td>
                                    <td><Radio value={4}>4</Radio></td>
                                    <td><Radio value={5}>5</Radio></td>
                                    <td><Radio value={6}>6</Radio></td>
                                 </Radio.Group>
                              </Form.Item>
                           </tr>
                           <tr>
                              <td className='items'>Nausea or vomiting</td>
                              <Form.Item name='NauseaOrVomiting' rules={[
                                 { required: true, message: 'please choose one at least!' },
                              ]}>
                                 <Radio.Group name="NauseaOrVomiting" >
                                    <td><Radio value={0}>0</Radio></td>
                                    <td><Radio value={1}>1</Radio></td>
                                    <td><Radio value={2}>2</Radio></td>
                                    <td><Radio value={3}>3</Radio></td>
                                    <td><Radio value={4}>4</Radio></td>
                                    <td><Radio value={5}>5</Radio></td>
                                    <td><Radio value={6}>6</Radio></td>
                                 </Radio.Group>
                              </Form.Item>
                           </tr>


                           <tr>
                              <td className='items'>Dizziness</td>
                              <Form.Item name='dizziness' rules={[
                                 { required: true, message: 'please choose one at least!' },
                              ]}>
                                 <Radio.Group name="dizziness" >
                                    <td><Radio value={0}>0</Radio></td>
                                    <td><Radio value={1}>1</Radio></td>
                                    <td><Radio value={2}>2</Radio></td>
                                    <td><Radio value={3}>3</Radio></td>
                                    <td><Radio value={4}>4</Radio></td>
                                    <td><Radio value={5}>5</Radio></td>
                                    <td><Radio value={6}>6</Radio></td>
                                 </Radio.Group></Form.Item>
                           </tr>

                           <tr>
                              <td className='items'>Blurred vision</td>
                              <Form.Item name='blurredVision' rules={[
                                 { required: true, message: 'please choose one at least!' },
                              ]}>
                                 <Radio.Group name="blurredVision" >
                                    <td><Radio value={0}>0</Radio></td>
                                    <td><Radio value={1}>1</Radio></td>
                                    <td><Radio value={2}>2</Radio></td>
                                    <td><Radio value={3}>3</Radio></td>
                                    <td><Radio value={4}>4</Radio></td>
                                    <td><Radio value={5}>5</Radio></td>
                                    <td><Radio value={6}>6</Radio></td>
                                 </Radio.Group></Form.Item>
                           </tr>
                           <tr>
                              <td className='items'>Balance problems</td>
                              <Form.Item name='balanceProblems' rules={[
                                 { required: true, message: 'please choose one at least!' },
                              ]}>
                                 <Radio.Group name="balanceProblems" >
                                    <td><Radio value={0}>0</Radio></td>
                                    <td><Radio value={1}>1</Radio></td>
                                    <td><Radio value={2}>2</Radio></td>
                                    <td><Radio value={3}>3</Radio></td>
                                    <td><Radio value={4}>4</Radio></td>
                                    <td><Radio value={5}>5</Radio></td>
                                    <td><Radio value={6}>6</Radio></td>
                                 </Radio.Group></Form.Item>
                           </tr>
                           <tr>
                              <td className='items'>Sensitivity to light</td>
                              <Form.Item name='sensitivityToLight' rules={[
                                 { required: true, message: 'please choose one at least!' },
                              ]}>
                                 <Radio.Group name="sensitivityToLight" >
                                    <td><Radio value={0}>0</Radio></td>
                                    <td><Radio value={1}>1</Radio></td>
                                    <td><Radio value={2}>2</Radio></td>
                                    <td><Radio value={3}>3</Radio></td>
                                    <td><Radio value={4}>4</Radio></td>
                                    <td><Radio value={5}>5</Radio></td>
                                    <td><Radio value={6}>6</Radio></td>
                                 </Radio.Group></Form.Item>
                           </tr>
                           <tr>
                              <td className='items'>Sensitivity to noise</td>
                              <Form.Item name='sensitivityToNoise' rules={[
                                 { required: true, message: 'please choose one at least!' },
                              ]}>
                                 <Radio.Group name="sensitivityToNoise" >
                                    <td><Radio value={0}>0</Radio></td>
                                    <td><Radio value={1}>1</Radio></td>
                                    <td><Radio value={2}>2</Radio></td>
                                    <td><Radio value={3}>3</Radio></td>
                                    <td><Radio value={4}>4</Radio></td>
                                    <td><Radio value={5}>5</Radio></td>
                                    <td><Radio value={6}>6</Radio></td>
                                 </Radio.Group></Form.Item>
                           </tr>

                           <tr>
                              <td className='items'>Feeling slowed down</td>
                              <Form.Item name='feelingSlowedDown' rules={[
                                 { required: true, message: 'please choose one at least!' },
                              ]}>
                                 <Radio.Group name="feelingSlowedDown" >
                                    <td><Radio value={0}>0</Radio></td>
                                    <td><Radio value={1}>1</Radio></td>
                                    <td><Radio value={2}>2</Radio></td>
                                    <td><Radio value={3}>3</Radio></td>
                                    <td><Radio value={4}>4</Radio></td>
                                    <td><Radio value={5}>5</Radio></td>
                                    <td><Radio value={6}>6</Radio></td>
                                 </Radio.Group></Form.Item>
                           </tr>
                           <tr>
                              <td className='items'>Feeling like “in a fog“</td>
                              <Form.Item name='feelingLikeInAFog' rules={[
                                 { required: true, message: 'please choose one at least!' },
                              ]}>
                                 <Radio.Group name="feelingLikeInAFog" >
                                    <td><Radio value={0}>0</Radio></td>
                                    <td><Radio value={1}>1</Radio></td>
                                    <td><Radio value={2}>2</Radio></td>
                                    <td><Radio value={3}>3</Radio></td>
                                    <td><Radio value={4}>4</Radio></td>
                                    <td><Radio value={5}>5</Radio></td>
                                    <td><Radio value={6}>6</Radio></td>
                                 </Radio.Group></Form.Item>
                           </tr>
                           <tr>
                              <td className='items'>“Don’t feel right”</td>
                              <Form.Item name='dontFeelRight' rules={[
                                 { required: true, message: 'please choose one at least!' },
                              ]}>
                                 <Radio.Group name="dontFeelRight" >
                                    <td><Radio value={0}>0</Radio></td>
                                    <td><Radio value={1}>1</Radio></td>
                                    <td><Radio value={2}>2</Radio></td>
                                    <td><Radio value={3}>3</Radio></td>
                                    <td><Radio value={4}>4</Radio></td>
                                    <td><Radio value={5}>5</Radio></td>
                                    <td><Radio value={6}>6</Radio></td>
                                 </Radio.Group></Form.Item>
                           </tr>
                           <tr>
                              <td className='items'>Difficulty concentrating</td>
                              <Form.Item name='difficultyConcentrating' rules={[
                                 { required: true, message: 'please choose one at least!' },
                              ]}>
                                 <Radio.Group name="difficultyConcentrating" >
                                    <td><Radio value={0}>0</Radio></td>
                                    <td><Radio value={1}>1</Radio></td>
                                    <td><Radio value={2}>2</Radio></td>
                                    <td><Radio value={3}>3</Radio></td>
                                    <td><Radio value={4}>4</Radio></td>
                                    <td><Radio value={5}>5</Radio></td>
                                    <td><Radio value={6}>6</Radio></td>
                                 </Radio.Group></Form.Item>
                           </tr>

                           <tr>
                              <td className='items'>Difficulty remembering</td>
                              <Form.Item name='difficultyRemembering' rules={[
                                 { required: true, message: 'please choose one at least!' },
                              ]}>
                                 <Radio.Group name="difficultyRemembering" >
                                    <td><Radio value={0}>0</Radio></td>
                                    <td><Radio value={1}>1</Radio></td>
                                    <td><Radio value={2}>2</Radio></td>
                                    <td><Radio value={3}>3</Radio></td>
                                    <td><Radio value={4}>4</Radio></td>
                                    <td><Radio value={5}>5</Radio></td>
                                    <td><Radio value={6}>6</Radio></td>
                                 </Radio.Group></Form.Item>
                           </tr>
                           <tr>
                              <td className='items'>Fatigue or low energy</td>
                              <Form.Item name='fatigueOrLowEnergy' rules={[
                                 { required: true, message: 'please choose one at least!' },
                              ]}>
                                 <Radio.Group name="fatigueOrLowEnergy" >
                                    <td><Radio value={0}>0</Radio></td>
                                    <td><Radio value={1}>1</Radio></td>
                                    <td><Radio value={2}>2</Radio></td>
                                    <td><Radio value={3}>3</Radio></td>
                                    <td><Radio value={4}>4</Radio></td>
                                    <td><Radio value={5}>5</Radio></td>
                                    <td><Radio value={6}>6</Radio></td>
                                 </Radio.Group></Form.Item>
                           </tr>
                           <tr>
                              <td className='items'>Confusion</td>
                              <Form.Item name='confusion' rules={[
                                 { required: true, message: 'please choose one at least!' },
                              ]}>
                                 <Radio.Group name="confusion" >
                                    <td><Radio value={0}>0</Radio></td>
                                    <td><Radio value={1}>1</Radio></td>
                                    <td><Radio value={2}>2</Radio></td>
                                    <td><Radio value={3}>3</Radio></td>
                                    <td><Radio value={4}>4</Radio></td>
                                    <td><Radio value={5}>5</Radio></td>
                                    <td><Radio value={6}>6</Radio></td>
                                 </Radio.Group></Form.Item>
                           </tr>
                           <tr>
                              <td className='items'>Drowsiness</td>
                              <Form.Item name='drowsiness' rules={[
                                 { required: true, message: 'please choose one at least!' },
                              ]}>
                                 <Radio.Group name="drowsiness" >
                                    <td><Radio value={0}>0</Radio></td>
                                    <td><Radio value={1}>1</Radio></td>
                                    <td><Radio value={2}>2</Radio></td>
                                    <td><Radio value={3}>3</Radio></td>
                                    <td><Radio value={4}>4</Radio></td>
                                    <td><Radio value={5}>5</Radio></td>
                                    <td><Radio value={6}>6</Radio></td>
                                 </Radio.Group></Form.Item>
                           </tr>
                           <tr>
                              <td className='items'>More emotional</td>
                              <Form.Item name='moreEmotional' rules={[
                                 { required: true, message: 'please choose one at least!' },
                              ]}>
                                 <Radio.Group name="moreEmotional" >
                                    <td><Radio value={0}>0</Radio></td>
                                    <td><Radio value={1}>1</Radio></td>
                                    <td><Radio value={2}>2</Radio></td>
                                    <td><Radio value={3}>3</Radio></td>
                                    <td><Radio value={4}>4</Radio></td>
                                    <td><Radio value={5}>5</Radio></td>
                                    <td><Radio value={6}>6</Radio></td>
                                 </Radio.Group></Form.Item>
                           </tr>

                           <tr>
                              <td className='items'>Irritability</td>
                              <Form.Item name='irritability' rules={[
                                 { required: true, message: 'please choose one at least!' },
                              ]}>
                                 <Radio.Group name="irritability" >
                                    <td><Radio value={0}>0</Radio></td>
                                    <td><Radio value={1}>1</Radio></td>
                                    <td><Radio value={2}>2</Radio></td>
                                    <td><Radio value={3}>3</Radio></td>
                                    <td><Radio value={4}>4</Radio></td>
                                    <td><Radio value={5}>5</Radio></td>
                                    <td><Radio value={6}>6</Radio></td>
                                 </Radio.Group></Form.Item>
                           </tr>
                           <tr>
                              <td className='items'>Sadness</td>
                              <Form.Item name='sadness' rules={[
                                 { required: true, message: 'please choose one at least!' },
                              ]}>
                                 <Radio.Group name="sadness" >
                                    <td><Radio value={0}>0</Radio></td>
                                    <td><Radio value={1}>1</Radio></td>
                                    <td><Radio value={2}>2</Radio></td>
                                    <td><Radio value={3}>3</Radio></td>
                                    <td><Radio value={4}>4</Radio></td>
                                    <td><Radio value={5}>5</Radio></td>
                                    <td><Radio value={6}>6</Radio></td>
                                 </Radio.Group></Form.Item>
                           </tr>
                           <tr>
                              <td className='items'>Nervous or Anxious</td>
                              <Form.Item name='nervousOrAnxious' rules={[
                                 { required: true, message: 'please choose one at least!' },
                              ]}>
                                 <Radio.Group name="nervousOrAnxious" >
                                    <td><Radio value={0}>0</Radio></td>
                                    <td><Radio value={1}>1</Radio></td>
                                    <td><Radio value={2}>2</Radio></td>
                                    <td><Radio value={3}>3</Radio></td>
                                    <td><Radio value={4}>4</Radio></td>
                                    <td><Radio value={5}>5</Radio></td>
                                    <td><Radio value={6}>6</Radio></td>
                                 </Radio.Group></Form.Item>
                           </tr>
                           <tr>
                              <td className='items'>Trouble falling asleep (if applicable)</td>
                              <Form.Item name='troubleFallingAsleep' rules={[
                                 { required: true, message: 'please choose one at least!' },
                              ]}>
                                 <Radio.Group name="troubleFallingAsleep" >
                                    <td><Radio value={0}>0</Radio></td>
                                    <td><Radio value={1}>1</Radio></td>
                                    <td><Radio value={2}>2</Radio></td>
                                    <td><Radio value={3}>3</Radio></td>
                                    <td><Radio value={4}>4</Radio></td>
                                    <td><Radio value={5}>5</Radio></td>
                                    <td><Radio value={6}>6</Radio></td>
                                 </Radio.Group></Form.Item>
                           </tr>

                        </tbody>
                     </table>
                     <div className='left'>
                        <p>Do your symptoms get worse with physical activity?</p>
                        <Form.Item name='Y_N_1' rules={[
                           { required: true, message: 'please choose one at least!' },
                        ]}>
                           <Radio.Group name="Y_N_1" >
                              <td><Radio value={true}>yes</Radio></td>
                              <td><Radio value={false}>no</Radio></td>
                           </Radio.Group></Form.Item>

                        <p>Do your symptoms get worse with mental activity?</p>
                        <Form.Item name='Y_N_2' rules={[
                           { required: true, message: 'please choose one at least!' },
                        ]}>
                           <Radio.Group name="Y_N_2" >
                              <td><Radio value={true}>yes</Radio></td>
                              <td><Radio value={false}>no</Radio></td>
                           </Radio.Group></Form.Item>

                        <p>If 100% is feeling perfectly normal, what percent of normal do you feel?</p>
                        <Form.Item name='range' rules={[
                           { required: true, message: 'please choose one at least!' },
                        ]}>
                           <Slider name="range" className='my-slider' defaultValue={40} onAfterChange={toastValue} icon={<HeartOutline />} />
                        </Form.Item>
                        <p>If not 100%, why?</p>
                        <Form.Item name='rangeReason' rules={[
                           { required: true, message: 'please choose one at least!' },
                        ]}>
                           <TextArea name="rangeReason" rows={4} placeholder="Reason" />
                        </Form.Item>
                     </div>
                  </div>
               </Collapse.Panel>

            </Collapse>
         </Form>
      </div >
   )
}
export default InjureForm;
