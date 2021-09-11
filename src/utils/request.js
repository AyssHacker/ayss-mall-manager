import axios from "axios";
import {publicConfig} from './config'
import store from "../store"
import {ACCESS_TOKEN} from '../store/mutation-types'
import storage from 'store'
import {message,notification} from "ant-design-vue"


//创建axios实例
const service = axios.create({
   //服务端api地址
  baseURL: publicConfig.BASE_API,
  //请求超时时间 25s, 大文件更长
  timeout: 25 * 1000
})

//接口请求拦截
service.interceptors.request.use(config => {
  //让每个请求携带当前用户的token
  const token = storage.get(ACCESS_TOKEN)
    if(token){
      config.headers['Access-Token'] = token;
    }
    return config
})

//接口响应拦截
service.interceptors.response.use((response)=>{
    const result = response.data
    //status 状态码的处理  200正常 500服务器内部错误  401未登录  403没有权限访问
      if(result.status===500) {
          message.error('500:服务器内部错误')
          return Promise.reject(result)
      }
      //用户未登录
      if(result.status===401) {
        //调用用户退出登陆的操作
        store.dispatch('Logout').then(()=>{
          notification.error({
              message:'错误提示',
              description: result.message,
              duration: 2
          });
          //刷新页面
          setTimeout(()=>{
            window.location.reload()
          },1200)
        })
          return Promise.reject(result)
      }
      // 200 || 403
        return result

},(error)=>{
   //   网络请求出错了 客户端方面
        const errMsg = ((error.response || {}).data || {}).message || '请求出现错误,请稍后再试'
  notification.error({
    message: '网络请求出错',
    description: errMsg,
    duration: 2
  })
  return Promise.reject(error)
})

export {
  service as axios
}