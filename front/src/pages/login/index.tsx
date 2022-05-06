import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Form,Input,Button,Toast} from 'antd-mobile';
import { MailOutline,LockFill   } from 'antd-mobile-icons'
import './index.scss'
const Login = ()=>{
  const navigator = useNavigate();
  return (
    <div className='login'>
      <div className="logo">
        <img src={require('../../image/logo.png')} alt="" />
      </div>
      <div className="login-title">Injury Survelliance Application</div>
      <Form
      onFinish={(values)=>{
        console.log(values);
        const {email,password} = values;
        if(false){
          Toast.show({
            icon: 'fail',
            content: 'The account or password is incorrect',
          })
        }else{
          navigator('/home')
        }
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
        <div className='no-account'>
          <p>Don`t have an account?</p>
          <span onClick={()=>{navigator('/registry')}}>Register</span>
        </div>
        <div className='coach-account'>
          <p>Are you a Coach? Sign in <span>Here</span></p>
          
        </div>
    </div>
  )
}

export default Login;