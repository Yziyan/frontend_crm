import zAxios from "@/service";
import {IDataType} from "@/service/types";
import cache from "@/util/cache";
import pageName2uri from "@/util/pageName2uri";
import {ElMessage} from "element-plus";

enum reqApi {
    resTreeDir = "/resources/listTree",
    categoryTree = "/categories/listTree",
    updatePassword = "/users/password",
    updateUserInfo = "/users/updateInfo"
}

export function reqList(uri: string, query: any) {
    return zAxios.post<IDataType>({
        url: uri,
        data: query,
        showLoading: false
    });
}

export function reqTreeDir() {
    return zAxios.get<IDataType>({
        url: reqApi.resTreeDir,
        showLoading: false
    });
}

export function reqCategoryTree(keyword: string) {
    return zAxios.get<IDataType>({
        url: reqApi.categoryTree,
        params: {keyword},
        showLoading: false
    })
}

export function reqDelete(pageName: string, ids: string) {
    pageName = pageName2uri(pageName);
    return zAxios.post<IDataType>({
        url: `/${pageName}/remove`,
        params: {
            ids
        },
        showLoading: false
    });
}

export function reqInitialData(uri: string) {
    return zAxios.get<IDataType>({
        url: uri,
        showLoading: false
    })
}

function mapReqData2FormData(formData: FormData, param: any) {
    if (!param) return;
    //formData.append()
}

export function reqSaveOrUpdate(pageName: string, reqData: any) {
    // 【对接口数据做特殊处理】

    console.log(reqData.state);

    if (pageName === "goods") {
        // 转换请求的数据
        let formData = new FormData();
        Object.keys(reqData).forEach(key => {
            if (reqData[key] || reqData[key] === 0) {
                formData.append(key, reqData[key]);
            }
        })
        //【真正请求】
        return zAxios.post<IDataType>({
            url: `/${pageName}/save`,
            data: formData,
            showLoading: false
        })
    }

    if (pageName === "user") {
        let roleIdsStr: string = "";
        for (const item of reqData.roleIds) {
            roleIdsStr += `${item},`;
        }
        reqData.roleIds = roleIdsStr.slice(0, -1);
    }

    if (pageName === "updatePassword") {
        if (reqData.newPassword !== reqData.surePassword) {
            ElMessage({
                type: "warning",
                message: "密码不一致",
                showClose: true
            })
            return ;
        }
    }
    pageName = pageName2uri(pageName);
    let pageUri = `/${pageName}/save`

    if (pageName === "updateUserInfos") pageUri = reqApi.updateUserInfo;
    if (pageName === "updatePasswords") pageUri = reqApi.updatePassword;


    // 【真正请求】
    return zAxios.post<IDataType>({
        url: pageUri,
        data: reqData,
        showLoading: false
    })
}
