import axios from 'axios'


// create an axios instance
const service = axios.create({
    baseURL: process.env.REACT_APP_BASE_API, // api 的 base_url
    withCredentials: true // 跨域请求时发送 cookies
    // timeout: 5000, // request timeout
    // headers: {
    //   'Content-Type': "application/json;charset=utf-8"
    // }
})
// request interceptor
service.interceptors.request.use(
    config => {
        // Do something before request is sent
        // if (store.getters.token) {
        //   // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        //   config.headers['X-Token'] = getToken()
        // }
        return config
    },
    error => {
        // Do something with request error
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get information such as headers or status
     * Please return  response => response
     */
    response => {
        const res = response.data
        if (res.status === 1 ) {
            // 如果后台返回的json显示成功，pass
            return res
        } else {
            return Promise.reject('error')
        }
    },
    error => {

        return Promise.reject(error)
    }
)
export default service
