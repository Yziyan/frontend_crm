<template>
    <div class="main">
        <el-container class="main-content">
            <el-aside :width="isCollapse ? '60px' : '210px'">
                <nav-menu :collapse="isCollapse"  />
            </el-aside>
            <el-container class="page">
                <el-header class="page-header">
                    <nav-header @changeFold="handelChangeFold"/>
                </el-header>
                <el-main class="page-content">
                    <div class="page-info">

                        <suspense>
                            <template #default>
                                <router-view/>
                            </template>
                            <template #fallback>
                                <div>
                                    Loading...
                                </div>
                            </template>
                        </suspense>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts">
    import NavHeader from "@/components/nav-header";
    import NavMenu from "@/components/nav-menu";
    import {defineComponent, ref} from "vue";

    export default defineComponent({
        name: "Main",
        components: {
            NavMenu,
            NavHeader
        },
        setup() {

            const isCollapse = ref<boolean>(false);

            const handelChangeFold = (isFold: boolean) => {
                isCollapse.value = isFold;
            };

            return {
                isCollapse,
                handelChangeFold
            };
        }
    })
</script>

<style lang="less" scoped>
    .main {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .main-content,
    .page {
        height: 100%;
    }

    .page-content {
        height: calc(100% - 48px);

        .page-info {
            background-color: #fff;
            border-radius: 5px;
        }
    }

    .el-header,
    .el-footer {
        display: flex;
        color: #333;
        text-align: center;
        align-items: center;
    }

    .el-header {
        height: 48px !important;
    }

    .el-aside {
        overflow-x: hidden;
        overflow-y: auto;
        line-height: 200px;
        text-align: left;
        cursor: pointer;
        background-color: #001529;
        transition: width 0.3s linear;
        scrollbar-width: none; /* firefox */
        -ms-overflow-style: none; /* IE 10+ */

        &::-webkit-scrollbar {
            display: none;
        }
    }

    .el-main {
        color: #333;
        text-align: center;
        background-color: #f0f2f5;
    }
</style>
