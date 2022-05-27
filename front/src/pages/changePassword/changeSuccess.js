import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button} from 'antd-mobile'
import { CheckCircleFill } from 'antd-mobile-icons'
import {Card} from 'antd-mobile'
import './index.scss';

const ChangeSuccess = ()=>{
  const navigate = useNavigate();
  return (
    <div className='change-success'>
      <Card className='title-card' title='Change Password' />
      <div className='wrapper'>
        <CheckCircleFill style={{color:'#09E316',fontSize:'50px'}} />
        <p>Your password has been changed successfully!</p>
        <Button onClick={()=>{navigate('/logout')}} color='primary' fill='none'>Back to login page</Button>
      </div>

    </div>
  )
}

export default ChangeSuccess;