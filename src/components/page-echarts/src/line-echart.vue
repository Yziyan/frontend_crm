<template>
    <base-echart :option="options"></base-echart>
</template>

<script lang="ts">
    import baseEchart from "@/base-ui/echart";
    import {computed, defineComponent} from "vue";

    export default defineComponent({
        name: "",
        components: {
            baseEchart
        },
        props: {
            xLabel: {
                type: Array,
                required: true
            },
            values: {
                type: Array,
                required: true
            }
        },
        setup(props) {

            const options = computed(() => {
                return {
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: props.xLabel
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data: props.values,
                            type: 'line',
                            areaStyle: {}
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
