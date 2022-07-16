
import zAxios from "@/service";
import {IAccount, ILoginData} from "@/service/login/type";
import {IDataType} from "@/service/types";

enum LoginAPI {
    AccountLogin = "/users/login",
    LoginUserInfo = "/users/",
    DIR = "/resources/menu",
    AccountLogout = "/users/logout"
}

export function accountLoginReq(account: IAccount) {

    return zAxios.post<IDataType<ILoginData>>({
        url: LoginAPI.AccountLogin,
        data: account
    })

}

export function reqUserInfoById(id: number) {
    return zAxios.get<IDataType>({
        url: LoginAPI.LoginUserInfo + id,
        showLoading: false
    })

}

export function reqDIR(roleIds: string) {
    return zAxios.get<IDataType>({
        url: LoginAPI.DIR,
        params: {
            roleIds
        },
        showLoading: false
    })
}

export function reqLogout() {
    return zAxios.get<IDataType>({
        url: LoginAPI.AccountLogout
    })
}

