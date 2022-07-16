<template>
    <div class="app">
        <el-config-provider :locale="zhCn">
            <router-view/>
        </el-config-provider>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';
    import Login from "@/views/login/Login.vue";
    import zhCn from "element-plus/lib/locale/lang/zh-cn"
    import {ElConfigProvider} from "element-plus";

    export default defineComponent({
        name: 'App',
        components: {
            Login,
            ElConfigProvider
        },
        setup() {

            return {
                zhCn
            }
        }
    });
</script>

<style lang="less">
    .app {
        height: 100%;
    }
</style>
