import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import {Form,Button} from 'antd-mobile';
import RegistryTitle from '../RegistryTitle';
import RadioComponent from '../Radio';
import './index.scss'
const MedicalHistory1 = ()=>{
  const navigate = useNavigate();
  const location = useLocation();
  const {state} = location;
  const dataArray = [
    {type:'textarea',name:'medications',label:'medications',inputName:'medicationsInput',rules:[{required:true,message:'please choose Yes or No'}]},
    {type:'textarea',name:'vitaminsSupplements',label:'Vitamins and/or Supplements',inputName:'vitaminsSupplementsInput',rules:[{required:true,message:'please choose Yes or No'}]},
    {type:'textarea',name:'others',label:'Others',inputName:'othersInput',rules:[{required:true,message:'please choose Yes or No'}]},
  ]
  return (
    <div className='medical-history1'>
      <div className='content'>
      <RegistryTitle step={3} />
      <div className='wrapper'>
        <div className='history-title'>
          Are you taking any of the following?
        </div>
        <div className='tip'>if yes,please list</div>
        <Form
        // layout='horizontal'
        name='form'
        onFinish={(values)=>{navigate('/registry/injury',{state:{...state,...values}})}}
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
    </div>
  )
}

export default MedicalHistory1;