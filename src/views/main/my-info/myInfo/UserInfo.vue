<template>
    <div class="user-info">
        <el-container>
            <el-header height="400px" class="el-header">
                <header-info></header-info>
            </el-header>
            <el-main class="el-main">
                <content-info></content-info>
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from "vue";
    import HeaderInfo from "@/views/main/my-info/header-info/HeaderInfo.vue";
    import ContentInfo from "@/views/main/my-info/content-info/ContentInfo.vue";

    export default defineComponent({
        name: "UserInfo",
        components: {
            HeaderInfo,
            ContentInfo
        },
        setup() {

        }
    })
</script>

<style lang="less" scoped>
    .el-header {
        border-bottom: 1px solid red;
        background-color: #EBEDF0;
    }
    .el-main {
    }
</style>
