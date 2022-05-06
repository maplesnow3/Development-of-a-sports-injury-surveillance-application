import React from 'react';
import {Form,Button,Input} from 'antd-mobile';
import { useNavigate,useLocation } from 'react-router-dom';
import RadioComponent from '../RadioComponent';
import RegistryTitle from '../RegistryTitle';
import './index.scss'
const ConcussionHistory = ()=>{
  const navigate = useNavigate();
  const location = useLocation();
  const {state} = location;
  const dataArray = [
    {type:'radio',name:'concussion',label:'Where diagnosed with a CONCUSSION in the past 12 months',inputName:'concussionInput',rules:[{required:true,message:'please choose Yes or No'}]},
    {type:'radio',name:'pop',label:'If Yes,these questions will pop up Was the concussion sport related',inputName:'popInput',rules:[{required:true,message:'please choose Yes or No'}]},
    {type:'input',name:'suffer',label:'How many concussions did you suffer in the past 12 months?',inputName:'sufferInput',unit:'time(s)',rules:[{required:true,message:'please enter content'}]},
    {type:'radio',name:'doctor',label:'After the concussions did you see a doctor or go to hospital',rules:[{required:true,message:'please choose Yes or No'}]},
    {type:'input',name:'week',label:'How long did it take from you to recover from your concussion',inputName:'weekInput',unit:'week(s)',rules:[{required:true,message:'please enter content'}]},
    {type:'radio',name:'serious',label:'Did you experience any serious symptoms after the concussion?',inputName:'seriousInput',rules:[{required:true,message:'please choose Yes or No'}]},
  ]
  return (
    <div className='concussion-history'>
      <RegistryTitle step={6} />
      <Form
        // layout='horizontal'
        name='form'
        onFinish={(values)=>{
          console.log({...state,...values});
          // navigate()
        }}
        footer={
          <Button style={{backgroundColor:'#1DB860'}} block type='submit' color='primary' size='large'>
            Complete
          </Button>
        }
      >
        {dataArray.map(item=> <RadioComponent key={item.name} data={item} />)}
      <Form.Item name='describe' rules={[{required:true,message:'please enter content'}]} label='if yes,can you describe those symptoms?'>
        <Input placeholder='single input' />
      </Form.Item>
      </Form>
    </div>
  )
}


export default ConcussionHistory;