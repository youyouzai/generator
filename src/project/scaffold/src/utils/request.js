import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const request = axios.create({
  baseURL: 'http://localhost:3000/', // url = base url + request url
  timeout: 3000 // request timeout
})

// request interceptor
request.interceptors.request.use(
  config => {
    // do something before request is sent
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(

  response => {
    const res = response.data
    // do something after response
    return res
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)
function doRequest(url, method, params){
    return new Promise((resolve, reject) => {
        request({
            url,
            method,
            params
        }).then((response) => {
            // todo: do something
            resolve(response.data)
        }).catch((err) => {
            reject(err)
        })
    })
    
}
Vue.prototype.$request = (url, method, params) => {
    return doRequest(url, method, params)
}
Vue.prototype.$get = (url, params) => {
    return doRequest(url, 'get', { params })
}
Vue.prototype.$post = (url, params) => {
    return doRequest(url, 'post', params)
}
export default request
