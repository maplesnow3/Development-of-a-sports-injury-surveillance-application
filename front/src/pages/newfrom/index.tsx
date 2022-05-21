import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss'
import InjureForm from './Component/injureForm.js'
import ConcussionForm from './Component/concussionForm.js'
import { Collapse } from 'antd-mobile'

const Newform = ()=>{
  const navigator = useNavigate()
  return (
   
      
      <div className='new_form'>
        <div className='top_bar'>New Form</div>
          <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel key='1' title='Injure Form'>
          <InjureForm />
          </Collapse.Panel>
          <Collapse.Panel key='2' title='Concussion Form(Optional)'>
          <ConcussionForm />
          </Collapse.Panel>
          
        </Collapse> 

    </div>
  )
}

export default Newform;