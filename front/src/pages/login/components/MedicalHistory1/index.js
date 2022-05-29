import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import {Form,Button} from 'antd-mobile';
import RegistryTitle from '../RegistryTitle';
import RadioComponent from '../Radio';
import NavBarBottom from "../../../part-navBarBottom"
import './index.scss'
const MedicalHistory1 = ()=>{
  const navigate = useNavigate();
  const location = useLocation();
  const {state} = location;
  const dataArray = [
    {type:'textarea',name:'medications',label:'Medications',inputName:'medicationsInput',rules:[{required:true,message:'Please choose Yes/No'}]},
    {type:'textarea',name:'vitaminsSupplements',label:'Vitamins and/or Supplements',inputName:'vitaminsSupplementsInput',rules:[{required:true,message:'Please choose Yes/No'}]},
    {type:'textarea',name:'others',label:'Others',inputName:'othersInput',rules:[{required:true,message:'Please choose Yes/No'}]},
  ]
  return (
    <>
      <RegistryTitle step={3} />

      <div className="common--page-main common--page-main__large-title">
        <div className='medical-history1'>
          <p className="instruction-text">
            Are you taking any of the following?<br />
            If yes,please list them on the right.
          </p>
          <Form
            // layout='horizontal'
            name='form'
            onFinish={(values)=>{navigate('/registry/injury',{state:{...state,...values}})}}
            footer={
              <Button block type='submit' color='success' size='large'>
                Continue
              </Button>
            }
          >
            {dataArray.map(item=> <RadioComponent key={item.name} data={item} />)}
          </Form>
        </div>
      </div>

      <NavBarBottom homeBtnForLogin />
    </>
  )
}

export default MedicalHistory1;