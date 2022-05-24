import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Form,Input,Button,Toast} from 'antd-mobile';
import { MailOutline,LockFill   } from 'antd-mobile-icons'
import './home.scss'
import ChangePassword from '../changePassword';
import { CalendarOutlined, StarFilled,FormOutlined, LockOutlined,UserOutlined,LogoutOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie'

const Home = ()=>{
  const navigator = useNavigate()
  const userType = Cookies.get('user_type');
  if(!userType){
    Toast.show({
      icon: 'fail',
      content: 'please log in',
    })
    // window.open('#/login','__self')
    window.location.hash = '#/login'
    window.location.reload();
  }

  if (userType === "player") {
    return (
      <div className='home'>
          <meta name="viewport" content="height= device-height, width=device-width, initial-scale=1"></meta>
        <div className= 'title'><br></br><br></br>  Welcome to Home
        </div>
        <div className = 'container'>
          <div className = 'home-indi-one'><a href="#/record_browser/calendar" title="View  Report"><CalendarOutlined style={{ marginTop:20, fontSize: '1000%', color: '#fff' }}/></a>
          <p>View Report</p>
          </div>
          <div className = 'home-indi-two'><a href="#/newform"  title="New Form"><FormOutlined style={{ marginTop:20, fontSize: '1000%', color: '#fff' }}/></a>
          <p>New Form</p>
          </div>
          <div className = 'home-indi-three'><a href="#/change-password" title="Change Password"><LockOutlined style={{ marginTop:20, fontSize: '1000%', color: '#fff'}}/></a>
          <p>Change Password</p>
          </div>
          <div className = 'home-indi-four'><a href="#/person-information"  title="Personal Info" ><UserOutlined style={{ textAlign:'center',marginTop:20, fontSize: '1000%', color: '#fff' }}/></a>
          <p>Personal Info</p>
          </div>
        </div>
        <div className = 'bottom'>
          <a href="#/logout"  className = 'home-logout' ><LogoutOutlined style={{ textAlign:'center',marginTop:16,marginRight:15, fontSize: '400%', color: '#fff' }}/></a>
        </div>
      </div>
    )
  } else if (userType === "coach") {
    return (
      <div className='home'>
        <meta name="viewport" content="height= device-height, width=device-width, initial-scale=1"></meta>
        <div className='title'><br></br><br></br>  Welcome to Home
      </div>
        <div className='container'>
          <div className='home-indi-one'><a href="#/record_browser/calendar" title="View  Report"><CalendarOutlined style={{ marginTop: 20, fontSize: '1000%', color: '#fff' }} /></a>
            <p>COACH HOME TODO</p>
          </div>
          <div className='home-indi-two'><a href="#/newform" title="New Form"><FormOutlined style={{ marginTop: 20, fontSize: '1000%', color: '#fff' }} /></a>
            <p>COACH HOME TODO</p>
          </div>
          <div className='home-indi-three'><a href="#/change-password" title="Change Password"><LockOutlined style={{ marginTop: 20, fontSize: '1000%', color: '#fff' }} /></a>
            <p>Change Password</p>
          </div>
          <div className='home-indi-four'><a href="#/person-information" title="Personal Info" ><UserOutlined style={{ textAlign: 'center', marginTop: 20, fontSize: '1000%', color: '#fff' }} /></a>
            <p>COACH HOME TODO</p>
          </div>
        </div>
        <div className='bottom'>
          <a href="#/logout" className='home-logout' ><LogoutOutlined style={{ textAlign: 'center', marginTop: 16, marginRight: 15, fontSize: '400%', color: '#fff' }} /></a>
        </div>
      </div>
    )
  } else if (userType === "admin") {
    return (<p>ADMIN HOME TODO</p>)
  } else {
    return (<div>UNKNOWN USER_TYPE</div>)
  }


}
export default Home;