import React,{useState} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import {Form,Button} from 'antd-mobile';
import RegistryTitle from '../RegistryTitle';
import './index.scss'

const InjuryHistory1 = ()=>{
  const navigate = useNavigate();
  const location = useLocation();
  const {state} = location;
  const [surgery,setSurgery] = useState('')
  return (
    <div className='injury-history1'>
      <RegistryTitle step={5} />
      <div className='wrapper'>
      <Form
        // layout='horizontal'
        name='form'
        onFinish={(values)=>{
          navigate('/registry/complete',{state:{...state,surgery}});
        }}
        footer={
          <Button style={{backgroundColor:'#1DB860'}} block type='submit' color='primary' size='large'>
            Continue
          </Button>
        }
      >
      <Form.Item name='describe' rules={[{required:true,message:'please enter content'}]} label='Please list any surgery(s) or reconstruction(s) you may have had and give the approximate year that this occurred'>
        <textarea value={surgery} onChange={(e)=>{setSurgery(e.target.value)}} placeholder='Enter the detail of each surgery/reconstruction you have hand with the approximate year' className='textarea' />
      </Form.Item>
      </Form>
      </div>
    </div>
  )
}


export default InjuryHistory1;