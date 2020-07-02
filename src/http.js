import axios from 'axios';

let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
const Axios = axios.create({
  // baseURL: process.env.BASE_URL, // 设置请求的base url
  baseURL:'/api',
  timeout: 10000, // 设置超时时长
  withCredentials:true //允许请求带上跨域cookie
})

let removeRepeatUrl = (ever) => {
  for(let p in pending){
    if(pending[p].u === ever.url + '&' + ever.method) { //当当前请求在数组中存在时执行函数体
      pending[p].f(); //执行取消操作
      pending.splice(p, 1); //把这条记录从数组中移除
    }
  }
}

// 请求拦截器
Axios.interceptors.request.use(config => {
  console.log('config',config);
  //在一个ajax发送前执行一下取消操作
  removeRepeatUrl(config);
  config.cancelToken = new cancelToken((c)=>{
    // 自定义唯一标识
    pending.push({ u: config.url + '&' + config.method, f: c });
    console.log('pending====',{ u: config.url + '&' + config.method, f: c });
    console.log('pending',pending);
  });
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
Axios.interceptors.response.use(res => {
  removeRepeatUrl(res.config);  //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
  const data = res.data
  return data
}, err => {
  return Promise.reject(err)
})


/* 统一封装get请求 */
export const get = (url, params, config = {}) => {
  return new Promise((resolve, reject) => {
    Axios({
      method: 'get',
      url,
      params,
      ...config
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/* 统一封装post请求  */
export const post = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    Axios({
      method: 'post',
      url,
      data,
      ...config
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}



// export {get,post}