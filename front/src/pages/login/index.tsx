import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Form,Input,Button,Toast} from 'antd-mobile';
import { MailOutline,LockFill   } from 'antd-mobile-icons';
import {login} from '../../api';
import Cookies from 'js-cookie'
import './index.scss'
const Login = ()=>{
  const navigator = useNavigate();
  const loginFun = async (data:any)=>{
    let res:any = await login({account:data.email,password:data.password});
    if(res.status=="failure" && res.message !== "Already logged in"){
      Toast.show({
        icon: 'fail',
        content: res.message,
      })
      return
    }else{
      Cookies.set('user_id',res.user_id  || "", {expires: 14});
      Cookies.set('user_type',res.user_type || "", {expires: 14});
      navigator('/home')
    }
  }
  return (
    <div className="login--page-cont">

      <div className='login--page-title'>
        <div className='title--logo-cont'>
          <img src={require('../../image/logo.png')} alt="" />
        </div>
        <div className="title--text">Injury Survelliance Application</div>
      </div>

      <div className="login--login-form">
        <Form
          onFinish={(values) => {
            console.log(values);
            loginFun(values)
          }}
          footer={
            <Button block type='submit' color='primary' size='large'>
              Sign In
            </Button>
          }
          layout='horizontal'>
          <Form.Item
            name='email'
            rules={[
              { required: true, message: 'Please enter your email' },
              // { type: 'string', min: 6, message: 'contains at least 6 characters' },
              { type: 'email', message: 'Incorrect email format provided' },
            ]}
            label={<MailOutline style={{ position: 'relative', bottom: "10px" }}
              fontSize={22} color='#fff' />}>
            <Input placeholder='Enter email address here' clearable />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 6, message: 'Requires at least 6 characters' },
            ]} label={<LockFill style={{ position: 'relative', bottom: "10px" }}
              fontSize={22} color='#fff' />}
          >
            <Input placeholder='Enter Password here' clearable type='password' />
          </Form.Item>
        </Form>
      </div>

      <div className="login--no-account-prompt">
        <p>
          Don`t have an account?
          <a onClick={()=>{navigator('/registry')}}>Register here</a>
        </p>
        <p>
          Or<a onClick={()=>{navigator('/registry',{state:{type:'coach'}})}}>register as a coach</a>
        </p>
      </div>

    </div>
  )
}

export default Login;