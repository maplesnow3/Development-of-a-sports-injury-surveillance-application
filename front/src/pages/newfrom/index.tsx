import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss'
import InjureForm from './Component/injureForm.js'


const Newform = ()=>{
  const navigator = useNavigate()
  return (
    <div className='new_form'>
      <div className='top_bar'>Create a New Form</div>
      <InjureForm />
    </div>
  )
}

export default Newform;
