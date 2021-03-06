import React,{useState} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import {Form,Input,Button,DatePicker,Radio,Space,CheckList,Popup} from 'antd-mobile';
import RegistryTitle from '../RegistryTitle';
import dayjs from 'dayjs';
import country1 from 'country-list-js';
import NavBarBottom from "../../../part-navBarBottom"
import './index.scss'
let countries = country1.names().sort();

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
          {type:'input',name:'surname',label:'Surname',rules:[{required:true,message:'Please enter your surname'}],placeholder:'Please enter your surname'},
          {type:'input',name:'givenName',label:'Given Name',rules:[{required:true,message:'Please enter your given name'}],placeholder:'Please enter your given name'},
          {type:'datepicker',name:'birthday',label:'Birthday',rules:[{required:true,message:'Please select your date of birth'}],placeholder:'Tap here to select...'},
          {type:'radio',name:'ethicBackground',label:'Ethic Background',rules:[{required:true,message:'Please choose your ethic background'}],placeholder:'Please choose your ethic background'},
          {type:'input',name:'phone',label:'Phone',rules:[{required:true,message:'Please enter your phone number'}],placeholder:'Please enter your phone number'},
          {type:'input',name:'address',label:'Address',rules:[{required:true,message:'Please enter your address'}],placeholder:'Please enter your address'},
          {type:'select',name:'country',label:'Country', placeholder:'Please select your country of birth'},
        ]
  return (
    <>
      <RegistryTitle step={1} />
      <div className="common--page-main common--page-main__large-title">
        <div className='details-component'>
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
              footer={<Button block type='submit' color='success' size='large'>Continue</Button>}>
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
                    <Form.Item className="details-component--datepicker" key={item.name} name={item.name} label={item.label} trigger='onConfirm' onClick={() => {setPickerVisible(true)}} rules={item.rules}>
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
                        <Space direction="vertical">
                          <Radio value='African'>African</Radio>
                          <Radio value='Afro-American'>Afro-American</Radio>
                          <Radio value='Asian'>Asian</Radio>
                          <Radio value='Caucasian'>Caucasian</Radio>
                          <Radio value='Indigenous Australian'>Indigenous Australian</Radio>
                          <Radio value='Maori'>Maori</Radio>
                          <Radio value='Middle Eastern'>Middle Eastern</Radio>
                          <Radio value='Oceanian (Pacific Islander)'>Oceanian (Pacific Islander)</Radio>
                          <Radio value='other'>Other - please specify below:</Radio>
                          <Input
                            className="details-comp--ethic-bg-other-input"
                            onChange={(e)=>{
                              setOthersValue(e)
                            }}
                            value={othersValue}
                            disabled={disabled}
                            // style={{display:'inline-block', width:'100px',border:'1px solid #ccc',zIndex:9999}}
                          />
                        </Space>
                      </Radio.Group>
                  </Form.Item>
                  )
                }
                if(item.type==='select'){
                  return (
                    <Form.Item name={item.name} key={item.name} label={<div className={selectCountry?'label-start':''} onClick={()=>{setVisible(true)}}>{item.label} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {selectCountry||"Tap here to select..."}</div>} rules={[{required:!selectCountry,message:'Please select your country of birth'}]}>
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
      </div>

      <NavBarBottom homeBtnForLogin />
    </>
  )
}


export default DetailsComponent;