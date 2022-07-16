<template>
    <div class="nav-menu">
        <div class="logo">
            <img class="img" src="~@/assets/img/logo.svg" alt="logo">
            <span v-if="!collapse" class="title">Vue3 + TS</span>
        </div>

        <el-menu :default-active="defaultActive"
                 class="el-menu-vertical"
                 :collapse="collapse"
                 background-color="#0c2135"
                 text-color="#b7bdc3"
                 active-text-color="#0a60bd">

            <template v-for="item in userDir" :key="item.id">
                <!-- 说明是目录 -->
                <template v-if="item.type === 0">

                    <!-- 说明是可以展开的 -->
                    <template v-if="item.children">
                        <el-sub-menu :index="item.id + ''">
                            <template #title>

                                <el-icon v-if="item.icon">
                                    <component :is="item.icon"/>
                                </el-icon>

                                <span>{{item.name}}</span>
                            </template>

                            <!-- 菜单 -->
                            <template v-for="subItem in item.children" :key="subItem.id">

                                <el-menu-item :index="subItem.id + ''" @click="handleDirItemClick(subItem)">
                                    <el-icon v-if="subItem.icon">
                                        <component :is="subItem.icon"/>
                                    </el-icon>
                                    <span>{{subItem.name}}</span>
                                </el-menu-item>

                            </template>


                        </el-sub-menu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.id + ''">
                            <el-icon v-if="item.icon">
                                <component :is="item.icon"/>
                            </el-icon>
                            <span>{{item.name}}</span>
                        </el-menu-item>
                    </template>


                </template>


            </template>


        </el-menu>

    </div>

</template>

<script lang="ts">
    import {computed, defineComponent, ref} from "vue";
    import {useMyStore} from "@/store";
    import {useRouter, useRoute} from "vue-router";
    import {pathMap2Menu} from "@/util/map-dir";

    export default defineComponent({
        name: "NavMenu",
        props: {
            collapse: {
                type: Boolean,
                default: false
            }
        },
        setup() {
            const store = useMyStore();
            const userDir = computed(() => store.state.login.DIR)
            // 路由对象
            const router = useRouter();

            // 当前使用的路由路径
            const currentPath: string = useRoute().path;

            // 拿到当前的菜单选项
            const currentMenu: any = pathMap2Menu(userDir.value, currentPath);

            const defaultActive = ref<string>(currentMenu?.id + "");

            const handleDirItemClick = (item: any) => {
                router.push({
                    path: item.uri ?? "/not-found"
                })
            }

            return {
                userDir,
                handleDirItemClick,
                defaultActive
            }
        }
    })
</script>

<style lang="less" scoped>
    .nav-menu {
        height: 100%;
        background-color: #001529;

        .logo {
            display: flex;
            height: 28px;
            padding: 12px 10px 8px 10px;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;

            .img {
                height: 100%;
                margin: 0 10px;
            }

            .title {
                font-size: 16px;
                font-weight: 700;
                color: white;
            }
        }

        .el-menu {
            border-right: none;
        }

        // 目录
        .el-submenu {
            background-color: #001529 !important;
            // 二级菜单 ( 默认背景 )
            .el-menu-item {
                padding-left: 50px !important;
                background-color: #0c2135 !important;
            }
        }

        ::v-deep .el-submenu__title {
            background-color: #001529 !important;
        }

        // hover 高亮
        .el-menu-item:hover {
            color: #fff !important; // 菜单
        }

        .el-menu-item.is-active {
            color: #fff !important;
            background-color: #0a60bd !important;
        }
    }

    .el-menu-vertical:not(.el-menu--collapse) {
        width: 100%;
        height: calc(100% - 48px);
    }

</style>
