import {Module} from "vuex";
import {IRootType} from "@/store/type";
import {ISystemType} from "@/store/main/system/type";
import {
    DELETE_DATA_ACTION,
    LIST_PAGE_ACTION,
    PAGE_LIST_COUNT,
    SAVE_UPDATE_ACTION, TOKEN
} from "@/constent";
import {reqDelete, reqTreeDir, reqList, reqSaveOrUpdate, reqCategoryTree} from "@/service/main/system";
import {PAGE_LIST_DATA} from "@/constent/system/systemConst";
import pageName2uri from "@/util/pageName2uri";
import {ElMessage, ElNotification} from "element-plus";
import cache from "@/util/cache";
import router from "@/router";


const pageMap2Path = {
    user: "users/list",
    role: "roles/list"
}

const systemModule: Module<ISystemType, IRootType> = {
    namespaced: true,
    state: {
        userList: [],
        userCount: 0,
        roleList: [],
        roleCount: 0,
        goodsCount: 0,
        goodsList: [],
        dirMenu: [],
        query: {},
        categoryList: [],
        departmentCount: 0,
        departmentList: []
    },
    getters: {
        [PAGE_LIST_DATA](state) {
            return (pageName: string) => {
                // 取出state对象里 属性名字为 `${pageName}List`的值
                if (pageName === "menu") return state.dirMenu;
                return (state as any)[`${pageName}List`];
            };
        },
        [PAGE_LIST_COUNT](state) {
            return (pageName: string) => {
                return (state as any)[`${pageName}Count`];
            };
        }
    },
    mutations: {
        changeUserList(state, list) {
            state.userList = list;
        },
        changeUserCount(state, count) {
            state.userCount = count;
        },
        changeRoleList(state, list) {
            state.roleList = list;
        },
        changeRoleCount(state, count) {
            state.roleCount = count;
        },
        changeGoodsList(state, list) {
            state.goodsList = list;
        },
        changeGoodsCount(state, count) {
            state.goodsCount = count;
        },
        changeDirMenu(state, list) {
            state.dirMenu = list;
        },
        changeQuery(state, query) {
            state.query = query;
        },
        changeCategoryList(state, list) {
            state.categoryList = list;
        },
        changeDepartmentList(state, list) {
            state.departmentList = list;
        },
        changeDepartmentCount(state, count) {
            state.departmentCount = count;
        }
    },
    actions: {
        async [LIST_PAGE_ACTION]({commit}, payload) {

            // 【处理传过来的数据】
            // 将查询信息，保存起来
            commit("changeQuery", payload.query);
            let pageUri: string = "";
            let pageName: string = payload.pageName;
            let pageNameUC = pageName.toLowerCase().replace(pageName[0], pageName[0].toUpperCase())

            // 【根据不同名称请求对应的数据】
            if (pageName === "menu") { // 目录
                const dirResult = await reqTreeDir();
                commit("changeDirMenu", dirResult.data);
                return;
            }

            if (pageName === "category") {
                const categoryTreeResult = await reqCategoryTree(payload.query?.keyword);
                commit("changeCategoryList", categoryTreeResult.data);
                return;
            }

            pageName = pageName2uri(pageName)
            pageUri = `/${pageName}/list`;

            // 【请求数据】
            const pageResult = await reqList(pageUri, payload.query);
            const {data, count} = pageResult;

            if (pageResult?.code === 0) {

                if (count) {
                    ElNotification({
                        title: 'Success',
                        message: "数据加载成功~",
                        type: 'success',
                        duration: 2000
                    })
                } else {
                    ElNotification({
                        title: 'Info',
                        message: "没有对应的数据呕~",
                        type: 'info',
                    })
                }


            }

            // 【修改state的数据】 提交给mutations
            commit(`change${pageNameUC}List`, data);
            commit(`change${pageNameUC}Count`, count);
        },
        async [DELETE_DATA_ACTION]({dispatch, state}, payload) {

            // 【请求删除接口】
            const data = await reqDelete(payload.pageName, payload.ids);

            if (data?.code === 0) {

                ElMessage({
                    showClose: true,
                    message: data?.msg || "操作成功",
                    type: "success"
                })

                // 【重新请求数据】
                dispatch(LIST_PAGE_ACTION, {
                    pageName: payload.pageName,
                    query: state.query
                });
            }


        },
        async [SAVE_UPDATE_ACTION]({dispatch, state}, payload) {

            // 【处理对应数据】
            const {pageName, reqData} = payload;

            // 【请求保存或者更新的接口】
            const data = await reqSaveOrUpdate(pageName, {...reqData});

            if (data?.code === 0) {
                ElNotification({
                    title: 'Success',
                    message: data?.msg || 'This is a success message',
                    type: 'success',
                })

                // 保存成功请求最新数据
                dispatch(LIST_PAGE_ACTION, {
                    pageName,
                    query: state.query
                })
            }

            if (data?.code === 70004) {
                cache.removeCache(TOKEN);
                await router.push("/main");
            }

        }
    }

}

export default systemModule
