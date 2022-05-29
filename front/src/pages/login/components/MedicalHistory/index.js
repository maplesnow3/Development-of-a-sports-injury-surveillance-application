import React from 'react';
import { useNavigate,useLocation} from 'react-router-dom';
import {Form,Button} from 'antd-mobile';
import RadioComponent from '../Radio';
import RegistryTitle from '../RegistryTitle';
import NavBarBottom from "../../../part-navBarBottom"
import './index.scss'

const MedicalHistory = ()=>{
  const navigate = useNavigate();
  const location = useLocation();
  const {state} = location;
  const dataArray = [
    {type:'input',name:'asthma',label:'Asthma',inputName:'asthmaInput',unit:'yr(s)',rules:[{required:true,message:'Please choose Yes/No'}]},
    {type:'input',name:'type1Diabetes',label:'Type 1 Diabetes',inputName:'type1DiabetesInput',unit:'yr(s)',rules:[{required:true,message:'Please choose Yes/No'}]},
    {type:'input',name:'type2Diabetes',label:'Type 2 Diabetes',inputName:'type2DiabetesInput',unit:'yr(s)',rules:[{required:true,message:'Please choose Yes/No'}]},
    {type:'input',name:'epilepsy',label:'Epilepsy',inputName:'epilepsyInput',unit:'yr(s)',rules:[{required:true,message:'Please choose Yes/No'}]},
    {type:'input',name:'highBlood',label:'High blood pressure',inputName:'highBloodInput',unit:'yr(s)',rules:[{required:true,message:'Please choose Yes/No'}]},
    {type:'input',name:'heartConditions',label:'Heart Conditions',inputName:'heartConditionsInput',unit:'yr(s)',rules:[{required:true,message:'Please choose Yes/No'}]},
    {type:'input',name:'allergies',label:'Allergies',inputName:'allergiesInput',unit:'yr(s)',rules:[{required:true,message:'Please choose Yes/No'}]},
  ]
  return (
    <>
      <RegistryTitle step={2} />

      <div className="common--page-main common--page-main__large-title">
        <div className='medical-history'>
          <p className="instruction-text">
            Do you suffer from any of the following?<br />
            If yes, how long have you had this condition?
          </p>
          <Form
            // layout='horizontal'
            name='form'
            onFinish={(values) => { navigate('/registry/history1', { state: { ...state, ...values } }) }}
            footer={
              <Button block type='submit' color='success' size='large'>
                Continue
              </Button>
            }
          >
            {dataArray.map(item => <RadioComponent key={item.name} data={item} />)}
          </Form>
        </div>
      </div>

      <NavBarBottom homeBtnForLogin />
    </>
  )
}


export default MedicalHistory;