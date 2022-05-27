import React, { useState } from 'react';
import { Card, Toast, Button,Form,Input } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import {resetPassword} from '../../api'
import './index.scss'

const ResetPassword = ()=>{
  const navigate = useNavigate();
  const [newPassword,setNewPassword] = useState('')
  
  return (
    <div className='change-password'>
        <Card className='title-card' title='Reset Password' />
        <Form
        name='form'
        onFinish={async(values)=>{
          console.log(values);
          console.log(values);
          const res = await resetPassword({account:values.email});
          console.log(res);
          if(res.status==='success'){
            Toast.show({
              type:'success',
              content:'reset successfully!'
            })
            setNewPassword(res.new_password)
          }else{
            Toast.show({
              type:'fail',
              content:res.message
            })
          }
          // navigate('/change-password-success')
        }}
        footer={
          !newPassword?<Button block type='submit' style={{backgroundColor:'#09E316'}} color='primary' size='large'>
            Confirm
          </Button>:null
        }
      >
        <Form.Item name='email' label='Email address' rules={[{ required: true,message:'please enter email address' }]}>
          <Input type='email' placeholder='please enter email address' />
        </Form.Item>
        {newPassword && <Form.Item  label='New Password'>
          <Input value={newPassword} disabled />
        </Form.Item>}
      </Form>
    </div>
  )
}


export default ResetPassword;