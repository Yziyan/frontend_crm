import * as echarts from "echarts";
import {EChartsOption} from "echarts/types/dist/shared";

import chinaMapDat from "../data/china.json";


// 注册中国地图数据
echarts.registerMap("china", chinaMapDat);

export default function (el: HTMLElement) {

    // 初始化Echarts实例
    const echartInstance = echarts.init(el);

    // 设置配置选项
    const setOptions = (options: EChartsOption) => {
        echartInstance.setOption(options);
    }

    // 主动调用重新绘制
    const updateSize = () => {
        echartInstance.resize();
    }

    // 屏幕尺寸改变时，重新绘制图表
    window.addEventListener("resize", () => {
        echartInstance.resize();
    })

    return {
        echartInstance,
        setOptions,
        updateSize
    }

}
