import React,{useState} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import {Form,Input,Button,DatePicker,Radio,Space} from 'antd-mobile';
import RegistryTitle from '../RegistryTitle';
import dayjs from 'dayjs'
import './index.scss'
const DetailsComponent = ()=>{
  const navigate = useNavigate();
  const location = useLocation();
  const {state} = location;
  const [pickerVisible, setPickerVisible] = useState(false);
  const formArray = [
          {type:'input',name:'surname',label:'Surname',rules:[{required:true,message:'Please Enter your Surname'}],placeholder:'Please Enter your Surname'},
          {type:'input',name:'givenName',label:'Given Name',rules:[{required:true,message:'Please Enter your Given Name'}],placeholder:'Please Enter your Given Name'},
          {type:'datepicker',name:'birthday',label:'Birthday',rules:[{required:true,message:'Please Enter your Date of Birth'}],placeholder:'Please Enter your Date of Birth'},
          {type:'radio',name:'ethicBackground',label:'EthicBackground',rules:[{required:true,message:'Please choose your ethic background'}],placeholder:'Please choose your ethic background'},
          {type:'input',name:'phone',label:'Phone',rules:[{required:true,message:'Please Enter your phone number'}],placeholder:'Please Enter your phone number'},
          {type:'input',name:'address',label:'Address',rules:[{required:true,message:'Please Enter your Address'}],placeholder:'Please Enter your Address'},
          {type:'input',name:'country',label:'Country',rules:[{required:true,message:'Please Enter your country of Birth'}],placeholder:'Please Enter your country of Birth'},
        ]
  return (
    <div className='details-component'>
      <RegistryTitle step={1} />
        <Form 
          name='form' 
          onFinish={(values)=>{navigate('/registry/history',{state:{...values,...state}})}}
          footer={<Button style={{backgroundColor:'#1DB860'}} block type='submit' color='primary' size='large'>Continue</Button>}>
          {formArray.map(item=>{
            if(item.type==='input'){
              return (
                <Form.Item key={item.name} name={item.name} label={item.label} rules={item.rules}>
                  <Input placeholder={item.placeholder} />
                </Form.Item>
              )
            }
            if(item.type === 'datepicker'){
              return (
                <Form.Item key={item.name} name={item.name} label={item.label} trigger='onConfirm' onClick={() => {setPickerVisible(true)}} rules={item.rules}>
                  <DatePicker min={new Date('1900-01-01')} max={new Date('2122-01-01')}  visible={pickerVisible} onClose={() => {setPickerVisible(false)}}>
                    {value =>value ? dayjs(value).format('YYYY-MM-DD') : item.placeholder}
                  </DatePicker>
                </Form.Item>
              )
            }
            if(item.type === 'radio'){
              return (
                <Form.Item key={item.name} name={item.name} label={item.label} rules={item.rules}>
                  <Radio.Group>
                    <Space>
                      <Radio value='American'>American</Radio>
                      <Radio value='African'>African</Radio>
                      <Radio value='European'>European</Radio>
                      <Radio value='Asian'>Asian</Radio>
                    </Space>
                  </Radio.Group>
              </Form.Item>
              )
            }
          })}
      </Form>

    </div>
  )
}


export default DetailsComponent;