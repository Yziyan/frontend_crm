import {RouteRecordRaw} from "vue-router";
import {IBread} from "@/base-ui/breadcrumb";


// 第一个路由对象
let firstMenu: any = null;

export function mapDir2Routes(userDir: any): RouteRecordRaw[] {

    const routes: RouteRecordRaw[] = [];
    // 1、先加载默认所有的routes
    const allRoutes: RouteRecordRaw[] = [];
    const routeFiles = require.context("../router/main", true, /\.ts/);
    routeFiles.keys().forEach((key) => {
        // 根据文件路径。拿出该文件导出的对象
        const route = require("../router/main" + key.split(".")[1]);
        allRoutes.push(route.default);
    });
    // 2、根据菜单获取需要添加的routes
    const _recurseGetDir = (dirs: any) => {
        for (const dir of dirs) {
            if (dir.children) {
                for (const userMenu of dir.children) {
                    const route = allRoutes.find((ro) => ro.path === userMenu.uri);
                    if (route) routes.push(route);
                    // 拿到第一个注册路由的菜单
                    if (!firstMenu) firstMenu = userMenu;
                }
            }
        }
    }

    _recurseGetDir(userDir);

    return routes;

}

// 路径映射面包屑
export function pathMap2Breadcrumb(userDir: any[], currentPath: string): IBread[] {
    // 面包屑
    const myBread: IBread[] = [];
    // 给面包屑赋值
    pathMap2Menu(userDir, currentPath, myBread);
    return myBread;

}

// 路径映射菜单
export function pathMap2Menu(userDir: any[], currentPath: string, breadcrumb?: IBread[]): any {

    // 遍历一级目录
    for (const dir of userDir) {
        if (dir.type === 0) { // 说明是目录
            // 用子资源调用
            const findMenu = pathMap2Menu(dir.children ?? [], currentPath);
            if (findMenu) {
                // 添加面包屑
                // 一级
                breadcrumb?.push({name: dir.name});
                // 二级
                breadcrumb?.push({name: findMenu.name});
                return findMenu;
            }

        } else if (dir.type === 1 && dir.uri === currentPath) { // 说明是菜单【有对应路由】
            return dir;
        }
    }
}

// 菜单映射到权限
export function mapDir2Permission(userDir: any[]): string[] {
    // 最终权限的字符串数组
    const permissions: string[] = [];

    // 递归函数【找出type == 2 的按钮】
    const _recurseGetPermission = (menus: any[]) => {
        for (const menu of menus) {
            if (menu.type === 0 || menu.type === 1) { // 说明是目录和菜单【递归调用】
                _recurseGetPermission(menu.children ?? []);
            } else if (menu.type === 2) { // 说明是按钮【需要赋予权限】
                permissions.push(menu.permission);
            }
        }
    }

    _recurseGetPermission(userDir);
    return permissions;
}

export function mapDir2TreeLeaf(roleDir: any[]) {

    // 最终的 【tree Leaf】
    const treeLeaf: number[] = [];

    // 递归函数【只找树的叶子】
    const _recurseGetTreeLeaf = (roleRes: any[]) => {
        for (const item of roleRes) {

            if (item.children) {
                _recurseGetTreeLeaf(item.children);
            } else {
                treeLeaf.push(item.id);
            }
        }
    }
    _recurseGetTreeLeaf(roleDir);

    return treeLeaf;
}

export {firstMenu}
