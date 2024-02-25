
import axios from 'axios'
import CryptoJS from 'crypto-js';

const requestOkx = axios.create({
    baseURL: 'https://www.okx.com/',
    timeout: 60000
});



// 添加请求拦截器
requestOkx.interceptors.request.use(function (config) {
    const timestamp = new Date().toISOString();
    const baseURL = config.baseURL;
    const url = config.url;
    const method = config.method;
    const params = config.params;

    let urlAll = `${timestamp}${method.toUpperCase()}${url}?`;
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            urlAll += `${key}=${params[key]}&`;
        }
    }
    urlAll = urlAll.slice(0, -1);
    //2023-11-21T14:31:42.224ZGET/api/v5/rubik/stat/contracts/long-short-account-ratio?ccy=BTC

    const sign=CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(urlAll, "!!!!!!!!!!!!!!!!!!!!!!"))

    config.headers['OK-ACCESS-KEY'] = '!!!!!!!!!!!!!!!!!!!!!!';
    config.headers['OK-ACCESS-SIGN'] = sign;
    config.headers['OK-ACCESS-TIMESTAMP'] = timestamp;
    config.headers['OK-ACCESS-PASSPHRASE'] = '!!!!!!!!!!!!!!!!!!!!!!';
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Access-Control-Allow-Origin-Method'] = 'POST,GET';
    config.headers['content-type'] = 'application/json';

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
requestOkx.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});



//自定义各种数据请求的axios
export default function ajaxOkx(config) {
    // 数据请求时我们需要什么参数
    // 1. 先获取请求的一些必要参数
    const { url = '', method = 'GET', data = {}, headers = {}, urlSearch = {} } = config

    // 2. 判断我们的请求的类型
    switch (method.toUpperCase()) {
        case 'GET':
            // get 请求规定配置参数时需要加一个 { params: 我们的参数 }
            return requestOkx.get(url, { params: data })
        case 'POST':
            // 判断是否是 JSON 数据提交
            if (headers['content-type'] === 'application/json') {
                // 将 URL 参数附加到 URL 中
                const queryString = Object.keys(urlSearch).length > 0 ? new URLSearchParams(urlSearch).toString() : '';
                const fullUrl = queryString ? `${url}?${queryString}` : url;
                
                // 发送 POST 请求
                return requestOkx.post(fullUrl, data, { headers });
            }
            // 1. 表单提交数据
            if (headers['content-type'] == 'application/x-www-form-url-encoded') {
                //转换参数类型，格式化数据
                const obj = new URLSearchParams();
                for (const key in data) {
                    obj.append(key, data[key]);
                }
                return requestOkx.post(url, obj, { headers });
            }
            // 2. 文件数据
            if (headers['content-type'] == 'multipart/form-data') {
                // 处理文件的对象
                const obj = new FormData();
                for (const key in data) {
                    obj.append(key, data[key]);
                }
                return requestOkx.post(url, obj, { headers });
            }
            // 3. json数据提交
            return requestOkx.post(url, data);

        case 'PUT': 
            //修改数据 --- 数据更新
            return requestOkx.put(url, data);
        case 'DELETE': 
            //删除数据
            return requestOkx.delete(url, { data });
        case 'PATCH': 
            //更新局部资源
            return requestOkx.patch(url, data);
        default:
            // 如果前面全部都不是
            return requestOkx.request(config);
    }
}