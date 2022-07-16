<template>
    <div class="dashboard">

        <el-row :gutter="10">

            <el-col :span="7">
                <zy-card title="分类山商品数量【饼图】">
                    <pie-echart :data="goodsCount"></pie-echart>
                </zy-card>
            </el-col>

            <el-col :span="10">
                <zy-card title="不同城市的销量">
                    <map-echart :mapData="addressStat"></map-echart>
                </zy-card>
            </el-col>

            <el-col :span="7">
                <zy-card title="分类商品数量【玫瑰图】">
                    <rose-echart :data="goodsCount"></rose-echart>
                </zy-card>
            </el-col>

        </el-row>

        <el-row :gutter="10" class="content-row">

            <el-col :span="12">
                <zy-card title="分类商品的销量">
                    <line-echart v-bind="goodsSaleCount"></line-echart>
                </zy-card>
            </el-col>

            <el-col :span="12">
                <zy-card title="分类商品的收藏">
                    <bar-echart v-bind="goodsFavorCount"></bar-echart>
                </zy-card>
            </el-col>

        </el-row>


    </div>
</template>

<script lang="ts">
    import {defineComponent, computed } from 'vue'
    import {ADDRESS_STAT_ACTION, GOODS_STAT_ACTION} from "@/constent";
    import zyCard from '@/base-ui/card';
    import {barEchart, lineEchart, mapEchart, pieEchart, roseEchart} from '@/components/page-echarts';
    import {useMyStore} from "@/store";
    import {IDataType} from "components/page-echarts/types";

    export default defineComponent({
        name: 'Dashboard',
        components: {
            zyCard,
            pieEchart,
            roseEchart,
            lineEchart,
            barEchart,
            mapEchart
        },
        async setup() {

            // 请求数据
            const store = useMyStore();
            await store.dispatch(`dashboard/${GOODS_STAT_ACTION}`);
            await store.dispatch(`dashboard/${ADDRESS_STAT_ACTION}`);

            const goodsStatData = computed(() => {
                return store.state.dashboard.statGoodsCount
            });

            // Echart 图表数据
            const goodsCount: IDataType[] = [];

            const xLabel: any[] = [];
            const values: any[] = [];
            const tempSaleCount: any[] = [];

            const dataAxis: any[] = [];
            const data: any[] = [];
            const tempFavorCount: any[] = [];

            goodsStatData.value.forEach((item) => {
                goodsCount.push({name: item.name, value: item.goodsCount});
                xLabel.push(item.name);
                dataAxis.push(item.name);
                tempSaleCount.push(item.goodsSaleCount);
                tempFavorCount.push(item.goodsFavorCount);
            })

            // 拿到每一个销量
            tempSaleCount.forEach((item) => {
                values.push(item);
            });
            const goodsSaleCount = {xLabel, values};
            // 拿到每一个点赞
            tempFavorCount.forEach(item => {
                data.push(item);
            })
            const goodsFavorCount = {dataAxis, data};

            // 根据地址统计销量
            const addressStat = computed(() => {
                return store.state.dashboard.statAddressCount.map(item => {
                    return {name: item.address, value: item.addressSaleCount};
                })
            })




            return {
                goodsCount,
                goodsSaleCount,
                goodsFavorCount,
                addressStat
            }
        }
    })
</script>

<style scoped lang="less">
    .content-row {
        margin-top: 10px;
    }
</style>
