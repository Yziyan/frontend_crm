/**
 * 获取对应按钮的权限
 * @param pageName ：渲染页面的名称
 * @param handleName ： 处理按钮的名称
 */
import {useMyStore} from "@/store";

export function usePermission(pageName: string, handleName: string): boolean {


    // 拿到登录用户的所有权限
    const store = useMyStore();
    const permissions: string[] = store.state.login.Permissions;

    // 对应渲染页面所需要的权限【sysUser：create】
    let isPermission: string = '';
    let pageNameUC = pageName.toLowerCase().replace(pageName[0], pageName[0].toUpperCase())
    if (pageNameUC === "Category" || pageNameUC === "Goods") {
        isPermission = `pro${pageNameUC}:${handleName}`;
    } else {
        isPermission = `sys${pageNameUC}:${handleName}`;
    }

    // 是否能找到【找到就是有值】 ！！：是为了转成boolean
    return  !!permissions.find((item) => item === isPermission);
}
