import React,{useState} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import {Form,Input,Button,DatePicker,Radio,Space,CheckList,Popup} from 'antd-mobile';
import RegistryTitle from '../RegistryTitle';
import dayjs from 'dayjs';
import country1 from 'country-list-js';
import './index.scss'
let countries =[]
for(let k in country1.all){
  
  countries.push(country1.all[k].name)
}
const DetailsComponent = ()=>{
  const navigate = useNavigate();
  const location = useLocation();
  const {state} = location;
  const [pickerVisible, setPickerVisible] = useState(false);
  const [othersValue,setOthersValue] = useState('');
  const [disabled,setDiasbled] = useState(true);
  const [visible,setVisible]=useState(false);
  const [selectCountry,setSelectCountry] = useState('')
  const formArray = [
          {type:'input',name:'surname',label:'Surname',rules:[{required:true,message:'Please Enter your Surname'}],placeholder:'Please Enter your Surname'},
          {type:'input',name:'givenName',label:'Given Name',rules:[{required:true,message:'Please Enter your Given Name'}],placeholder:'Please Enter your Given Name'},
          {type:'datepicker',name:'birthday',label:'Birthday',rules:[{required:true,message:'Please Enter your Date of Birth'}],placeholder:'Please Enter your Date of Birth'},
          {type:'radio',name:'ethicBackground',label:'EthicBackground',rules:[{required:true,message:'Please choose your ethic background'}],placeholder:'Please choose your ethic background'},
          {type:'input',name:'phone',label:'Phone',rules:[{required:true,message:'Please Enter your phone number'}],placeholder:'Please Enter your phone number'},
          {type:'input',name:'address',label:'Address',rules:[{required:true,message:'Please Enter your Address'}],placeholder:'Please Enter your Address'},
          {type:'select',name:'country',label:'Country',placeholder:'Please Select your country of Birth'},
        ]
  return (
    <div className='details-component'>
      <RegistryTitle step={1} />
        <Form 
          name='form' 
          onFinish={(values)=>{
            values.country=selectCountry
            if(values.ethicBackground==='other'){
              values.ethicBackground = othersValue;
            }
           navigate('/registry/history',{state:{...values,...state}})
          }
          }
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
                  <Radio.Group onChange={(e)=>{ if(e!=='other'){setOthersValue('')};setDiasbled(e!=='other')}}>
                    <Space>
                      <Radio value='African'>African</Radio>
                      <Radio value='Afro-American'>Afro-American</Radio>
                      <Radio value='Asian'>Asian</Radio>
                      <Radio value='Caucasian'>Caucasian</Radio>
                      </Space>
                      <Space>
                      <Radio value='Indigenous Australian'>Indigenous Australian</Radio>
                      <Radio value='Maori'>Maori</Radio>
                      <Radio value='Middle Eastern'>Middle Eastern</Radio>
                      </Space>
                      <Space>
                      <Radio value='Oceanian(Pacific Islander)'>Oceanian(Pacific Islander)</Radio>
                      <Radio value='other'></Radio><>other &nbsp;:&nbsp;<Input onChange={(e)=>{
                        setOthersValue(e)
                      }} value={othersValue} disabled={disabled} style={{display:'inline-block', width:'100px',border:'1px solid #ccc',zIndex:9999}} /></>
                    </Space>
                  </Radio.Group>
              </Form.Item>
              )
            }
            if(item.type==='select'){
              return (
                <Form.Item name={item.name} key={item.name} label={<div className={selectCountry?'label-start':''} onClick={()=>{setVisible(true)}}>{item.label} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {selectCountry}</div>} rules={[{required:!selectCountry,message:'Please Select your country of Birth'}]}>
                   <Popup
                    visible={visible}
                    onMaskClick={() => {
                      setVisible(false)
                    }}
                    destroyOnClose
                  >
                    <div className='checkListContainer'>
                      <CheckList
                        className='myCheckList'
                        value={selectCountry ? [selectCountry] : []}
                        onChange={val => {
                          setVisible(false);
                          setSelectCountry(val[0])
                        }}
                      >
                        {countries.map(item => (
                          <CheckList.Item key={item} value={item}>
                            {item}
                          </CheckList.Item>
                        ))}
                      </CheckList>
                    </div>
                  </Popup>
                </Form.Item>
              )
            }
          })}
      </Form>

    </div>
  )
}


export default DetailsComponent;