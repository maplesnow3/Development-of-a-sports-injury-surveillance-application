import React, { useState } from 'react';
import { Card, Toast, Button,Form,Input } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import {resetPassword} from '../../api'
import { UnlockOutlined } from '@ant-design/icons';
import NavBarBottom from "../part-navBarBottom"

import './index.scss'

const ResetPassword = ()=>{
  const navigate = useNavigate();
  const [newPassword,setNewPassword] = useState('')

  return (
    <>
      <div className="common--page-title common--page-title__large">
        <h1>
          Reset Password
          <p className="common--page-title-sub">Reset the password for a user</p>
        </h1>
        <div className="page-title--icon-cont"><UnlockOutlined /></div>
      </div>

      <div className="common--page-main common--page-main__large-title">
        <div className="reset-pw--cont">
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
                  content:'Reset successfully!'
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
              !newPassword?<Button block type='submit' color='success' size='large'>
                Reset
              </Button>:null
            }
          >
            <Form.Item name='email' label='Email Address of the Account:' rules={[{ required: true,message:'Please specify an account' }]}>
              <Input type='email' placeholder='Enter an email address here...' />
            </Form.Item>
            {newPassword && <Form.Item label='New Random Password:'>
              {/* <Input className="reset-pw--new-pw-input" value={newPassword} disabled /> */}
              <p className="reset-pw--new-pw-input">{newPassword}</p>
              <p className="reset-pw--new-pw-prompt">Please let the user change it as soon as possible!</p>
            </Form.Item>}
          </Form>
        </div>
      </div>

      <NavBarBottom />
    </>
  )
}


export default ResetPassword;