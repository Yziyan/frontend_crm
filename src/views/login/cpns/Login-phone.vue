<template>

    <div class="login-phone">
        <el-form label-width="80px" :rules="rules" :model="phone">
            <el-form-item label="手机号" prop="num">
                <el-input v-model="phone.num"/>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
                <div class="get-code">
                    <el-input v-model="phone.code"/>
                    <el-button type="primary" class="get-but">获取验证码</el-button>
                </div>
            </el-form-item>

        </el-form>
    </div>

</template>

<script lang="ts">
    import {defineComponent, reactive} from "vue";
    import {rules} from "@/views/login/config/rules";

    export default defineComponent({
        name: "",
        setup() {
            const phone = reactive({
                num: "",
                code: ""
            })

            const loginAction = () => {
                console.log("手机登录的逻辑");
            }

            return {
                phone,
                rules,
                loginAction
            }

        }
    })
</script>

<style lang="less" scoped>

    .get-code {
        display: flex;
    }
    .get-but {
        margin-left: 8px;
    }

</style>
