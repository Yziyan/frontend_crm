import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {ZYInterceptors, ZYRequestConfig} from "@/service/request/type";

import {ElLoading} from 'element-plus'
import {LoadingInstance} from 'element-plus/lib/components/loading/src/loading'


const DEFAULT_LOAD = true;

class ZYRequest {

    /**
     * 1、axios实例对象
     * 2、拦截器
     * 3、登录加载
     * 4、是否展示请求加载
     */
    instance: AxiosInstance;
    interceptors?: ZYInterceptors;
    loading?: LoadingInstance
    showLoading?: boolean;

    constructor(config: ZYRequestConfig) {

        this.instance = axios.create(config);
        this.interceptors = config.interceptor;
        // 展示loading 【默认是加载的】
        this.showLoading = config.showLoading ?? DEFAULT_LOAD;
        // 使用类时可选拦截器
        this.instance.interceptors.request.use(
            this.interceptors?.requestInterceptor,
            this.interceptors?.requestInterceptorError);
        this.instance.interceptors.response.use(
            this.interceptors?.responseInterceptor,
            this.interceptors?.responseInterceptorError);

        // 全局默认拦截器
        this.instance.interceptors.request.use(
            (config: AxiosRequestConfig) => {

                if (this.showLoading) {

                    // element-plus的加载服务
                    this.loading = ElLoading.service({
                        fullscreen: true,
                        lock: true,
                        text: "正在请求中~~"
                    });
                }

                return config;
            },
            (error: any) => {
                console.log("全局请求失败拦截");
                return error;
            })
        this.instance.interceptors.response.use(
            (res: AxiosResponse) => {

                // 1、将loading关闭
                this.loading?.close();

                return res.data;
            },
            (error: any) => {
                this.loading?.close();
                if (error.response.status === 400) {
                    console.log("404的错误");
                }
                return error;
            }
        )

    }

    request<T = any>(config: ZYRequestConfig<T>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            if (config.interceptor?.requestInterceptor) {
                config = config.interceptor.requestInterceptor(config);
            }

            if (config.showLoading === false) {
                this.showLoading = config.showLoading
            }
            this.instance.request<any, T>(config).then(res => {

                if (config.interceptor?.responseInterceptor) {
                    res = config.interceptor.responseInterceptor(res);
                }
                // 将是否展示设为默认值
                this.showLoading = DEFAULT_LOAD;
                resolve(res);
            }).catch((err) => {
                this.showLoading = DEFAULT_LOAD;
                reject(err);
                return err;
            })
        })
    }

    get<T = any>(config: ZYRequestConfig<T>): Promise<T> {
        return this.request({...config, method: "GET"});
    }

    post<T = any>(config: ZYRequestConfig<T>): Promise<T> {
        return this.request({...config, method: "POST"});
    }

}

export default ZYRequest
