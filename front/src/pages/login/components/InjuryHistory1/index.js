import React,{useState} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import {Form,Button,Grid } from 'antd-mobile';
import RegistryTitle from '../RegistryTitle';
import NavBarBottom from "../../../part-navBarBottom"
import './index.scss'

const InjuryHistory1 = ()=>{
  const navigate = useNavigate();
  const location = useLocation();
  const {state} = location;
  const [surgery,setSurgery] = useState('')
  const [surgeryInput,setSurgeryInput] = useState('')
  return (
    <>
      <RegistryTitle step={5} />

      <div className="common--page-main common--page-main__large-title">
        <div className='injury-history1'>
          <Form
            // layout='horizontal'
            name='form'
            onFinish={(values)=>{
              navigate('/registry/complete',{state:{...state,surgery}});
            }}
            footer={
              <Button block type='submit' color='success' size='large'>
                Continue
              </Button>
            }
          >
            <Form.Item name='describe' rules={[{required:true,message:'Please list details above, or enter "None"'}]} label='Please list any surgery(s) or reconstruction(s) you may have had, with the approximate year that this occurred'>
              <textarea value={surgery} onChange={(e)=>{setSurgery(e.target.value)}} placeholder='Enter the details here...' className='textarea' />
            </Form.Item>
            {/* <div className='form-input-wrapper'>
            <Form.Item name='describeInput'  className='input-wrapper'>
              <input value={surgeryInput} onChange={(e)=>{setSurgeryInput(e.target.value)}} className='textarea-input' />
            </Form.Item>
            <span className='unit'>year(s)</span>
            </div> */}
          </Form>
        </div>
      </div>

      <NavBarBottom homeBtnForLogin />
    </>
  )
}


export default InjuryHistory1;