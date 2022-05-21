import React,{useState} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import {Form,Input,Button,DatePicker,Radio,Space,TextArea} from 'antd-mobile';

import { Slider, Toast } from 'antd-mobile'
import { HeartOutline } from 'antd-mobile-icons'


const ConcussionForm = ()=>{

  const toastValue = (value: number | number[]) => {
    let text = ''
    if (typeof value === 'number') {
      text = `${value}`
    } else {
      text = `[${value.join(',')}]`
    }
    Toast.show(`当前选中值为：${text}`)
    console.log(value)
  }

  const location = useLocation();
   const {state} = location;
    return (
        
    <div className='Concussion Symptom'>
      <Form
        name='form'
        onFinish={async(values)=>{
         const {
          q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,  
          headache,pressureInHead,neckPain,NauseaOrVomiting,dizziness,
          blurredVision,balanceProblems,sensitivityToLight,sensitivityToNoise,
          feelingSlowedDown,feelingLikeInAFog,dontFeelRight,difficultyConcentrating,
          difficultyRemembering,fatigueOrLowEnergy,confusion,drowsiness,moreEmotional,
          irritability,sadness,nervousOrAnxious,troubleFallingAsleep,Y_N_1,Y_N_2,
          range,rangeReason,
         } = {...state,...values}
         

         let data ={
          concussionProblems:[q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,],  
          ConcussionSymptom:[headache,pressureInHead,neckPain,NauseaOrVomiting,dizziness,
            blurredVision,balanceProblems,sensitivityToLight,sensitivityToNoise,
            feelingSlowedDown,feelingLikeInAFog,dontFeelRight,difficultyConcentrating,
            difficultyRemembering,fatigueOrLowEnergy,confusion,drowsiness,moreEmotional,
            irritability,sadness,nervousOrAnxious,troubleFallingAsleep],
       
          physicalActivity:Y_N_1,
          mentalActivity:Y_N_2,
          percentOfFeel:range,
          why:rangeReason
         }
         console.log(data)
       }} 
        footer={
          <Button style={{backgroundColor:'#1DB860'}} block type='submit' color='primary' size='large'>
            submit
          </Button>
        }
      >
<div className='questionform'>
        <p>1 Are there clinical features of a potentially serious or structural head and/or neck injury, including 
          prolonged loss of consciousness (>1 minute) requiring urgent and emergency hospital transfer?</p>
            <Form.Item name='q1' required>
            <Radio.Group name="q1" >  
            <Radio value={0}>Yes</Radio>
            <Radio value={1}>No</Radio>
            </Radio.Group>
            </Form.Item>
            <p>2 Loss of consciousness (or prolonged loss of movement of > 1 – 2 seconds) or not </p>
            <Form.Item name='q2' required>
            <Radio.Group name="q2" >  
            <Radio value={0}>Yes(Observed directly)</Radio>
            <Radio value={1}>Yes(Reported)</Radio>
            <Radio value={2}>No</Radio>
            </Radio.Group>
            </Form.Item>

            <p>3 No protective action in fall to ground (not bracing for impact/ floppy or stiff)</p>
            <Form.Item name='q3' required>
            <Radio.Group name="q3" >  
            <Radio value={0}>Yes(Observed directly)</Radio>
            <Radio value={1}>Yes(Reported)</Radio>
            <Radio value={2}>No</Radio>
            </Radio.Group>
            </Form.Item>

            <p>4 Impact seizure/convulsion/fit (stiffening or shaking of arms and/or legs on impact)</p>
            <Form.Item name='q4' required>
            <Radio.Group name="q4" >  
            <Radio value={0}>Yes(Observed directly)</Radio>
            <Radio value={1}>Yes(Reported)</Radio>
            <Radio value={2}>No</Radio>
            </Radio.Group>
            </Form.Item>

            <p>5 Confusion or disorientation</p>
            <Form.Item name='q5' required>
            <Radio.Group name="q5" >  
            <Radio value={0}>Yes(Observed directly)</Radio>
            <Radio value={1}>Yes(Reported)</Radio>
            <Radio value={2}>No</Radio>
            </Radio.Group>
            </Form.Item>

            <p>6 Memory impairment (e.g. fails Maddocks questions – refer to CRT5)</p>
            <Form.Item name='q6' required>
            <Radio.Group name="q6" >  
            <Radio value={0}>Yes(Observed directly)</Radio>
            <Radio value={1}>Yes(Reported)</Radio>
            <Radio value={2}>No</Radio>
            </Radio.Group>
            </Form.Item>

            <p>7 Balance disturbance or Clumsy (loss of control over movements) or slow to get up 
following a possible head injury (10-15 s) </p>
            <Form.Item name='q7' required>
            <Radio.Group name="q7" >  
            <Radio value={0}>Yes(Observed directly)</Radio>
            <Radio value={1}>Yes(Reported)</Radio>
            <Radio value={2}>No</Radio>
            </Radio.Group>
            </Form.Item>

            <p>8 Player reports or displays any other concussion symptoms (refer to CRT5) </p>
            <Form.Item name='q8' required>
            <Radio.Group name='q8'>  
            <Radio value={0}>Yes(Observed directly)</Radio>
            <Radio value={1}>Yes(Reported)</Radio>
            <Radio value={2}>No</Radio>
            </Radio.Group>
            </Form.Item>

            <p>9 Dazed or blank/vacant stare or not their normal selves/not reacting appropriately 
 to surroundings</p>
            <Form.Item name='q9' required>
            <Radio.Group name='q9'>  
            <Radio value={0}>Yes(Observed directly)</Radio>
            <Radio value={1}>Yes(Reported)</Radio>
            <Radio value={2}>No</Radio>
            </Radio.Group>
            </Form.Item>

            <p>10 Unusual or atypical behaviour for the player ❒ ❒ ❒ 11 Loss of responsiveness (player motionless for 2-3 seconds or until support staff arrives)</p>
            <Form.Item name='q10' required>
            <Radio.Group name='q10'>  
            <Radio value={0}>Yes(Observed directly)</Radio>
            <Radio value={1}>Yes(Reported)</Radio>
            <Radio value={2}>No</Radio>
            </Radio.Group>
            </Form.Item>
            </div>





            

        <table className='form_table'>
           
          <caption className='table_title'>Concussion Symptom</caption>
          <tbody>
          <tr>
            
            <th id="col_1">Concussion Symptom</th>
            <th id="col_2">None</th>
            <th id="col_3" colSpan={2} >Mild</th>
            <th id="col_4" colSpan={2}>Moderate</th>
            <th id="col_5" colSpan={2}>Severe</th>
          </tr>

          <tr>
            <td className='items'>Headache</td>
            <Form.Item name='headache' required>
            <Radio.Group name="headache" >  
            <td><Radio value={0}>0</Radio></td>
            <td><Radio value={1}>1</Radio></td>
            <td><Radio value={2}>2</Radio></td>
            <td><Radio value={3}>3</Radio></td>
            <td><Radio value={4}>4</Radio></td>
            <td><Radio value={5}>5</Radio></td>
            <td><Radio value={6}>6</Radio></td>
            </Radio.Group>
            </Form.Item>
          </tr>
          <tr>
            <td className='items'>“Pressure in head”</td>
            <Form.Item name='pressureInHead' required>
            <Radio.Group name="pressureInHead" >  
            <td><Radio value={0}>0</Radio></td>
            <td><Radio value={1}>1</Radio></td>
            <td><Radio value={2}>2</Radio></td>
            <td><Radio value={3}>3</Radio></td>
            <td><Radio value={4}>4</Radio></td>
            <td><Radio value={5}>5</Radio></td>
            <td><Radio value={6}>6</Radio></td>
            </Radio.Group>
            </Form.Item>
          </tr>
          <tr>
            <td className='items'>Neck Pain</td>
            <Form.Item name='neckPain' required>
            <Radio.Group name="neckPain" >  
            <td><Radio value={0}>0</Radio></td>
            <td><Radio value={1}>1</Radio></td>
            <td><Radio value={2}>2</Radio></td>
            <td><Radio value={3}>3</Radio></td>
            <td><Radio value={4}>4</Radio></td>
            <td><Radio value={5}>5</Radio></td>
            <td><Radio value={6}>6</Radio></td>
            </Radio.Group>
            </Form.Item>
          </tr>
          <tr>
            <td className='items'>Nausea or vomiting</td>
            <Form.Item name='NauseaOrVomiting' required>
            <Radio.Group name="NauseaOrVomiting" >  
            <td><Radio value={0}>0</Radio></td>
            <td><Radio value={1}>1</Radio></td>
            <td><Radio value={2}>2</Radio></td>
            <td><Radio value={3}>3</Radio></td>
            <td><Radio value={4}>4</Radio></td>
            <td><Radio value={5}>5</Radio></td>
            <td><Radio value={6}>6</Radio></td>
            </Radio.Group>
            </Form.Item>
          </tr>
          
          
          <tr>
            <td className='items'>Dizziness</td>
            <Form.Item name='dizziness' required>
            <Radio.Group name="dizziness" >  
            <td><Radio value={0}>0</Radio></td>
            <td><Radio value={1}>1</Radio></td>
            <td><Radio value={2}>2</Radio></td>
            <td><Radio value={3}>3</Radio></td>
            <td><Radio value={4}>4</Radio></td>
            <td><Radio value={5}>5</Radio></td>
            <td><Radio value={6}>6</Radio></td>
            </Radio.Group></Form.Item>
          </tr>
         
          <tr>
            <td className='items'>Blurred vision</td>
            <Form.Item name='blurredVision' required>
            <Radio.Group name="blurredVision" >  
            <td><Radio value={0}>0</Radio></td>
            <td><Radio value={1}>1</Radio></td>
            <td><Radio value={2}>2</Radio></td>
            <td><Radio value={3}>3</Radio></td>
            <td><Radio value={4}>4</Radio></td>
            <td><Radio value={5}>5</Radio></td>
            <td><Radio value={6}>6</Radio></td>
            </Radio.Group></Form.Item>
          </tr>
          <tr>
            <td className='items'>Balance problems</td>
            <Form.Item name='balanceProblems' required>
            <Radio.Group name="balanceProblems" >  
            <td><Radio value={0}>0</Radio></td>
            <td><Radio value={1}>1</Radio></td>
            <td><Radio value={2}>2</Radio></td>
            <td><Radio value={3}>3</Radio></td>
            <td><Radio value={4}>4</Radio></td>
            <td><Radio value={5}>5</Radio></td>
            <td><Radio value={6}>6</Radio></td>
            </Radio.Group></Form.Item>
          </tr>
          <tr>
            <td className='items'>Sensitivity to light</td>
            <Form.Item name='sensitivityToLight' required>
            <Radio.Group name="sensitivityToLight" >  
            <td><Radio value={0}>0</Radio></td>
            <td><Radio value={1}>1</Radio></td>
            <td><Radio value={2}>2</Radio></td>
            <td><Radio value={3}>3</Radio></td>
            <td><Radio value={4}>4</Radio></td>
            <td><Radio value={5}>5</Radio></td>
            <td><Radio value={6}>6</Radio></td>
            </Radio.Group></Form.Item>
          </tr>
          <tr>
            <td className='items'>Sensitivity to noise</td>
            <Form.Item name='sensitivityToNoise' required>
            <Radio.Group name="sensitivityToNoise" >  
            <td><Radio value={0}>0</Radio></td>
            <td><Radio value={1}>1</Radio></td>
            <td><Radio value={2}>2</Radio></td>
            <td><Radio value={3}>3</Radio></td>
            <td><Radio value={4}>4</Radio></td>
            <td><Radio value={5}>5</Radio></td>
            <td><Radio value={6}>6</Radio></td>
            </Radio.Group></Form.Item>
          </tr>
          
          <tr>
            <td className='items'>Feeling slowed down</td>
            <Form.Item name='feelingSlowedDown' required>
            <Radio.Group name="feelingSlowedDown" >  
            <td><Radio value={0}>0</Radio></td>
            <td><Radio value={1}>1</Radio></td>
            <td><Radio value={2}>2</Radio></td>
            <td><Radio value={3}>3</Radio></td>
            <td><Radio value={4}>4</Radio></td>
            <td><Radio value={5}>5</Radio></td>
            <td><Radio value={6}>6</Radio></td>
            </Radio.Group></Form.Item>
          </tr>
          <tr>
            <td className='items'>Feeling like “in a fog“</td>
            <Form.Item name='feelingLikeInAFog' required>
            <Radio.Group name="feelingLikeInAFog" >  
            <td><Radio value={0}>0</Radio></td>
            <td><Radio value={1}>1</Radio></td>
            <td><Radio value={2}>2</Radio></td>
            <td><Radio value={3}>3</Radio></td>
            <td><Radio value={4}>4</Radio></td>
            <td><Radio value={5}>5</Radio></td>
            <td><Radio value={6}>6</Radio></td>
            </Radio.Group></Form.Item>
          </tr>
          <tr>
            <td className='items'>“Don’t feel right”</td>
            <Form.Item name='dontFeelRight' required>
            <Radio.Group name="dontFeelRight" >  
            <td><Radio value={0}>0</Radio></td>
            <td><Radio value={1}>1</Radio></td>
            <td><Radio value={2}>2</Radio></td>
            <td><Radio value={3}>3</Radio></td>
            <td><Radio value={4}>4</Radio></td>
            <td><Radio value={5}>5</Radio></td>
            <td><Radio value={6}>6</Radio></td>
            </Radio.Group></Form.Item>
          </tr>
          <tr>
            <td className='items'>Difficulty concentrating</td>
            <Form.Item name='difficultyConcentrating' required>
            <Radio.Group name="difficultyConcentrating" >  
            <td><Radio value={0}>0</Radio></td>
            <td><Radio value={1}>1</Radio></td>
            <td><Radio value={2}>2</Radio></td>
            <td><Radio value={3}>3</Radio></td>
            <td><Radio value={4}>4</Radio></td>
            <td><Radio value={5}>5</Radio></td>
            <td><Radio value={6}>6</Radio></td>
            </Radio.Group></Form.Item>
          </tr>
          
          <tr>
            <td className='items'>Difficulty remembering</td>
            <Form.Item name='difficultyRemembering' required>
            <Radio.Group name="difficultyRemembering" >  
            <td><Radio value={0}>0</Radio></td>
            <td><Radio value={1}>1</Radio></td>
            <td><Radio value={2}>2</Radio></td>
            <td><Radio value={3}>3</Radio></td>
            <td><Radio value={4}>4</Radio></td>
            <td><Radio value={5}>5</Radio></td>
            <td><Radio value={6}>6</Radio></td>
            </Radio.Group></Form.Item>
          </tr>
          <tr>
            <td className='items'>Fatigue or low energy</td>
            <Form.Item name='fatigueOrLowEnergy' required>
            <Radio.Group name="fatigueOrLowEnergy" >  
            <td><Radio value={0}>0</Radio></td>
            <td><Radio value={1}>1</Radio></td>
            <td><Radio value={2}>2</Radio></td>
            <td><Radio value={3}>3</Radio></td>
            <td><Radio value={4}>4</Radio></td>
            <td><Radio value={5}>5</Radio></td>
            <td><Radio value={6}>6</Radio></td>
            </Radio.Group></Form.Item>
          </tr>
          <tr>
            <td className='items'>Confusion</td>
            <Form.Item name='confusion' required>
            <Radio.Group name="confusion" >  
            <td><Radio value={0}>0</Radio></td>
            <td><Radio value={1}>1</Radio></td>
            <td><Radio value={2}>2</Radio></td>
            <td><Radio value={3}>3</Radio></td>
            <td><Radio value={4}>4</Radio></td>
            <td><Radio value={5}>5</Radio></td>
            <td><Radio value={6}>6</Radio></td>
            </Radio.Group></Form.Item>
          </tr>
          <tr>
            <td className='items'>Drowsiness</td>
            <Form.Item name='drowsiness' required>
            <Radio.Group name="drowsiness" >  
            <td><Radio value={0}>0</Radio></td>
            <td><Radio value={1}>1</Radio></td>
            <td><Radio value={2}>2</Radio></td>
            <td><Radio value={3}>3</Radio></td>
            <td><Radio value={4}>4</Radio></td>
            <td><Radio value={5}>5</Radio></td>
            <td><Radio value={6}>6</Radio></td>
            </Radio.Group></Form.Item>
          </tr>
          <tr>
            <td className='items'>More emotional</td>
            <Form.Item name='moreEmotional' required>
            <Radio.Group name="moreEmotional" >  
            <td><Radio value={0}>0</Radio></td>
            <td><Radio value={1}>1</Radio></td>
            <td><Radio value={2}>2</Radio></td>
            <td><Radio value={3}>3</Radio></td>
            <td><Radio value={4}>4</Radio></td>
            <td><Radio value={5}>5</Radio></td>
            <td><Radio value={6}>6</Radio></td>
            </Radio.Group></Form.Item>
          </tr>
          
          <tr>
            <td className='items'>Irritability</td>
            <Form.Item name='irritability' required>
            <Radio.Group name="irritability" >  
            <td><Radio value={0}>0</Radio></td>
            <td><Radio value={1}>1</Radio></td>
            <td><Radio value={2}>2</Radio></td>
            <td><Radio value={3}>3</Radio></td>
            <td><Radio value={4}>4</Radio></td>
            <td><Radio value={5}>5</Radio></td>
            <td><Radio value={6}>6</Radio></td>
            </Radio.Group></Form.Item>
          </tr>
          <tr>
            <td className='items'>Sadness</td>
            <Form.Item name='sadness' required>
            <Radio.Group name="sadness" >  
            <td><Radio value={0}>0</Radio></td>
            <td><Radio value={1}>1</Radio></td>
            <td><Radio value={2}>2</Radio></td>
            <td><Radio value={3}>3</Radio></td>
            <td><Radio value={4}>4</Radio></td>
            <td><Radio value={5}>5</Radio></td>
            <td><Radio value={6}>6</Radio></td>
            </Radio.Group></Form.Item>
          </tr>
          <tr>
            <td className='items'>Nervous or Anxious</td>
            <Form.Item name='nervousOrAnxious' required>
            <Radio.Group name="nervousOrAnxious" >  
            <td><Radio value={0}>0</Radio></td>
            <td><Radio value={1}>1</Radio></td>
            <td><Radio value={2}>2</Radio></td>
            <td><Radio value={3}>3</Radio></td>
            <td><Radio value={4}>4</Radio></td>
            <td><Radio value={5}>5</Radio></td>
            <td><Radio value={6}>6</Radio></td>
            </Radio.Group></Form.Item>
          </tr>
          <tr>
            <td className='items'>Trouble falling asleep (if applicable)</td>
            <Form.Item name='troubleFallingAsleep' required>
            <Radio.Group name="troubleFallingAsleep" >  
            <td><Radio value={0}>0</Radio></td>
            <td><Radio value={1}>1</Radio></td>
            <td><Radio value={2}>2</Radio></td>
            <td><Radio value={3}>3</Radio></td>
            <td><Radio value={4}>4</Radio></td>
            <td><Radio value={5}>5</Radio></td>
            <td><Radio value={6}>6</Radio></td>
            </Radio.Group></Form.Item>
          </tr> 
        
          </tbody>  
        </table>
        <div className='left'>
          <p>Do your symptoms get worse with physical activity?</p>
          <Form.Item name='Y_N_1' required>          
          <Radio.Group name="Y_N_1" >  
            <td><Radio value={true}>yes</Radio></td>
            <td><Radio value={false}>no</Radio></td>
          </Radio.Group></Form.Item>

          <p>Do your symptoms get worse with mental activity?</p>
          <Form.Item name='Y_N_2' required>
          <Radio.Group name="Y_N_2" >  
            <td><Radio value={true}>yes</Radio></td>
            <td><Radio value={false}>no</Radio></td>
          </Radio.Group></Form.Item>

          <p>If 100% is feeling perfectly normal, what percent of normal do you feel?</p>
          <Form.Item name='range' required>
          <Slider name="range" className='my-slider'  defaultValue={40}  onAfterChange={toastValue} icon={<HeartOutline />} />
          </Form.Item>
          <p>If not 100%, why?</p>
          <Form.Item name='rangeReason' required>
          <TextArea name="rangeReason" rows={4} placeholder="Reason"/>
          </Form.Item>
        </div>
        
      </Form>
      </div>
)
}


export default ConcussionForm;