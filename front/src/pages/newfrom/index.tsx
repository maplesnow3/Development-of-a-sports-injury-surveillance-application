import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormOutlined } from '@ant-design/icons';

import './index.css'
import NavBarBottom from "../part-navBarBottom"
import InjureForm from './Component/injureForm.js'


const Newform = ()=>{
  const navigator = useNavigate()
  return (
    <>
    	<div className="common--page-title">
				<h1>
          Create a New Form
          <p className="common--page-title-sub">
					  For {(() => {
              // A fake domain is given for successfully construct URL object
              let urlSearch =
                (new URL("http://localhost" + window.location.hash.slice(1))).searchParams;
              let checkedUserId = urlSearch.get("user_id") || "-1";

              if (checkedUserId === "-1") {
                return "yourself";
              } else {
                let checkedUserName = urlSearch.get("name") || "";
                if (checkedUserName) {
                  return `${checkedUserName} (ID: ${checkedUserId})`;
                } else {
                  return `player (ID: ${checkedUserId})`;
                }
              }
            })()}
					</p>
				</h1>
				<div className="page-title--icon-cont"><FormOutlined /></div>
			</div>

      <div className="common--page-main">
        <div className="newform--form-cont">
          <InjureForm />
        </div>
      </div>

      <NavBarBottom />
    </>
  )
}

export default Newform;
