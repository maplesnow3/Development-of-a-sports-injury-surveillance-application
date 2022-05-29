import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import {Form,Button} from 'antd-mobile';
import RegistryTitle from '../RegistryTitle';
import RadioComponent from '../Radio';
import NavBarBottom from "../../../part-navBarBottom"

import './index.scss'

const InjuryHistory = ()=>{
  const navigate = useNavigate();
  const location = useLocation();
  const {state} = location;
  const dataArray = [
    {type:'input',name:'muscleStrain',label:'Muscle Strain',inputName:'muscleStrainInput',rules:[{required:true,message:'Please choose Yes/No'}]},
    {type:'input',name:'ligamentSprain',label:'Ligament Sprain',inputName:'ligamentSprainInput',rules:[{required:true,message:'Please choose Yes/No'}]},
    {type:'input',name:'brokenBones',label:'Broken Bones',inputName:'brokenBonesInput',rules:[{required:true,message:'Please choose Yes/No'}]},
    {type:'input',name:'dislocationSubluxation',label:'Dislocation subluxation',inputName:'dislocationSubluxationInput',rules:[{required:true,message:'Please choose Yes/No'}]},
    {type:'input',name:'meniscusCartilage',label:'Meniscus or cartilage lesion',inputName:'meniscusCartilageInput',rules:[{required:true,message:'Please choose Yes/No'}]},
    {type:'input',name:'tendonInjury',label:'Tendon injury',inputName:'tendonInjuryInput',rules:[{required:true,message:'Please choose Yes/No'}]},
    {type:'input',name:'nerveInjury',label:'Nerve Injury',inputName:'nerveInjuryInput',rules:[{required:true,message:'Please choose Yes/No'}]},
    {type:'input',name:'other',label:'Other',inputName:'otherInput',rules:[{required:true,message:'Please choose Yes/No'}]},
  ]
  return(
    <>
      <RegistryTitle step={4} />

      <div className="common--page-main common--page-main__large-title">
        <div className='injury-history'>
          <p className="instruction-text">
            Do you currently or have you suffered from any of the following in the past 12 months?<br />
            If yes, please give us a location (where relevant).
          </p>
          <Form
            // layout='horizontal'
            name='form'
            onFinish={(values)=>{navigate('/registry/injury1',{state:{...state,...values}})}}
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

export default InjuryHistory