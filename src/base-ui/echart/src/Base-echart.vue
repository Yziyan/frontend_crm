<template>
    <div class="base-echart">
        <div ref="echartDivElRef" :style="{width: width, height: height}">

        </div>
    </div>
</template>

<script lang="ts">

    import {EChartsOption} from "echarts/types/dist/shared";
    import {onMounted, ref, watchEffect, defineComponent, PropType } from "vue";
    import useEchart from "@/base-ui/echart/hooks/useEchart";

    export default defineComponent({
        name: "baseEchart",
        props: {
            option: {
                type: Object as PropType<EChartsOption>,
                required: true
            },
            width: {
                type: String,
                default: "100%"
            },
            height: {
                type: String,
                default: "360px"
            }
        },
        setup(props) {
            const echartDivElRef = ref<HTMLElement>();

            onMounted(() => {

                const {setOptions} = useEchart(echartDivElRef.value!);
                // 若option的数据发生变化是，即时渲染页面
                watchEffect(() => {
                    setOptions(props.option)
                })

            })

            return {
                echartDivElRef
            }
        }
    })


</script>

<style lang="less" scoped>

</style>
