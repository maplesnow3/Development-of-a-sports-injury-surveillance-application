import React,{useState,useEffect} from 'react';
import { Collapse,Button,Toast } from 'antd-mobile';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import RegistryTitle from '../login/components/RegistryTitle'
import {PersonInformation as PersonInfo,UserIdInviteCode,MedicalHistory,InjuryHistory,ConcussionHistory} from './component';
import {getBaseline,updatePersonInfo,setAccessCodeApi} from '../../api';
import HomeIcon from '../../image/home.png'
import { UserOutlined } from '@ant-design/icons';
import NavBarBottom from "../part-navBarBottom"
import './index.scss'

const PersonInformation = ()=>{
  const userId = Cookies.get('user_id');
  if(!userId){
    Toast.show({
      icon: 'fail',
      content: 'Please log in',
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
  const [concussionQuestions,setConcussionQuestions] = useState([]);
  const [accessCode,setAccessCode] = useState('')
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
    <>
      <div className="common--page-title common--page-title__large">
        <h1>
          Personal Information
          <p className="common--page-title-sub">Check your information here</p>
        </h1>
        <div className="page-title--icon-cont"><UserOutlined /></div>
      </div>

      <div className="common--page-main common--page-main__large-title">
        <div className="person-info--cont">
          <p className="person-info--instruction-text">
            Tip: Slide to the bottom and push the "Save" button for storing any change(s)
          </p>
          <Collapse defaultActiveKey={['1']} accordion>
              <Collapse.Panel key='1' title='Personal Details'>
                <PersonInfo phoneChange={(e)=>{setPhone(e)}} addressChange={(e)=>{setAddress(e)}} />
              </Collapse.Panel>
              <Collapse.Panel key='2' title='User ID and Access Code'>
                <UserIdInviteCode changeAccessCode={(e)=>{setAccessCode(e)}} />
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
            {(phone || address || accessCode) &&<div style={{backgroundColor:'#fff',padding:'20px 5px 5px 5px'}}>
            <Button
              block
              color='success'
              size='large'
              onClick={async ()=>{
                if(phone || address){
                  const res = await updatePersonInfo({
                    phone:phone?phone:undefined,
                    address:address?address:undefined,
                    user_id:userId
                  })
                  if(res.status === 'success'){
                    Toast.show({
                      icon: 'success',
                      content:'Saved successfully',
                    })
                    setPhone('');
                    setAddress('');
                  }else{
                    Toast.show({
                      icon: 'fail',
                      content: res.message,
                    })
                  }
                }
                if(accessCode){
                  const res = await setAccessCodeApi({user_id:userId,code:accessCode});
                  console.log(res);
                  if(res.status === 'success'){
                    Toast.show({
                      icon: 'success',
                      content:'Saved successfully',
                    })
                    setPhone('');
                    setAddress('');
                  }else{
                    Toast.show({
                      icon: 'fail',
                      content: res.message,
                    })
                  }
                }
              }}>
                Save
            </Button>
            </div>}

        </div>


        </div>

      <NavBarBottom />
    </>
  )
}

export default PersonInformation;