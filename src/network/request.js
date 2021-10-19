import axios from "axios"
export function request(config){
    const instance1 = axios.create({
      baseURL: 'http://152.136.185.210:7878/api/hy66',
      timeout: 5000
    })

  // instance1.interceptors.request.use(config => {
  //   return config;
  // },err => {
  // })
  //
  // //响应拦截
  // instance1.interceptors.response.use(res => {
  //   return res.data;
  // },error => {
  // })

  // instance1(config)的返回值本身就是一个promise
  //3、发送真正的网络请求
    return instance1(config)
}
