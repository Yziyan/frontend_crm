import zAxios from "@/service";
import {IDataType} from "@/service/types";


enum reqApi {
    goodsStat = "/categories/listStat",
    addressStat = "/goods/listStat"
}

// 获取统计数据
export function reqGoodsStat() {
    return zAxios.get<IDataType>({
        url: reqApi.goodsStat,
        showLoading: false
    })
}

export function reqAddressStat() {
    return zAxios.get<IDataType>({
        url: reqApi.addressStat,
        showLoading: false
    })

}
