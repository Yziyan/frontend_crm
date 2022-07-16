
import type {AxiosRequestConfig, AxiosResponse} from "axios";

// 拦截器的接口
interface ZYInterceptors<T = AxiosResponse> {
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    requestInterceptorError?: (error: any) => any;
    responseInterceptor?: (res: T) => T;
    responseInterceptorError?: (error: any) => any;
}

// 加上拦截器配置的请求配置参数
interface ZYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptor?: ZYInterceptors<T>;
    showLoading?: boolean;
}

export {ZYInterceptors, ZYRequestConfig}