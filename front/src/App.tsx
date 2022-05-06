// import logo from './logo.svg';
import React from 'react';
import {Routes,Route, useNavigate, useLocation } from 'react-router-dom';
import routers from './router'
import './App.css';

function App() {
  return (
    <Routes>
      {routers.map(
        (item:{path:'string',element:any})=>{
          return<Route key={item.path} path={item.path}  element={<item.element />} />
          })}
    </Routes>
   );
}

export default App;
