import axios from 'axios';
import { Loading } from 'element-ui';

/**
 * 以 url 编码方式序列化对象
 * @param  {Object} obj     参数对象
 * @return {String}         序列化后的字符串
 */
function serializeParams(obj) {
    var query = '',
        key,
        value;

    for (key in obj) {
        value = obj[key];

        if (value instanceof Object) {
            value = encodeURIComponent(JSON.stringify(value));
        } else if (value === undefined || value === null) {
            value = '';
        }

        query += encodeURIComponent(key) + '=' + value + '&';
    }
    return query.length ? query.substr(0, query.length - 1) : query;
}


let api = axios.create({
    baseURL: APP_GL.appConfig.service
});

/**
 * 在请求或响应被 then 或 catch 处理前拦截它们。
 *
 */
let loading;
let showLoading = true;
// 添加请求拦截器
api.interceptors.request.use(
    function (config) {
        showLoading = config.url.indexOf('/manager/api/tools/ibest/search/files') == -1;

        if (showLoading) {
            loading = Loading.service({
                lock: true,
                text: '加载中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0)'
            });
        }

        if (config.payload) {
            return config;
        } else {
            config.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
            config.transformRequest = [
                function (data) {
                    // 序列化对象参数
                    return typeof data == 'object' && String(data) !== '[object File]' ?
                        serializeParams(data) :
                        data;
                }
            ];

            config.data = {
                ...config.data
            };

            return config;
        }
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
api.interceptors.response.use(
    function (response) {
        if (showLoading) {
            loading.close();
        }

        return response;
    },
    function (error) {

        // 处理错误状态
        if (!error.response) {
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default api;
