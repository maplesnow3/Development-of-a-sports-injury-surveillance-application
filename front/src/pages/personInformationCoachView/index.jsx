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
          Baseline Information
          <p className="common--page-title-sub">{(() => {
							// A fake domain is given for successfully construct URL object
							const urlSearch =
								(new URL("http://localhost" + window.location.hash.slice(1))).searchParams;

							// Parse checked params
							const checkedUserId = urlSearch.get("user_id") || "-1";
							const checkedUserName = urlSearch.get("name") || "";

							if (checkedUserId !== "-1" && checkedUserName) {
								return `${checkedUserName} - ${checkedUserId}`;
							} else {
								return "Check information here";
							}
						})()}
					</p>
        </h1>
        <div className="page-title--icon-cont"><UserOutlined /></div>
      </div>

      <div className="common--page-main common--page-main__large-title">
        <div className="person-info-coach--cont">
          <p className="person-info-coach--instruction-text">
            Tip: Tap the title below to see details
          </p>
          <Collapse accordion>
              <Collapse.Panel key='1' title='Medical History'>
              <MedicalHistory
                medicalHistory={medicalHistory}
                medicalHistoryInput={medicalHistoryInput}
                medicineTaken={medicineTaken}
                medicineTakenInput={medicineTakenInput}
                />
              </Collapse.Panel>
              <Collapse.Panel key='2' title='Injury History'>
              <InjuryHistory
                injuryHistory={injuryHistory}
                injuryHistoryInput={injuryHistoryInput}
                surgery={surgery} />
              </Collapse.Panel>
              <Collapse.Panel key='3' title='Concussion History'>
              <ConcussionHistory concussionQuestions={concussionQuestions} />
              </Collapse.Panel>
            </Collapse>
        </div>
      </div>

      <NavBarBottom />
    </>
  )
}

export default PersonInformation;