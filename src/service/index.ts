
import ZYRequest from "@/service/request";
import {BASE_URL, TIMEOUT} from "@/service/request/config";
import cache from "@/util/cache";
import {TOKEN} from "@/constent";
import {ElMessage} from "element-plus";

const zAxios = new ZYRequest({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    interceptor: {
        requestInterceptor: (config) => {
            // 携带Token
            const token: string = cache.getCache(TOKEN);
            if (token) {
                config.headers!.Token = token;
            }

            return config;
        },
        requestInterceptorError: error => {
            return error;
        },
        responseInterceptor: res => {
            return res;
        },
        responseInterceptorError: error => {
            ElMessage({
                showClose: true,
                message: error.response.data.msg || "操作失败!",
                type: 'error',
            })
            return error;
        }
    }
});

export const zReq = new ZYRequest({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
})

export default zAxios;