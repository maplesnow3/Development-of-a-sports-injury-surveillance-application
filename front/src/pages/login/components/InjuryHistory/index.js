import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import {Form,Button} from 'antd-mobile';
import RegistryTitle from '../RegistryTitle';
import RadioComponent from '../Radio';
import './index.scss'

const InjuryHistory = ()=>{
  const navigate = useNavigate();
  const location = useLocation();
  const {state} = location;
  const dataArray = [
    {type:'input',name:'muscleStrain',label:'Muscle Strain',inputName:'muscleStrainInput',rules:[{required:true,message:'please choose Yes or No'}]},
    {type:'input',name:'ligamentSprain',label:'Ligament Sprain',inputName:'ligamentSprainInput',rules:[{required:true,message:'please choose Yes or No'}]},
    {type:'input',name:'brokenBones',label:'Broken Bones',inputName:'brokenBonesInput',rules:[{required:true,message:'please choose Yes or No'}]},
    {type:'input',name:'dislocationSubluxation',label:'Dislocation subluxation',inputName:'dislocationSubluxationInput',rules:[{required:true,message:'please choose Yes or No'}]},
    {type:'input',name:'meniscusCartilage',label:'Meniscus or cartilage lesion',inputName:'meniscusCartilageInput',rules:[{required:true,message:'please choose Yes or No'}]},
    {type:'input',name:'tendonInjury',label:'Tendon injury',inputName:'tendonInjuryInput',rules:[{required:true,message:'please choose Yes or No'}]},
    {type:'input',name:'nerveInjury',label:'Nerve Injury',inputName:'nerveInjuryInput',rules:[{required:true,message:'please choose Yes or No'}]},
    {type:'input',name:'other',label:'Other',inputName:'otherInput',rules:[{required:true,message:'please choose Yes or No'}]},
  ]
  return(
    <div className='injury-history'>
      <RegistryTitle step={4} />
      <div className='wrapper'>
        <div className='injury-history-title'>
          Do you currently or have you suffered from any of the following in the past 12 months?
        </div>
        <div className='tip'>if yes, please give a location(where relevant)</div>
      <Form
        // layout='horizontal'
        name='form'
        onFinish={(values)=>{navigate('/registry/injury1',{state:{...state,...values}})}}
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
  )
}

export default InjuryHistory