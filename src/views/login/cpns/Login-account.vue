<template>
    <div class="login-account">
        <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
            <el-form-item label="账号" prop="name">
                <el-input v-model="account.name"  />
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input v-model="account.password" show-password/>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
    import {defineComponent, reactive, ref} from "vue";
    import {rules} from "@/views/login/config/rules";
    import {ElForm} from "element-plus/es";
    import cache from "@/util/cache";
    import {useStore} from "vuex";
    import {ACCOUNT_LOGIN_ACTION} from "@/constent/login/loginConst";

    export default defineComponent({
        name: "Login-account",
        setup() {
            const store = useStore();


            const account = reactive({
                name: cache.getCache("name") ?? "",
                password: cache.getCache("password") ?? ""
            })

            const formRef = ref<InstanceType<typeof ElForm>>()

            const loginAction = (keepPassword: boolean) => {
                formRef.value?.validate((valid) => {
                    if (valid) { // 说明表单验证通过了

                        // 记住密码
                        if (keepPassword) {
                            cache.saveCache("name", account.name);
                            cache.saveCache("password", account.password);
                        } else {
                            cache.removeCache("name");
                            cache.removeCache("password");
                        }

                        // 开始登录验证
                        store.dispatch(`login/${ACCOUNT_LOGIN_ACTION}`, {...account})

                    }
                });
            }




            return {
                account,
                rules,
                loginAction,
                formRef
            }
        }
    })
</script>

<style scoped lang="less">

</style>