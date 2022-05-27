import React from 'react';
import {message} from "antd";
import { Card, Toast, Button,Form,Input } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import './index.scss'

let bcrypt = require("bcryptjs");

const ChangePassword = ()=>{
  const navigate = useNavigate();

  return (
    <div className='change-password'>
        <Card className='title-card' title='Change Password' />
        <Form
        name='form'
        onFinish={(values)=>{
          (() => {
            let valuesHashed = {
              old_pw: bcrypt.hashSync(values.old_pw, "$2a$06$AGM/cv8Hw/w4bkj8PJsM0."),
              new_pw: bcrypt.hashSync(values.new_pw, "$2a$06$AGM/cv8Hw/w4bkj8PJsM0.")
            }

            let xhr = new XMLHttpRequest();
            xhr.onload = function (event) {
              if (this.status === 200) {
                let resJson = JSON.parse(this.responseText);

                if (resJson.status !== "success") {
                  message.error("Failed to change - " + (resJson.message || "Please try later"));
                } else {
                  navigate('/change-password-success');
                  // window.location.reload();
                }
              } else {
                message.error("Failed to change - Please try later");
              }
            };
            xhr.onerror = function () {
              message.error("Failed to change - Please try later");
            };
            xhr.withCredentials = true;
            xhr.open('POST', '/api/user/change_password', true);
            xhr.send(JSON.stringify(valuesHashed));
          })();

        }}
        footer={
          <Button block type='submit' style={{backgroundColor:'#09E316'}} color='primary' size='large'>
            Confirm
          </Button>
        }
      >
        <Form.Item name='old_pw' label='Old Password' rules={[{ required: true,message:'please enter old password' }]}>
          <Input type='password' placeholder='please enter old password' />
        </Form.Item>
        <Form.Item name='new_pw' label='New Password' rules={[{ required: true,message:'please enter new password' }]}>
          <Input type='password' placeholder='please enter new password' />
        </Form.Item>
      </Form>
    </div>
  )
}


export default ChangePassword;