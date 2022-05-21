import React from 'react';
import {Radio,Space,Form} from 'antd-mobile'
import './index.scss'
const RadioComponent = ({data,isDisable})=>{
  return(
    <div className='radio-component'>
    {data.type==='radio' && 
      <Form.Item name={data.name} label={data.label} rules={data.rules}>
        <Radio.Group onChange={(e)=>{
          if(data.setDisabled){
            isDisable(e)
          }}}>
          <Space direction='horizontal'>
            <Radio className='radio-style'  value='yes'>Yes</Radio>
            <Radio className='radio-style' value='no'>No</Radio>
          </Space>
        </Radio.Group>
    </Form.Item>
    }
    {data.type==='input' && 
    <div className='input-wrapper'>
      <Form.Item name={data.name} label={data.label} rules={data.rules}>
      <input
       type='number' 
       className='input-style' />
       </Form.Item>
      <span className='unit'>{data.unit}</span>
    </div>
    }
    </div>
  )
}

export default RadioComponent;