<template>

    <div class="pie-echart">
        <base-echart :option="options">

        </base-echart>
    </div>

</template>


<script lang="ts">
    import baseEchart from "@/base-ui/echart";
    import {IDataType} from "components/page-echarts/types";
    import {computed, defineComponent, PropType} from "vue"

    export default defineComponent({
        name: "pipEchart",
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
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'horizontal',
                        left: 'left'
                    },
                    series: [
                        {
                            name: 'Access From',
                            type: 'pie',
                            radius: '50%',
                            data: props.data,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
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
