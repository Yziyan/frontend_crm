<template>
    <div class="nav-header">
        <el-icon class="fold-menu" @click="changeFold">
            <component :is="isFold ? 'expand': 'fold'"/>
        </el-icon>

        <div class="content">


            <div>
                <zy-bread-crumb :breadcrumbs="breadcrumbs"/>
            </div>
            <div>
                <user-info/>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
    import ZyBreadCrumb, {IBread} from "@/base-ui/breadcrumb";
    import {defineComponent, ref, computed, defineAsyncComponent} from "vue";
    import UserInfo from "./User-info.vue"
    import {useMyStore} from "@/store";
    import {useRoute} from "vue-router";
    import {pathMap2Breadcrumb} from "@/util/map-dir";

    export default defineComponent({
        name: "NavHeader",
        components: {
            UserInfo,
            ZyBreadCrumb
        },
        emits: ["changeFold"],
        setup(props, {emit}) {
            // 是否折叠
            const isFold = ref<boolean>(false);
            const changeFold = () => {
                isFold.value = !isFold.value
                emit("changeFold", isFold.value);
            };


            // 拿到当前路径的面包屑
            const breadcrumbs = computed(() => {
                // 拿到当前菜单
                const store = useMyStore();
                const userDir: any[] = store.state.login.DIR;
                // 拿到当前路径
                const currentPath = useRoute().path;
                return pathMap2Breadcrumb(userDir, currentPath)
            })

            return {
                isFold,
                breadcrumbs,
                changeFold
            }
        }
    })
</script>

<style lang="less" scoped>
    .nav-header {
        display: flex;
        width: 100%;

        .fold-menu {
            font-size: 30px;
            cursor: pointer;
        }

        .content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex: 1;
            padding: 0 20px;
        }
    }
</style>
