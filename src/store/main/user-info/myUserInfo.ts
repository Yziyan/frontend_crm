import {Module} from "vuex";
import {IRootType} from "@/store/type";
import {IUserInfoType} from "@/store/main/user-info/type";
import {CHANGE_USER, GET_USER_BY_ID, LOAD_USER_INFO_CACHE} from "@/constent";
import {reqUserById} from "@/service/my-info/myInfo";
import {IUser} from "@/service/my-info/type";
import cache from "@/util/cache";


const myUserInfoModule: Module<IUserInfoType, IRootType> = {
    namespaced: true,
    state: {
        user: {}
    },
    mutations: {
        [CHANGE_USER](state, user) {
            state.user = user;
        }
    },
    actions: {
        async [GET_USER_BY_ID]({commit}, payload) {
            const userRequest = await reqUserById(payload);
            const user: IUser = userRequest.data;
            cache.saveCache(CHANGE_USER, user);
            commit(CHANGE_USER, user);
        },
        [LOAD_USER_INFO_CACHE]({commit}) {
            const user = cache.getCache(CHANGE_USER);
            if (user) {
                commit(CHANGE_USER, user);
            }
        }
    }

}

export default myUserInfoModule;
