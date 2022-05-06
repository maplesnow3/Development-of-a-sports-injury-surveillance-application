import React from 'react';
import {Form,Input,Button,Toast} from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
const CreateAccount = ()=>{
  const navigate = useNavigate();
  return (<div className='create-account'>
      <Form 
        onFinish={(values)=>{
          const {email,password,rePassword} = values;
          if(password !== rePassword){
            Toast.show({
              icon: 'fail',
              content: 'The entered passwords are inconsistent！',
            })
          }else{
            navigate('/registry/detail',{state:{email,password}})
          }
        }}
        footer={
          <Button style={{backgroundColor:'#1DB860'}} block type='submit' color='primary' size='large'>
            Continue
          </Button>
        }>
        <Form.Item
          name='email'
          label='email'
          rules={[
            { required: true,message:'please enter your email' },
            { type: 'string', min: 6,message:'contains at least 6 characters' },
            { type: 'email',message:'incorrect email format' },
          ]}
        >
          <Input placeholder='Please Enter your email' />
        </Form.Item>
        <Form.Item
          name='password'
          label='password'
          rules={[
            { required: true,message:'please enter your password' },
            { min: 6,message:'contains at least 6 characters' },
          ]}
        >
          <Input type='password' placeholder='Please Enter your password' />
        </Form.Item>
        <Form.Item
          name='rePassword'
          label='rePassword'
          rules={[
            { required: true,message:'Please Re-enter your password' },
            { min: 6,message:'contains at least 6 characters' },
          ]}
        >
          <Input type='password' placeholder='Please Re-enter your password' />
        </Form.Item>
        </Form>
    </div>)
}

export default CreateAccount;