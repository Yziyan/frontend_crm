<template>
    <div class="zy-bread">
        <el-breadcrumb separator-icon="ArrowRight">
            <template v-for="item in breadcrumbs" :key="item.name">
                <el-breadcrumb-item :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
            </template>
        </el-breadcrumb>
    </div>
</template>

<script lang="ts">
    import {defineComponent, PropType} from "vue";
    import {IBread} from "@/base-ui/breadcrumb";


    export default defineComponent({
        name: "",
        props: {
            breadcrumbs: {
                type: Array as PropType<IBread[]>,
                default: () => []
            }
        },
        setup() {

        }
    })
</script>

<style lang="less" scoped>

</style>
