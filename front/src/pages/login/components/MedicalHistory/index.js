import React from 'react';
import { useNavigate,useLocation} from 'react-router-dom';
import {Form,Button} from 'antd-mobile';
import RadioComponent from '../Radio';
import RegistryTitle from '../RegistryTitle';
import './index.scss'

const MedicalHistory = ()=>{
  const navigate = useNavigate();
  const location = useLocation();
  const {state} = location;
  const dataArray = [
    {type:'input',name:'asthma',label:'Asthma',inputName:'asthmaInput',unit:'year(s)',rules:[{required:true,message:'please choose Yes or No'}]},
    {type:'input',name:'type1Diabetes',label:'Type 1 Diabetes',inputName:'type1DiabetesInput',unit:'year(s)',rules:[{required:true,message:'please choose Yes or No'}]},
    {type:'input',name:'type2Diabetes',label:'Type 2 Diabetes',inputName:'type2DiabetesInput',unit:'year(s)',rules:[{required:true,message:'please choose Yes or No'}]},
    {type:'input',name:'epilepsy',label:'Epilepsy',inputName:'epilepsyInput',unit:'year(s)',rules:[{required:true,message:'please choose Yes or No'}]},
    {type:'input',name:'highBlood',label:'High blood pressure',inputName:'highBloodInput',unit:'year(s)',rules:[{required:true,message:'please choose Yes or No'}]},
    {type:'input',name:'heartConditions',label:'Heart Conditions',inputName:'heartConditionsInput',unit:'year(s)',rules:[{required:true,message:'please choose Yes or No'}]},
    {type:'input',name:'allergies',label:'Allergies',inputName:'allergiesInput',unit:'year(s)',rules:[{required:true,message:'please choose Yes or No'}]},
  ]
  return (
  <div className='medical-history'>
    <div className='content'>
    <RegistryTitle step={2} />
    <div className='wrapper'>
      <p>Do you suffer from any of the following?</p>
      <p>If yes,how long have you had this condition</p>
      <Form
        // layout='horizontal'
        name='form'
        onFinish={(values)=>{navigate('/registry/history1',{state:{...state,...values}})}}
        footer={
          <Button style={{backgroundColor:'#1DB860'}} block type='submit' color='primary' size='large'>
            Continue
          </Button>
        }
      >
        {dataArray.map(item=> <RadioComponent key={item.name} data={item} />)}
      </Form>
      </div>
      </div>
    </div>)
}


export default MedicalHistory;