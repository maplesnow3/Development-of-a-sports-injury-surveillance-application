import React from 'react';
import CreateAccount from './components/CreateAccount';
import RegistryTitle from './components/RegistryTitle'
import './registry.scss';
 
const Registry = ()=>{
  return (
    <div className="registry">
      <div className='content'>
        <RegistryTitle step={0} />
        <CreateAccount />
      </div>
    </div>
  )
}

export default Registry;