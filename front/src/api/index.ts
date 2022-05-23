import axios from "axios";
// import qs from 'qs';




const http = axios.create({
  baseURL:'/',//http://108.61.184.187:8000/
  timeout:5000,
  withCredentials:true
})
// http.defaults.withCredentials = true
http.interceptors.response.use((response)=>{
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

export const getPersonInfo = (id:any)=>{
  return http({
    url:`api/user/personal_info/get/${id}`,
  })
}

export const getAccessCode = (id:any)=>{
  return http({
    url:`api/user/access_code/get/${id}`
  })
}

export const getBaseline = (id:any)=>{
  return http({
    url:`api/user/baseline/get/${id}`
  })
}
export const updatePersonInfo = (data:any)=>{
  return http({
    url:'api/user/personal_info/set',
    method:'POST',
    data
  })
}