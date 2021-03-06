// TODO: UNUSED - REMOVE LATER

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Form,Input,Button,Toast} from 'antd-mobile';
import { MailOutline,LockFill   } from 'antd-mobile-icons';
import {login} from '../../api';
import Cookies from 'js-cookie'
import './index.scss'
const Login = ()=>{
  const navigator = useNavigate();
  const loginFun = async (data)=>{
    let res = await login({account:data.email,password:data.password});
    if(res.status=="failure" && res.message !== "Already logged in"){
      Toast.show({
        icon: 'fail',
        content: res.message,
      })
      return
    }else{
      Cookies.set('user_id',res.user_id  || "");
      Cookies.set('user_type',res.user_type || "") ;
      navigator('/home')
    }
  }
  return (
    <div className='login'>
      <div className="logo">
        <img src={require('../../image/logo.png')} alt="" />
      </div>
      <div className="login-title">Injury Survelliance Application</div>
      <div style={{textAlign:'center',fontSize:'24px',color:'#fff',fontWeight:'600'}}>admin</div>
      <Form
      onFinish={(values)=>{
        console.log(values);
        loginFun(values)
      }}
      footer={
        <Button style={{backgroundColor:'#09E316'}} block type='submit' color='primary' size='large'>
          Sign In
        </Button>
      }
       layout='horizontal'>
          <Form.Item
            name='email'
            rules={[
              { required: true,message:'please enter your email' },
              { type: 'string', min: 6,message:'contains at least 6 characters' },
              { type: 'email',message:'incorrect email format' },
            ]}
            label={<MailOutline style={{position:'relative',bottom:"10px"}}
             fontSize={22} color='#fff' />}>
            <Input  placeholder='Enter email address' clearable />
          </Form.Item>
          <Form.Item
              name='password'
              rules={[
                { required: true,message:'please enter your password' },
                { min: 6,message:'contains at least 6 characters' },
              ]} label={<LockFill style={{position:'relative',bottom:"10px"}}
              fontSize={22} color='#fff' />}
            >
            <Input placeholder='Enter Password' clearable type='password' />
          </Form.Item>
        </Form>
    </div>
  )
}

export default Login;