import { useNavigate,useLocation } from 'react-router-dom';
import React, { useState } from 'react'
import {  Form,  Button, Checkbox,  Space,} from 'antd-mobile'
   

const InjureForm = ()=>{
   const navigate = useNavigate();
   const location = useLocation();
   const {state} = location;
   const targetId = -1;

   
    return (
<div className='Injury Form'>
   
<Form
        name='form'
        onFinish={async(values)=>{
         const {
            
            targetId,injuredBodyPart,injuryOccurrence,nature_typeOfInjury,removalFromField,
            actionsFollowingInjury,mechanismOfInjury,trainingSpecific,protectiveEquipmentWorn,
            contributingFactors,provisionalInjuryDiagnosis,injuryPresentation,initialTreatment,
            initialTreatingPerson,referralTo
         } = {...state,...values}

         let data ={
            
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
            referralTo
         }
         console.log(values)

       }}  
        footer={
          <Button style={{backgroundColor:'#1DB860'}} block type='submit' color='primary' size='large'>
            submit
          </Button>
        }
      >

<table className='injured_form_table'>
  <caption className='table_title'>Injured Form</caption>
     <tbody>
     <tr>
       <th colSpan={2}>Injured Body Part</th>
     </tr>
      

      <Form.Item name='injuredBodyPart' label='Injured Body Part' required>
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

    <Form.Item name='injuryOccurrence' label='injuryOccurrence' required>
          <Checkbox.Group>
            <Space direction='vertical'>
               <Checkbox value='Match'>Match</Checkbox>
               <Checkbox value='First Half'>First Half</Checkbox>
               <Checkbox value='Second Half'>Second Half</Checkbox>

               <Checkbox value='Training'>Training</Checkbox>
               <Checkbox value='Warm up/cool down'>Warm up/cool down</Checkbox>
               <Checkbox value='Second Half'>Second Half</Checkbox>
               </Space>
          </Checkbox.Group>
        </Form.Item>

    <tr>
       <th colSpan={2}>nature_typeOfInjury</th>
    </tr>

    <Form.Item name='nature_typeOfInjury' label='nature_typeOfInjury' required>
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
               <Checkbox value='Other'>Other</Checkbox>

               </Space>
          </Checkbox.Group>
        </Form.Item>




    <tr>
       <th colSpan={2}>removalFromField</th>
    </tr>

    <Form.Item name='removalFromField' label='removalFromField' required>
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
    <Form.Item name='actionsFollowingInjury' label='actionsFollowingInjury' required>
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
    <Form.Item name='mechanismOfInjury' label='mechanismOfInjury' required>
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

    <Form.Item name='trainingSpecific' label='trainingSpecific' required>
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

    <Form.Item name='protectiveEquipmentWorn' label='protectiveEquipmentWorn' required>
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
    <Form.Item name='contributingFactors' label='contributingFactors' required>
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
    <Form.Item name='initialTreatment' label='initialTreatment' required>
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
    <Form.Item name='initialTreatment' label='initialTreatment' required>
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
    <Form.Item name='initialTreatingPerson' label='initialTreatingPerson' required>
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

    <Form.Item name='referralTo' label='referralTo' required>
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

</Form>

</div>
)
}
export default InjureForm;