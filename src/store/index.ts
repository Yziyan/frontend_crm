import {createStore, Store, useStore} from "vuex";

import login from "./login/login"
import system from "./main/system/system"
import dashboard from "./main/analysis/dashboard/dashboard"
import myUserInfo from "./main/user-info/myUserInfo"
import {IRootType, IStoreType} from "./type";
import {LOAD_LOGIN_CACHE} from "@/constent/login/loginConst";
import {
    CHANGE_CATEGORIES,
    CHANGE_DEPARTMENTS,
    CHANGE_ROLES,
    CHANGE_TREE_DIR,
    GET_USER_BY_ID,
    INITIAL_DATA_ACTION, LOAD_USER_INFO_CACHE
} from "@/constent";
import {reqInitialData, reqTreeDir} from "@/service/main/system";
import cache from "@/util/cache";

const store = createStore<IRootType>({
    state: () => {
        return {
            entireDepartment: [],
            entireRole: [],
            entireCategory: [],
            treeDir: []
        }
    },
    getters: {},
    mutations: {
        [CHANGE_ROLES](state, roles) {
            state.entireRole = roles;
        },
        [CHANGE_DEPARTMENTS](state, departments) {
            state.entireDepartment = departments;
        },
        [CHANGE_TREE_DIR](state, treeDir) {
            state.treeDir = treeDir;
        },
        [CHANGE_CATEGORIES](state, categories) {
            state.entireCategory = categories;
        }
    },
    actions: {
        async [INITIAL_DATA_ACTION]({commit}) {

            // 【网络请求数据】
            const departmentResult = await reqInitialData("departments");
            const roleResult = await reqInitialData("roles");
            const categoryResult = await reqInitialData("categories");
            const treeDirResult = await reqTreeDir();

            // 【保存到 Vuex】
            commit(CHANGE_DEPARTMENTS, departmentResult.data);
            commit(CHANGE_ROLES, roleResult.data);
            commit(CHANGE_CATEGORIES, categoryResult.data);
            commit(CHANGE_TREE_DIR, treeDirResult.data);

            // 【保持到 本地缓存】
            cache.saveCache(CHANGE_DEPARTMENTS, departmentResult.data);
            cache.saveCache(CHANGE_ROLES, roleResult.data);
            cache.saveCache(CHANGE_CATEGORIES, categoryResult.data);
            cache.saveCache(CHANGE_TREE_DIR, treeDirResult.data);
        }
    },
    modules: {
        login,
        system,
        myUserInfo,
        dashboard
    }
})

export function setupStore() {
    store.dispatch(`login/${LOAD_LOGIN_CACHE}`);
    store.dispatch(`myUserInfo/${LOAD_USER_INFO_CACHE}`)
}

export function useMyStore(): Store<IStoreType> {
    return useStore();
}

export default store;
