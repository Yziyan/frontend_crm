<template>
    <div class="rose-echart">

        <base-echart :option="options"></base-echart>

    </div>
</template>

<script lang="ts">
    import baseEchart from "@/base-ui/echart";
    import {computed, defineComponent, PropType} from "vue";
    import {IDataType} from "components/page-echarts/types";

    export default defineComponent({
        name: "roseEchart",
        components: {
            baseEchart
        },
        props: {
            data: {
                type: Array as PropType<IDataType[]>,
                required: true
            }
        },
        setup(props) {

            const options = computed(() => {
                return {
                    legend: {
                        top: 'bottom'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    series: [
                        {
                            name: 'Nightingale Chart',
                            type: 'pie',
                            radius: [10, 100],
                            center: ['50%', '50%'],
                            roseType: 'area',
                            itemStyle: {
                                borderRadius: 8
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

