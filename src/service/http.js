import axios from "axios";
//创建axios默认参数
export default function (url,
{
    method = 'get',
    // 模拟的API接口
    // baseURL = 'http://localhost:8082',
    baseURL = 'http://10.101.166.37:8082',
    timeout = 5000,
    data = {},
    headers = {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    responseType = 'json',
    params = {}
})
{
    //设置请求参数
    const config = {
        method: method,
        timeout: timeout,
        url: url,
        baseURL: baseURL,
        withCredentials: false,
        data: data,
        headers: headers,
        responseType: responseType,
        params: params
    }
    return axios(config)
}
