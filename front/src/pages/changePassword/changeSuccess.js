import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button} from 'antd-mobile'
import { CheckCircleFill } from 'antd-mobile-icons'
import { LockOutlined } from '@ant-design/icons';
import {Card} from 'antd-mobile'
import './index.scss';
import NavBarBottom from "../part-navBarBottom"

const ChangeSuccess = ()=>{
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
        <div className="change-pw-success--cont">
          <div className="change-pw-success--icon">
            <CheckCircleFill />
          </div>
          <p className="change-pw-success--text">
            Your password has been changed successfully!
          </p>
          <p className="change-pw-success--text">
            <Button onClick={()=>{navigate('/logout')}} color='primary' fill='none'>Back to login page</Button>
          </p>
        </div>
      </div>

      <NavBarBottom />
    </>
  )
}

export default ChangeSuccess;