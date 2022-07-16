<template>
    <div class="map-echart">
        <base-echart :option="options"></base-echart>
    </div>
</template>

<script lang="ts">
    import baseEchart from "@/base-ui/echart";
    import {computed, defineComponent, PropType} from "vue";
    import {IDataType} from "components/page-echarts/types";

    import convertData from '../utils/convertData'

    export default defineComponent({
        name: "mapEchart",
        components: {
            baseEchart
        },
        props: {
            mapData: {
                type: Array as PropType<IDataType[]>,
                required: true
            }
        },
        setup(props) {


            const options = computed(() => {
                return {
                    tooltip: {
                        padding: 0,
                        enterable: true,
                        transitionDuration: 1,
                        textStyle: {
                            color: '#000',
                            decoration: 'none',
                        },
                        formatter: function (params: any) {
                            return params.name + ' : ' + params.value[2]
                        }
                    },
                    visualMap: {
                        show: true,
                        min: 0,
                        max: 200,
                        left: '10%',
                        top: 'bottom',
                        calculable: true,
                        seriesIndex: [1],
                        inRange: {
                            color: ['#04387b', '#467bc0'] // 蓝绿
                        }
                    },
                    geo: {
                        show: true,
                        map: 'china',
                        emphasis: {
                            show: false,
                            label: {
                                normal: {
                                    show: false
                                },
                            },
                            itemStyle: {
                                normal: {
                                    areaColor: '#023677',
                                    borderColor: '#1180c7',
                                },
                                areaColor: '#4499d0',
                            }
                        },
                        roam: false,
                    },
                    series: [{
                        name: '散点',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(props.mapData),
                        symbolSize: function (value: any) {
                            return value[1] / 5;
                        },
                        emphasis: {
                            show: true,
                            itemStyle: {
                                normal: {
                                    color: '#fff'
                                }
                            },
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true
                                },
                            }
                        },
                    },
                        {
                            type: 'map',
                            layoutCenter: ['30%', '30%'],
                            layoutSize: 100,
                            rome: "true",
                            map: "china",
                            geoIndex: 0,
                            aspectScale: 0.75, //长宽比
                            showLegendSymbol: false, // 存在legend时显示
                            emphasis: {
                                areaColor: '#2B91B7',
                                show: false,
                                textStyle: {
                                    color: '#fff'
                                },
                                label: {
                                    normal: {
                                        show: true
                                    },
                                },
                                itemStyle: {
                                    normal: {
                                        areaColor: '#031525',
                                        borderColor: '#3B5077',
                                    }
                                },
                            },
                            roam: true,
                            animation: false,
                            data: props.mapData
                        },
                        {
                            name: '点',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            zlevel: 6,
                        },
                        {
                            name: 'Top 5',
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: convertData(props.mapData.sort(function (a, b) {
                                return b.value - a.value;
                            }).slice(0, 10)),
                            symbolSize: function (value: any) {
                                return value[1] / 5;
                            },
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            emphasis: {
                                label: {
                                    normal: {
                                        formatter: '{b}',
                                        position: 'left',
                                        show: false
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: 'yellow',
                                        shadowBlur: 10,
                                        shadowColor: 'yellow'
                                    }
                                },
                            },
                            zlevel: 1
                        },

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
