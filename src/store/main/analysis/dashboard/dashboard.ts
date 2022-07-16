import {Module} from "vuex";
import {IDashboard} from "@/store/main/analysis/dashboard/type";
import {IRootType} from "@/store/type";
import {ADDRESS_STAT_ACTION, CHANGE_ADDRESS_STAT, CHANGE_GOODS_STAT, GOODS_STAT_ACTION} from "@/constent";
import {reqAddressStat, reqGoodsStat} from "@/service/main/analysis";


const dashboardModule: Module<IDashboard, IRootType> = {
    namespaced: true,
    state: {
        statGoodsCount: [],
        statAddressCount: []
    },
    mutations: {
        [CHANGE_GOODS_STAT](state, payload) {
            state.statGoodsCount = payload;
        },
        [CHANGE_ADDRESS_STAT](state, payload) {
            state.statAddressCount = payload;
        }
    },
    actions: {
        async [GOODS_STAT_ACTION]({commit}) {
            const statResult = await reqGoodsStat();
            commit(CHANGE_GOODS_STAT, statResult.data);
        },
        async [ADDRESS_STAT_ACTION]({commit}) {
            const addressStatResult = await reqAddressStat();
            commit(CHANGE_ADDRESS_STAT, addressStatResult.data);
        }


    }
}

export default dashboardModule;
