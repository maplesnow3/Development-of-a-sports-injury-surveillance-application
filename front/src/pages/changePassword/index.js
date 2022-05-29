import React from 'react';
import {message} from "antd";
import { Card, Toast, Button,Form,Input } from 'antd-mobile';
import { LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './index.scss'
import NavBarBottom from "../part-navBarBottom"

let bcrypt = require("bcryptjs");

const ChangePassword = ()=>{
  const navigate = useNavigate();

  return (
    <>
      <div className="common--page-title common--page-title__large">
        <h1>
          Change Password
          <p className="common--page-title-sub">Set a new password for yourself</p>
        </h1>
        <div className="page-title--icon-cont"><LockOutlined /></div>
      </div>

      <div className="common--page-main common--page-main__large-title">
        <div className="change-pw--cont">
          <Form
            name='form'
            onFinish={(values) => {
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
              <Button block
                type='submit' color='success' size='large'
              >
                Confirm
              </Button>
            }
          >
            <Form.Item name='old_pw' label='Old Password:' rules={[{ required: true, message: 'Please enter the old password' }]}>
              <Input type='password' placeholder='Enter old password here...' />
            </Form.Item>
            <Form.Item name='new_pw' label='New Password:' rules={[{ required: true, message: 'Please enter a new password' }]}>
              <Input type='password' placeholder='Enter new password here...' />
            </Form.Item>
          </Form>
        </div>
      </div>

      <NavBarBottom />
    </>

  )
}


export default ChangePassword;