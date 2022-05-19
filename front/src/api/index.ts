import axios from "axios";
// import qs from 'qs';




const http = axios.create({
  baseURL:'http://108.61.184.187:8000/',
  timeout:5000,
  
})
 
http.interceptors.response.use((response)=>{
  // if(){
   
  // }
  return response.data;
},(error)=>{
  return Promise.reject(error);
})


//注册
export const registry = (data:any)=>{
  return http({
    url:'/api/user/register',
    method:"POST",
    data
  })
}
//登录
export const login = (data:any) =>{
  return http({
    url:'api/login',
    method:'POST',
    data
  })
}