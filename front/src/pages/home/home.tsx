import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Form,Input,Button,Toast} from 'antd-mobile';
import { MailOutline,LockFill   } from 'antd-mobile-icons'
import './home.scss'
import { CalendarOutlined, StarFilled,FormOutlined, LockOutlined,UserOutlined,LogoutOutlined } from '@ant-design/icons';
const Home = ()=>{
  const navigator = useNavigate()
  return (
    <div className='home'>
        <meta name="viewport" content="height= device-height, width=device-width, initial-scale=1"></meta>
      <div className= 'title'><br></br><br></br>  Welcome to Home 
      </div>
      <div className = 'container'>
        <div id = 'one'><a href="#" title="View  Report"><CalendarOutlined style={{ marginTop:20, fontSize: '1000%', color: '#fff' }}/></a>
        <p>View Report</p>
        </div>
        <div id = 'two'><a href="#"  title="New Form"><FormOutlined style={{ marginTop:20, fontSize: '1000%', color: '#fff' }}/></a>
        <p>New Form</p>
        </div>
        <div id = 'three'><a href="#" title="Change Password"><LockOutlined style={{ marginTop:20, fontSize: '1000%', color: '#fff'}}/></a>
        <p>Change Password</p>
        </div>
        <div id = 'four'><a href="/personinfo"  title="Personal Info" ><UserOutlined style={{ textAlign:'center',marginTop:20, fontSize: '1000%', color: '#fff' }}/></a>
        <p>Personal Info</p>
        </div>    
      </div>
      <div className = 'bottom'> 
      <a href="/login"  id = 'bottom' ><LogoutOutlined style={{ textAlign:'center',marginTop:16,marginRight:15, fontSize: '400%', color: '#fff' }}/></a>
      </div>
    </div>
  )
}
export default Home;