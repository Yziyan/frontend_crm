import {Module, useStore} from "vuex";
import {ILoginType, IUserInfo} from "@/store/login/type";
import {IRootType} from "@/store/type";
import {accountLoginReq, reqDIR, reqUserInfoById} from "@/service/login/login";
import {IAccount} from "@/service/login/type";
import cache from "@/util/cache";
import router from "@/router";
import {mapDir2Routes, mapDir2Permission} from "@/util/map-dir";
import {
    ACCOUNT_LOGIN_ACTION, CHANGE_CATEGORIES, CHANGE_DEPARTMENTS,
    CHANGE_DIR, CHANGE_ROLES,
    CHANGE_TOKEN, CHANGE_TREE_DIR,
    CHANGE_USER_INFO, GET_USER_BY_ID,
    INITIAL_DATA_ACTION,
    LOAD_LOGIN_CACHE
} from "@/constent";



const loginModule: Module<ILoginType, IRootType> = {
    namespaced: true,
    state() {
        return {
            token: "",
            userInfo: {},
            DIR: [],
            Permissions: []
        }
    },
    getters: {},
    mutations: {
        [CHANGE_TOKEN](state, token: string) {
            state.token = token;
        },
        [CHANGE_USER_INFO](state, userInfo: any) {
            state.userInfo = userInfo;
        },
        [CHANGE_DIR](state, dir: any) {
            state.DIR = dir

            // dir -> routes
            const routes = mapDir2Routes(dir);
            routes.forEach((route) => {
                router.addRoute("main", route)
            });

            // 获取登录用户的权限
            const permissions: string[] = mapDir2Permission(dir);
            state.Permissions = permissions;
        }
    },
    actions: {
        async [ACCOUNT_LOGIN_ACTION]({commit, dispatch}, payload: IAccount) {

            // 1、【实现登录逻辑】
            const loginResult = await accountLoginReq(payload);
            const {id, token} = loginResult.data;
            commit(CHANGE_TOKEN, token);
            cache.saveCache("token", token);

            // 【初始化数据】role department
            dispatch(INITIAL_DATA_ACTION, null, {root: true});

            // 2、【请求用户信息】
            const userInfoResult = await reqUserInfoById(id);
            const userInfo: IUserInfo = userInfoResult.data;
            commit(CHANGE_USER_INFO, userInfo);
            cache.saveCache("userInfo", userInfo);

            // 3、【请求树状结构的菜单】
            // 将用户的角色id用逗号拼接好
            let roleIds: string = "";
            userInfo.roles.map((item: any) => {
                roleIds += `${item.id},`
            })
            const DIRResult = await reqDIR(roleIds.slice(0, -1));
            const DIR = DIRResult.data;
            commit(CHANGE_DIR, DIR);
            cache.saveCache("dir", DIR);


            // 6、【请求用户信息】
             await dispatch(`myUserInfo/${GET_USER_BY_ID}`, id, {root: true});

            // 5、跳转到首页
            await router.push("/main");
        },
        [LOAD_LOGIN_CACHE] ({commit}) {
            const token = cache.getCache("token");
            if (token) {
                commit(CHANGE_TOKEN, token);
            }
            const userInfo = cache.getCache("userInfo");
            if (userInfo) {
                commit(CHANGE_USER_INFO, userInfo);
            }
            const dir = cache.getCache("dir");
            if (dir) {
                commit(CHANGE_DIR, dir);
            }
            const departments = cache.getCache(CHANGE_DEPARTMENTS);
            if (departments) {
                commit(CHANGE_DEPARTMENTS, departments, {root: true});
            }
            const roles = cache.getCache(CHANGE_ROLES);
            if (roles) {
                commit(CHANGE_ROLES, roles, {root: true});
            }
            const treeDir = cache.getCache(CHANGE_TREE_DIR);
            if (treeDir) {
                commit(CHANGE_TREE_DIR, treeDir, {root: true});
            }
            const categories = cache.getCache(CHANGE_CATEGORIES);
            if (categories) {
                commit(CHANGE_CATEGORIES, categories, {root: true});
            }
        }
    }

}

export default loginModule;
