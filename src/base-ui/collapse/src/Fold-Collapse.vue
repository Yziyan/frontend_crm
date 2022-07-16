<template>
    <div class="fold-collapse">
        <el-collapse accordion v-bind="user">

            <el-collapse-item title="用户名" name="1">
                <span>{{user.name}}</span>
            </el-collapse-item>

            <el-collapse-item title="真实姓名" name="2">
                <span>{{user.nickname}}</span>
            </el-collapse-item>

            <el-collapse-item title="电话号码" name="3">
                <span>{{user.cellphone}}</span>
            </el-collapse-item>

            <el-collapse-item title="所属部门" name="4">
                <h4>{{department.name}}</h4>
            </el-collapse-item>

            <el-collapse-item title="角色信息" name="5" class="el-fold-role">

                <el-collapse v-for="(item, index) in roles" :key="item.id" class="el-fold-role-fold">
                    <el-collapse-item :title="`角色 ${index + 1}`" :name="`${index}-${item.id}`">
                        <span class="el-fold-span-key">角色名称：</span>
                        <h4 class="el-fold-h4-value">{{item.name}}</h4>
                        <br>
                        <span class="el-fold-span-key">角色简介：</span>
                        <h4 class="el-fold-h4-value">{{item.intro}}</h4>
                    </el-collapse-item>
                </el-collapse>

            </el-collapse-item>

        </el-collapse>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from "vue";
    import {getUser} from "@/util/getUser";
    import cache from "@/util/cache";
    import {CHANGE_DEPARTMENTS, CHANGE_ROLES} from "@/constent";
    import {useStore} from "vuex";
    import {IDepartment, IRoleType} from "@/store/main/system/type";

    export default defineComponent({
        name: "FoldCollapse",

        setup() {

            const store = useStore();

            const userInfo = store.state.login.userInfo;
            const user = getUser();
            const department: IDepartment = userInfo.department;
            const roles: IRoleType[] = userInfo.roles;


            return {
                user, department, roles
            }
        }
    })
</script>

<style lang="less" scoped>

    .fold-collapse {

        .el-fold-role {

            .el-fold-role-fold {
                margin-left: 30px;
            }

            .el-fold-span-key {
            }
            .el-fold-h4-value {
                display: inline-block;
                padding: 5px 5px;
                color: #c62f87;
                background: #aab6c6;
            }
        }
    }

</style>
