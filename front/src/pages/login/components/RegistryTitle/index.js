import React from 'react';
import './index.scss'
const titleArr = [
  'Create a new account',
  'We need a few more details',
  'Medical History Information',
  'Medical History Information (cont.)',
  'Injury History Information',
  'Injury History Information (cont.)',
  'Concussion History Information',
  'Personal Information'
 ]
const subTitleArr = [
  '',
  '(1 / 6)',
  '(2 / 6)',
  '(3 / 6)',
  '(4 / 6)',
  '(5 / 6)',
  '(6 / 6)',
  ''
 ]
const RegistryTitle = ({step})=>{
  return (
    <div className="common--page-title common--page-title__large">
      <h1>
        {titleArr[step]}
        <p className="common--page-title-sub common--page-title-sub__right">
          {(subTitleArr[step] || "")}
        </p>
      </h1>
      <div className="page-title--icon-cont"></div>
    </div>
  )
}


export default RegistryTitle;