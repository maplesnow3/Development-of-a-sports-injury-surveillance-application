// import logo from './logo.svg';
import React from 'react';
import {Navigate, Routes,Route, useNavigate, useLocation } from 'react-router-dom';
import routers from './router'
import './App.css';
import { setDefaultConfig } from 'antd-mobile'
import enUS from 'antd-mobile/es/locales/en-US'

setDefaultConfig({
  locale: enUS,
})


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/home" />} />
      {routers.map(
        (item:{path:'string',element:any})=>{
          return<Route key={item.path} path={item.path}  element={<item.element />} />
          })}
    </Routes>
   );
}

export default App;
