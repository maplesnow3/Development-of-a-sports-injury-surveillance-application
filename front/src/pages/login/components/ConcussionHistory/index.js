import React from 'react';
import {Form,Button,Input,Toast} from 'antd-mobile';
import { useNavigate,useLocation } from 'react-router-dom';
import RadioComponent from '../RadioComponent';
import RegistryTitle from '../RegistryTitle';
import {registry} from '../../../../api';
import moment from 'moment';
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
        onFinish={async(values)=>{
          const {email,password,surname,givenName,birthday,address,country,ethicBackground,phone,asthma,
            type1Diabetes,type2Diabetes,epilepsy,highBlood,heartConditions,allergies,
            asthmaInput,type1DiabetesInput,type2DiabetesInput,epilepsyInput,highBloodInput,heartConditionsInput,allergiesInput,
            medications,vitaminsSupplements,others,
            medicationsInput,vitaminsSupplementsInput,othersInput,
            muscleStrain,ligamentSprain,brokenBones,dislocationSubluxation,meniscusCartilage,tendonInjury,nerveInjury,other,
            muscleStrainInput,ligamentSprainInput,brokenBonesInput,dislocationSubluxationInput,meniscusCartilageInput,tendonInjuryInput,nerveInjuryInput,otherInput,
            surgery,
            concussion,pop,suffer,doctor,week,serious,
            desc
          } = {...state,...values}
          let data ={
            email,
            password,
            usertype: "player",
            surname,
            givenName,
            birthday:moment(birthday).format('YYYY-MM-DD'),
            ethicBackground,
            phone,
            address,
            country,
            medicalHistory:[asthma,type1Diabetes,type2Diabetes,epilepsy,highBlood,heartConditions,allergies],
            medicalHistoryInput:[String(asthmaInput),String(type1DiabetesInput),String(type2DiabetesInput),String(epilepsyInput),String(highBloodInput),String(heartConditionsInput),String(allergiesInput)],
            medicineTaken:[medications,vitaminsSupplements,others],
            medicineTakenInput:[String(medicationsInput),String(vitaminsSupplementsInput),String(othersInput)],
            injuryHistory:[ muscleStrain,ligamentSprain,brokenBones,dislocationSubluxation,meniscusCartilage,tendonInjury,nerveInjury,other],
            injuryHistoryInput: [String(muscleStrainInput),String(ligamentSprainInput),String(brokenBonesInput),String(dislocationSubluxationInput),String(meniscusCartilageInput),String(tendonInjuryInput),String(nerveInjuryInput),String(otherInput)],
            surgery,
            concussionQuestions:[concussion,pop,suffer,doctor,week,serious],
            describe:desc
          }
          let res = await registry(data)
          if(res.status==='success'){
            navigate('/login')
          }else{
            Toast.show({
              icon: 'fail',
              content: res.message,
            })
          }
        }}
        footer={
          <Button style={{backgroundColor:'#1DB860'}} block type='submit' color='primary' size='large'>
            Complete
          </Button>
        }
      >
        {dataArray.map(item=> <RadioComponent key={item.name} data={item} />)}
      <Form.Item name='desc' rules={[{required:true,message:'please enter content'}]} label='if yes,can you describe those symptoms?'>
        <Input placeholder='single input' />
      </Form.Item>
      </Form>
    </div>
  )
}


export default ConcussionHistory;