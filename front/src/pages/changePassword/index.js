import React from 'react';
import { Card, Toast, Button,Form,Input } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';

import './index.scss'

const ChangePassword = ()=>{
  const navigate = useNavigate();
  
  return (
    <div className='change-password'>
        <Card className='title-card' title='Change Password' />
        <Form
        name='form'
        onFinish={(values)=>{
          console.log(values);
          navigate('/change-password-success')
        }}
        footer={
          <Button block type='submit' style={{backgroundColor:'#09E316'}} color='primary' size='large'>
            Confirm
          </Button>
        }
      >
        <Form.Item name='oldPassword' label='Old Password' rules={[{ required: true,message:'please enter old password' }]}>
          <Input type='password' placeholder='please enter old password' />
        </Form.Item>
        <Form.Item name='newPassword' label='New Password' rules={[{ required: true,message:'please enter new password' }]}>
          <Input type='password' placeholder='please enter new password' />
        </Form.Item>
      </Form>
    </div>
  )
}


export default ChangePassword;