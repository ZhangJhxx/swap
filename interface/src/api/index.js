import axios from "../utils/request"


//网络请求访问路径
const base = {
  baseUrl: "http://localhost:8888",
  register:"/api/register",
  news:"/api/news",
  repeatUser:"/api/repeat/username",
  login:"/api/login",
}

//网络请求方法
const api = {
  /**
   * 注册
   * @param {
   *  username:"xx"
   *  password:"123"
   *    ...
   * } params 
   * @returns 
   */
  register(params){
    return axios.post(base.baseUrl+base.register, params);
  },
  
  //获取新闻的方法
  getNews(page){
    return axios.get(`${base.baseUrl}${base.news}/${page}`);
  },
  //验证用户名是否重复
  ifRepeatUser(params){
    return axios.get(base.baseUrl+base.repeatUser,{
      params
    })
  },
  login(params){
    return axios.post(base.baseUrl+base.login,params);
  }
}


export default api;