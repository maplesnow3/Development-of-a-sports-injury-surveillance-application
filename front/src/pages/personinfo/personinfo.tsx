import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Form,Input,Button,Toast} from 'antd-mobile';
import { MailOutline,LockFill  } from 'antd-mobile-icons'
import './personinfo.scss'
import { CalendarOutlined, StarFilled,FormOutlined, LockOutlined,UserOutlined,LogoutOutlined,HomeOutlined} from '@ant-design/icons';
const Personinfo = ()=>{
  const navigator = useNavigate()
  return (
    <div className='personinfo'>
       
      <div className= 'title'><br></br><br></br>  Personal Information 
      </div>
      <div className = 'body'>
        
      <table>
      <tr >
       <th >Personal Information</th>  
       <th></th>
      
      </tr>
      <tr>
       <td>Surname</td>
       <td ></td>
      
      </tr>
      <tr>
       <td>Given name</td>
       <td></td>
      </tr>
      <tr>
        <td>Ethic Background</td>
        <td></td>
      </tr>
      <tr>
       <td>Phone Number</td>
       <td></td>
      </tr>
      <tr>
       <td>Address</td>
       <td></td>
      </tr>
      <tr>
        <td>Country of Birth</td>
        <td></td>
      </tr>
      <tr>
        <td>Date of Birth</td>
        <td></td>
      </tr>
      <tr className="spacer"><td >&nbsp;</td></tr>
      <tr>
       <th>User id and  invite code</th>
       <th></th>
       
       
      </tr>
      <tr>
        <td>User id</td>
        <td></td>
      </tr>
      <tr>
        <td>Invite code </td>
        <td></td>
      </tr>

      <tr className="spacer"><td >&nbsp;</td></tr>
      <tr>
       <th>Medical History</th>
       <th></th>
       <th></th>
       
      </tr>
      <tr className="thead2">
            <td >Type</td>
            <td >Yes/No</td>
            <td>Years</td>
        </tr>
      <tr>
       <td>Asthma</td>
       <td></td>
       <td></td>
      </tr>
      <tr>
        <td>Type 1 Diabetes</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
       <td>Type 2 Diabetes</td>
       <td></td>
       <td></td>
      </tr>
      <tr>
       <td>Eilepsy</td>
       <td></td>
       <td></td>
      </tr>
      <tr>
        <td>High Blood Pressure</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Heart Conditions</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Allergies</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Other</td>
        <td></td>
        <td></td>
      </tr>
      <tr className="thead2">
            <td >Are you taking any of the following?		If yes, please list</td>
            <td >Yes/No</td>
            <td>Detail</td>
        </tr>
        <tr>
        <td>Medications </td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Vitamins and/or Supplements</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Other</td>
        <td></td>
        <td></td>
      </tr>

      <tr className="spacer"><td >&nbsp;</td></tr>
      <tr>

       <th>Injury History</th>
       <th></th>
       <th></th>
      </tr>
      <tr className="thead2">
            <td >Injury Type</td>
            <td >Yes/No</td>
            <td>Location</td>
        </tr>
     
      <tr>
        <td>Muscle Strain</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
       <td>Ligament Sprain</td>
       <td></td>
       <td></td>
      </tr>
      <tr>
       <td>Broken Bones</td>
       <td></td>
       <td></td>
      </tr>
      <tr>
        <td>Dislocation/subluxation</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Meniscus or cartilage lesion</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Tendon Injury</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Nerve Injury</td>
        <td></td>
        <td></td>
      </tr>   
      <tr>
        <td>Other</td>
        <td></td>
        <td></td>
      </tr> 
      <tr className="thead2">
            <td > surgery(s) or reconstruction(s) </td>
            <td >Approximate year</td>
            <td></td>
        </tr>
        <tr>
        <td></td>
        <td></td>
        <td></td>
      </tr> <tr>
        <td></td>
        <td></td>
        <td></td>
      </tr> 
      <tr className="spacer"><td >&nbsp;</td></tr>
      <tr>

       <th>Concusssion History</th>
       <th></th>
       
      </tr>
      
     
      <tr>
        <td>Were diagnosed with a CONCUSSION in the past 12 months? </td>
        <td></td>
        
      </tr>
      <tr>
       <td>If Yes, these questions will pop up 
Was the concussion sport related
</td>
       <td></td>
       
      </tr>
      <tr>
       <td>How many concussions did you suffer in the past 12 months?</td>
       <td></td>
       
      </tr>
      <tr>
        <td>After the concussion, did you see a doctor or go to hospital?	</td>
        <td></td>
       
      </tr>
      <tr>
        <td>How long did it take from you to recover from your concussion</td>
        <td></td>
        
      </tr>
      <tr>
        <td>Did you experience any serious symptoms after the concussion?</td>
        <td></td>
        
      </tr>
      <tr>
        <td>If yes, can you describe those symptoms?</td>
        <td></td>
        
      </tr>  
      <tr className="spacer"><td >&nbsp;</td></tr> 
      <button id ="save_btn">save</button> 
</table>
        
      


      </div>
      
      
      <div className = 'bottom2'> 
       
      <a href="/home"><HomeOutlined style={{ textAlign:'left',marginTop:20,marginLeft:15, fontSize: '400%', color: '#fff' }}/></a>
      <a href="/login"   ><LogoutOutlined style={{ textAlign:'center',marginTop:20,marginRight:15, fontSize: '400%', color: '#fff' }}/></a>
      </div>
    </div>
  )
}
export default Personinfo;