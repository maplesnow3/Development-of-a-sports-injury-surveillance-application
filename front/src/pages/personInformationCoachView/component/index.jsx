import React, { useState,useEffect } from 'react';
import {Form,Input,Toast,TextArea} from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import {getPersonInfo,getAccessCode} from '../../../api'
import Cookies from 'js-cookie'
import './index.scss'

export const PersonInformation = ({phoneChange,addressChange})=>{
  const navigate = useNavigate()
  const [phone,setPhone] = useState();
  const [address,setAddress] = useState();
  const [data,setData] = useState([])
  const userId = Cookies.get('user_id') || "";

  const getPersonInfoFun = async()=>{
    let res = await getPersonInfo(userId)
    if(res.status ==='success'){
      const {surname,givenName,birthday,ethicBackground,phone,address,country} = res.personal_info;
      let temp =[
        {key:'Surname',value:surname},
        {key:'Given Name',value:givenName},
        {key:'Ethic Background',value:ethicBackground},
        {key:'Phone Number',value:phone},
        {key:'Address',value:address},
        {key:'Country of Birth',value:country},
        {key:'Date of Birth',value:birthday}
      ]
      setData(temp)
      setPhone(phone);
      setAddress(address);
    }else{
      Toast.show({
        icon: 'fail',
        content: res.message,
      })
    }
  }
  useEffect(()=>{
    getPersonInfoFun()

  },[])
  return (
    <Form className='info-form' layout='horizontal'>
      {data.map(item=>(<Form.Item style={{fontSize:'14px'}} key={item.key}  label={item.key}>
        {item.key==='Phone Number'&&<Input maxLength={11} onChange={(e)=>{phoneChange(e);addressChange(address);setPhone(e);}} value={phone} />}
        {item.key==='Address'&&<Input onChange={(e)=>{addressChange(e);phoneChange(phone);setAddress(e)}} value={address} />}
        {(item.key!=='Phone Number' && item.key!=='Address') && <Input value={item.value} disabled />}
      </Form.Item>)
      )}
    </Form>
  )
}

export const UserIdInviteCode = ({changeAccessCode})=>{
  const [data,setData] = useState([])
  const [accessCode,setAccessCode] = useState('')
  const getAccessCodeFun = async ()=>{
    const userId = (() => {
      let checkedUserId =
        (new URL("http://localhost" + window.location.hash.slice(1)).
          searchParams.get("user_id")) ||
        "";

      if (!checkedUserId) {
        alert("Missing user id");
        return "-1";
      } else {
        return checkedUserId
      }
    })();

    const res = await getAccessCode(userId);
    if(res.status==='success'){
      const data = [
        {key:'User ID',value:userId},
        {key:'Access Code',value:res.code}
      ]
      setAccessCode(res.code)
      setData(data)
    }else{
      Toast.show({
        icon: 'fail',
        content: res.message,
      })
    }
  }
  useEffect(()=>{
    getAccessCodeFun()

  },[])
  return (
    <div className='user-id-invite-code'>
       <Form className='info-form' layout='horizontal'>
      {data.map(item=>(<Form.Item style={{fontSize:'14px'}} key={item.key}  label={item.key}>
        {item.key === 'User ID' && <Input value={item.value} disabled />}
        {item.key === 'Access Code' && <Input onChange={(e)=>{changeAccessCode(e);setAccessCode(e);}} value={accessCode} />}
      </Form.Item>)
      )}
    </Form>
    </div>
  )
}

export const MedicalHistory = ({medicalHistory,medicalHistoryInput,medicineTaken,medicineTakenInput})=>{
const [tableOneData,setTableOneData] = useState([]);
const [tableTwoData,setTableTwoData] = useState([])
const dataInit = ()=>{
  const strArr = ['Asthma','Type 1 Diabetes','Type 2 Diabetes','Epilepsy','High Blood','Heart Conditions','Allergies'];
  const textArr = ['Medications','Vitamins and/or Supplements','Other']
  let data = [];
  let tableTData = []
  strArr.map((item,index)=>{
    data.push({type:item,yesOrNo:medicalHistory[index],years:medicalHistoryInput[index]})
  })
  textArr.map((item,index)=>{
    tableTData.push({type:item,yesOrNo:medicineTaken[index],text:medicineTakenInput[index]})
  })
  setTableOneData(data)
  setTableTwoData(tableTData)
}
  useEffect(()=>{
    dataInit();
  },[])
  return (
    <div className='medical_history'>
      <table className='table'>
        <thead>
          <td className='first'>Type</td>
          <td className='second'>Yes/No</td>
          <td className='third'>Years</td>
        </thead>
        {tableOneData.map(item=>(
          <tr className='table-td' key={item.type}>
            <td className='first'>{item.type}</td>
            <td className='second'>{item.yesOrNo}</td>
            <td className='third'>{item.years}</td>
          </tr>
        ))}
      </table>
      <table className='table'>
        <thead>
          <td className='first'>Are you taking any of the following?</td>
          <td className='second'>Yes/No</td>
          <td className='third'>Detail</td>
        </thead>
        {tableTwoData.map(item=>(
          <tr className='table-td' key={item.type}>
            <td className='first'>{item.type}</td>
            <td className='second'>{item.yesOrNo}</td>
            <td className='third'><TextArea disabled className='my-textarea' value={item.text} /></td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export const InjuryHistory = ({injuryHistory,injuryHistoryInput,surgery})=>{
  const strArr = [ 'Muscle Strain','Ligament Sprain','Broken Bones','Dislocation Subluxation','Meniscus Cartilage','Tendon Injury','Nerve Injury','Other']
  let data = []
  strArr.map((item,index)=>{
    data.push( {key:item,type:injuryHistory[index],location:injuryHistoryInput[index]})
  })

  return (
    <div className='injury_history'>
       <table className='table'>
        <thead>
          <td className='first'>Injury Type</td>
          <td className='second'>Yes/No</td>
          <td className='third'>Location</td>
        </thead>
        {data.map(item=>(
          <tr className='table-td' key={item.key}>
            <td className='first'>{item.key}</td>
            <td className='second'>{item.type}</td>
            <td className='third'>{item.location}</td>
          </tr>
        ))}
      </table>
      <table className='table'>
        <thead>
          <td >Surgery(s) and/or reconstruction(s)</td>
        </thead>
          <tr className='table-td' >
            <td ><TextArea className='my-textarea' disabled value={surgery} /></td>

          </tr>
      </table>
    </div>
  )
}

export const ConcussionHistory = ({concussionQuestions})=>{
  const questions = [
    {text:'Were diagnosed with a CONCUSSION in the past 12 months?',unit:''},
    {text:'If Yes, was the concussion sport related?',unit:''},
    {text:'How many concussions did you suffer in the past 12 months?',unit:'time(s)'},
    {text:'After the concussions did you see a doctor or go to hospital?',unit:''},
    {text:'How long did it take from you to recover from your concussion?',unit:'week(s)'},
    {text:'Did you experience any serious symptoms after the concussion?',unit:''},
]
let data = []
questions.map((item,index)=>{
  data.push({key:item.text,value:concussionQuestions[index],unit:item.unit})
})
  return (
    <div className='concussion_history'>
      <table className='table'>
        {data.map(item=>(
          <tr className='table-td' key={item.key}>
            <td className='first'>{item.key}</td>
            <td className='second'>{item.value}&nbsp;&nbsp;{item.unit}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}