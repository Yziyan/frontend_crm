<template>
    <div class="login-panel">
        <h1 class="title">后台管理系统</h1>

        <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">

            <el-tab-pane name="account">
                <template #label>
                <span class="custom-tabs-label">
             <el-icon>
                 <avatar/>
             </el-icon>
          <span>账号登录</span>
                </span>
                </template>
                <login-account ref="accountRef"/>
            </el-tab-pane>

            <el-tab-pane name="phone">
                <template #label>
                <span class="custom-tabs-label">
             <el-icon><cellphone/></el-icon>
          <span>手机登录</span>
                </span>
                </template>
                <login-phone ref="phoneRef"/>
            </el-tab-pane>

        </el-tabs>

        <div class="account-control">
            <el-checkbox v-model="keepPassword">记住密码</el-checkbox>
            <el-link type="primary" >忘记密码</el-link>
        </div>

        <el-button type="primary" class="logon-btn" @click="handleLogin">立即登录</el-button>
    </div>
</template>

<script lang="ts">
    import {defineComponent, ref} from "vue";
    import LoginAccount from "@/views/login/cpns/Login-account.vue";
    import LoginPhone from "@/views/login/cpns/Login-phone.vue";
    export default defineComponent({
        name: "Login-panel",
        components: {
            LoginAccount,
            LoginPhone
        },
        setup() {
            // 1、定义属性
            const keepPassword = ref<boolean>(false);
            const currentTab = ref<string>("account")
            const accountRef = ref<InstanceType<typeof LoginAccount>>(); // 拿到account组件实例
            const phoneRef = ref<InstanceType<typeof LoginPhone>>(); // 拿到phone组件实例


            // 2、定义函数
            const handleLogin = (): void => {
               // 调用登录逻辑的函数
                if (currentTab.value === "account") {
                    accountRef.value?.loginAction(keepPassword.value);
                } else {
                    phoneRef.value?.loginAction();
                }
            }


            return {
                keepPassword,
                accountRef,
                phoneRef,
                currentTab,
                handleLogin,
            }
        }
    })
</script>

<style lang="less" scoped>
    .login-panel {
        margin-bottom: 150px;
        width: 320px;
    }
    .title {
        text-align: center;
    }
    .account-control {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
    }
    .logon-btn {
        margin-top: 10px;
        width: 100%;

    }
</style>
