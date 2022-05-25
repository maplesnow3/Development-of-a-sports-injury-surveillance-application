import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Form,Input,Button,Toast} from 'antd-mobile';
import { MailOutline,LockFill   } from 'antd-mobile-icons'
import NavBarBottom from "../part-navBarBottom"
import { CalendarOutlined, StarFilled,FormOutlined, LockOutlined,UserOutlined,LogoutOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie'

import './home.css'

const Home = ()=>{
  const navigator = useNavigate()
  const userType = Cookies.get('user_type');
  if(!userType){
    Toast.show({
      icon: 'fail',
      content: 'please log in',
    })
    window.location.hash = '#/login'
    window.location.reload();
  }

  let homeMainContent = (() => {
    if (userType === "player") {
      return (
        <>
          <a className="anchor-block" href="#/record_browser/calendar">
            <div className="anchor-block--icon-cont"><CalendarOutlined /></div>
            <p className="anchor-block--text">View Report</p>
          </a>

          <a className="anchor-block" href="#/newform">
            <div className="anchor-block--icon-cont"><FormOutlined /></div>
            <p className="anchor-block--text">Create New Form</p>
          </a>

          <a className="anchor-block" href="#/change-password">
            <div className="anchor-block--icon-cont"><LockOutlined /></div>
            <p className="anchor-block--text">Change Password</p>
          </a>

          <a className="anchor-block" href="#/person-information">
            <div className="anchor-block--icon-cont"><UserOutlined /></div>
            <p className="anchor-block--text">Personal Information</p>
          </a>
        </>
      )
    } else if (userType === "coach") {
      return (
        <>
          <a className="anchor-block anchor-block__full-size" href="#/team_func/teams">
            <div className="anchor-block--icon-cont"><UserOutlined /></div>
            <p className="anchor-block--text">Team Management</p>
          </a>

          <a className="anchor-block anchor-block__full-size" href="#/change-password">
            <div className="anchor-block--icon-cont"><LockOutlined /></div>
            <p className="anchor-block--text">Change Password</p>
          </a>
        </>
      )
    } else if (userType === "admin") {
      return (<p>ADMIN HOME TODO</p>)
    } else {
      return (<div>UNKNOWN USER_TYPE - Please logout and try again</div>)
    }
  })();


  return (
    <>
      <div className="common--page-title common--page-title__large">
        <h1>
          Home
          <p className="common--page-title-sub">Please select desired functions below</p>
        </h1>
        <div className="page-title--icon-cont"></div>
      </div>

      <div className="common--page-main common--page-main__large-title">
        <div className="home--cont">
          {homeMainContent}
        </div>

      </div>

      <NavBarBottom showLogout />
    </>
  )



}
export default Home;