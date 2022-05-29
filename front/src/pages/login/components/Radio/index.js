import React, { useState } from 'react';
import {Grid,Radio,Space,TextArea,Form} from 'antd-mobile'
import './index.scss'
const RadioComponent = ({data})=>{
  const [isYes,setIsYes] = useState(false);
  return(
    <div className='radio-component'>
      <Grid columns={5} gap={8}>
        <Grid.Item span={3}>
          <Form.Item name={data.name} label={data.label} rules={data.rules}>
            <Radio.Group onChange={(e)=>{setIsYes(e==='yes')}}>
              <Space>
                <Radio className='radio-style'  value='yes'>Yes</Radio>
                <Radio className='radio-style' value='no'>No</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Grid.Item>
        {data.type==='input' &&
        <>
          <Grid.Item  span={1}>
            <Form.Item name={data.inputName}
             rules={[
               { required: isYes,message:'Required'}
              ]}
             >
              <input
                disabled={!isYes}
                className='input-style' />
            </Form.Item>
          </Grid.Item>
          <Grid.Item span={1}>{data.unit}</Grid.Item>
        </>
      }

    {data.type==='textarea' &&
      <Grid.Item>
          <Form.Item name={data.inputName} rules={[{ required: isYes,message:'Required'}]}>
            <TextArea
              disabled={!isYes}
              className='textarea-type'
              placeholder='Input here...'
            />
          </Form.Item>
      </Grid.Item>}
  </Grid>

    </div>
  )
}

export default RadioComponent;