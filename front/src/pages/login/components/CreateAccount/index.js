import React, { useState } from 'react';
import {Form,Input,Button,Toast} from 'antd-mobile';
import { useNavigate,useLocation} from 'react-router-dom';
import {registry} from '../../../../api';
const CreateAccount = ()=>{
  const navigate = useNavigate();
  const location = useLocation();
  const {type} = location.state||{type:null};
  return (<div className='create-account'>
      <Form
        onFinish={async (values)=>{
          const {email,password,rePassword} = values;
          if(type==='coach'){
            console.log(124);
            const res = await registry({
              email,
              password,
              usertype: type,
            })

              Toast.show({
                icon: res.status==='success'?"success":'fail',
                content: res.status==='success'?'registry successfully!':res.message,
              })
              res.status==='success' && navigate('/login');
            return
          }
          if(password !== rePassword){
            Toast.show({
              icon: 'fail',
              content: 'The entered passwords are inconsistent!',
            })
          }else{
            navigate('/registry/detail',{state:{email,password}})
          }
        }}
        footer={
          <Button block type='submit' color='success' size='large'>
            {type==='coach'?'Submit':'Continue'}
          </Button>
        }>
        <Form.Item
          name='email'
          label='Email'
          rules={[
            { required: true,message:'please enter your email' },
            // { type: 'string', min: 6,message:'Requires at least 6 characters' },
            { type: 'email',message:'incorrect email format' },
          ]}
        >
          <Input placeholder='Please Enter your email' />
        </Form.Item>
        <Form.Item
          name='password'
          label='Password'
          rules={[
            { required: true,message:'please enter your password' },
            { min: 6,message:'Requires at least 6 characters' },
          ]}
        >
          <Input type='password' placeholder='Please Enter your password' />
        </Form.Item>
        <Form.Item
          name='rePassword'
          label='Re-enter Password'
          rules={[
            { required: true,message:'Please Re-enter your password' },
            { min: 6,message:'Requires at least 6 characters' },
          ]}
        >
          <Input type='password' placeholder='Please Re-enter your password' />
        </Form.Item>
        </Form>
    </div>)
}

export default CreateAccount;