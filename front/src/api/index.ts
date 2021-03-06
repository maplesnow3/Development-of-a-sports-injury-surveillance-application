import axios from "axios";
// import qs from 'qs';

let bcrypt = require("bcryptjs");



const http = axios.create({
  baseURL:'/',//http://108.61.184.187:8000/
  timeout:5000,
  withCredentials:true
})
http.interceptors.response.use((response)=>{
  console.log(response.data);
  if(response.data.message === "Not logged in"){
    window.open('#/login','_self')
    return
  }
  return response.data;
},(error)=>{
  return Promise.reject(error);
})


//注册
export const registry = (data:any)=>{
  if (data.hasOwnProperty("password") && data.password) {
    data.password = bcrypt.hashSync(data.password, "$2a$06$AGM/cv8Hw/w4bkj8PJsM0.");
  }
  return http({
    url:'/api/user/register',
    method:"POST",
    data
  })
}
//登录
export const login = (data:any) =>{
  if (data.hasOwnProperty("password") && data.password) {
    data.password = bcrypt.hashSync(data.password, "$2a$06$AGM/cv8Hw/w4bkj8PJsM0.");
  }
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

export const setAccessCodeApi = (data:{user_id:string,code:string})=>{
  return http({
    url:'api/user/access_code/set',
    method:'POST',
    data
  })
}

export const resetPassword = (data:any)=>{
  return http({
    url:'api/user/reset_password',
    method:'POST',
    data
  })
}