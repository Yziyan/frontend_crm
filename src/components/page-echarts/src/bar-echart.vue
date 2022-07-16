<template>
    <div class="bar-echart">
        <base-echart :option="options"></base-echart>
    </div>
</template>

<script lang="ts">
    import baseEchart from "@/base-ui/echart";
    import * as echarts from "echarts";
    import {computed, defineComponent} from "vue";

    export default defineComponent({
        name: "barEchart",
        components: {
            baseEchart
        },
        props: {
            dataAxis: {
                type: Array,
                required: true
            },
            data: {
                type: Array,
                required: true
            }
        },
        setup(props) {

            const options = computed(() => {
                return {
                    xAxis: {
                        data: props.dataAxis,
                        axisLabel: {
                            inside: true,
                            color: '#fff'
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        z: 10
                    },
                    yAxis: {
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            color: '#999'
                        }
                    },
                    dataZoom: [
                        {
                            type: 'inside'
                        }
                    ],
                    series: [
                        {
                            type: 'bar',
                            showBackground: true,
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    { offset: 0, color: '#83bff6' },
                                    { offset: 0.5, color: '#188df0' },
                                    { offset: 1, color: '#188df0' }
                                ])
                            },
                            emphasis: {
                                itemStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        { offset: 0, color: '#2378f7' },
                                        { offset: 0.7, color: '#2378f7' },
                                        { offset: 1, color: '#83bff6' }
                                    ])
                                }
                            },
                            data: props.data
                        }
                    ]
                };
            })

            return {
                options
            }

        }
    })
</script>

<style lang="less" scoped>

</style>
