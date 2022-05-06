import axios from "axios";
// import qs from 'qs';




const http = axios.create({
  baseURL:'',
  timeout:5000,
  
})
 
http.interceptors.response.use((response)=>{
  console.log(response,888);
  // if(){
   
  // }
  return response.data;
},(error)=>{
  return Promise.reject(error);
})


//注册
export const addUser = (data:{name:string,password:string})=>{
  return http({
    // url:'',
    // method:"",
    // data
  })
}
//登录
export const getDetail = (params:{name:string,password:string}) =>{
  return http({
    // url:'',
    // method:'',
    // params
  })
}