import React from 'react';
import './index.scss'
const titleArr = [
  'Create New Account',
  'We need a few more details',
  'Medical History Information',
  'Medical History Information（continued）',
  'Injury History Information',
  'Injury History Information（continued）',
  'Concussion History Information',
  'Personal Information'
 ]
const RegistryTitle = ({step})=>{
  return (
    <div className="registry-title">
      <span>{titleArr[step]}</span>
    </div>
  )
}


export default RegistryTitle;