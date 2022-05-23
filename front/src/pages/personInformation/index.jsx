import React,{useState,useEffect} from 'react';
import { Collapse,Button,Toast } from 'antd-mobile';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import RegistryTitle from '../login/components/RegistryTitle'
import {PersonInformation as PersonInfo,UserIdInviteCode,MedicalHistory,InjuryHistory,ConcussionHistory} from './component';
import {getBaseline,updatePersonInfo} from '../../api';
import HomeIcon from '../../image/home.png'
import './index.scss'
const PersonInformation = ()=>{
  const userId = Cookies.get('user_id');
  if(!userId){
    Toast.show({
      icon: 'fail',
      content: 'please log in',
    })
    // window.open('#/login','__self')
    window.location.hash = '#/login'
    window.location.reload();
  }

  const navigate = useNavigate();
  const [phone,setPhone] = useState('');
  const [address,setAddress] = useState('');
  const [medicalHistory,setMedicalHistory] = useState([]);
  const [medicalHistoryInput,setMedicalHistoryInput] = useState([]);
  const [medicineTaken,setMedicineTaken] = useState([]);
  const [medicineTakenInput,setMedicineTakenInput] = useState([]);
  const [injuryHistory,setInjuryHistory] = useState([]);
  const [injuryHistoryInput,setInjuryHistoryInput] = useState([]);
  const [surgery,setSurgery] = useState('');
  const [concussionQuestions,setConcussionQuestions] = useState([])
  const getBaselineFun = async()=>{
    const res = await getBaseline(userId);
    if(res.status==='success'){
      const {medicalHistory,medicalHistoryInput,medicineTaken,medicineTakenInput,injuryHistory,injuryHistoryInput,surgery,concussionQuestions} = res.baseline;
      setMedicalHistory(medicalHistory);
      setMedicalHistoryInput(medicalHistoryInput);
      setMedicineTaken(medicineTaken);
      setMedicineTakenInput(medicineTakenInput);
      setInjuryHistory(injuryHistory);
      setInjuryHistoryInput(injuryHistoryInput);
      setSurgery(surgery);
      setConcussionQuestions(concussionQuestions);
    }else{
      Toast.show({
        icon: 'fail',
        content: res.message,
      })
    }
  }
  useEffect(()=>{
    getBaselineFun();
  },[])
  return (
    <div className='person-information'>
      <RegistryTitle step={7} />
      <img src={HomeIcon} onClick={()=>{navigate('/home')}} style={{display:'inline-block',width:'40px',position:'relative',left:'85vw'}}  alt="" />
      <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel key='1' title='Personal Information'>
            <PersonInfo phoneChange={(e)=>{setPhone(e)}} addressChange={(e)=>{setAddress(e)}} />
          </Collapse.Panel>
          <Collapse.Panel key='2' title='User id and Access code'>
            <UserIdInviteCode />
          </Collapse.Panel>
          <Collapse.Panel key='3' title='Medical History'>
           <MedicalHistory
            medicalHistory={medicalHistory}
            medicalHistoryInput={medicalHistoryInput}
            medicineTaken={medicineTaken}
            medicineTakenInput={medicineTakenInput}
            />
          </Collapse.Panel>
          <Collapse.Panel key='4' title='Injury History'>
           <InjuryHistory
            injuryHistory={injuryHistory}
            injuryHistoryInput={injuryHistoryInput}
            surgery={surgery} />
          </Collapse.Panel>
          <Collapse.Panel key='5' title='Concussion History'>
           <ConcussionHistory concussionQuestions={concussionQuestions} />
          </Collapse.Panel>
        </Collapse>
        {(phone || address) &&<div style={{backgroundColor:'#fff',padding:'20px 5px 5px 5px'}}>
        <Button
          style={{backgroundColor:'rgb(29, 184, 96)'}}
          block
          color='primary'
          size='large'
          onClick={async ()=>{
            const res = await updatePersonInfo({
              phone:phone?phone:undefined,
              address:address?address:undefined,
              user_id:userId
            })
            if(res.status === 'success'){
              Toast.show({
                icon: 'success',
                content:'save successfully',
              })
              setPhone('');
              setAddress('');
            }else{
              Toast.show({
                icon: 'fail',
                content: res.message,
              })
            }
          }}>
            Save
        </Button>
        </div>}

    </div>
  )
}

export default PersonInformation;