import React from 'react';
import CreateAccount from './components/CreateAccount';
import RegistryTitle from './components/RegistryTitle'
import './registry.scss';
import NavBarBottom from "../part-navBarBottom"

const Registry = ()=>{
  return (
    <>
      <RegistryTitle step={0} />

      <div className="common--page-main common--page-main__large-title">
        <div className="registry--cont">

          <div className="registry">
            <div className='content'>
              <CreateAccount />
            </div>
          </div>

        </div>
      </div>

      <NavBarBottom homeBtnForLogin />
    </>

  )
}

export default Registry;