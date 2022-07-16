<template>
    <div class="user-info">
        <el-dropdown>
            <span class="el-dropdown-link">
                      <el-tooltip
                              effect="dark"
                              content="点击更换头像"
                              placement="left-end">

                            <el-avatar @click="handlePhotoClick"
                                       :src="fullPath(userPhoto)"/>
                      </el-tooltip>
                <span class="name" @click="handle2UserInfo">{{nickName}}</span>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item icon="CloseBold" @click="handleLogout">退出登录</el-dropdown-item>
                    <el-dropdown-item divided @click="handle2UserInfo">用户信息</el-dropdown-item>
                    <el-dropdown-item divided icon="edit" @click="handleEditInfo">修改信息</el-dropdown-item>
                    <el-dropdown-item divided @click="handle2login">登录页面</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>

        <page-modal :modal-config="modalInfoConfig"
                    ref="pageModalInfoRef"
                    page-name="updateUserInfo"
                    :default-info="defaultUserInfo">
            <el-button icon="edit" @click="handleEditPassword">修改密码</el-button>
        </page-modal>

        <page-modal :modal-config="modalPasswordConfig"
                    ref="pageModalPasswordRef"
                    page-name="updatePassword"
                    :default-info="defaultPasswordInfo"></page-modal>


        <el-dialog v-model="dialogVisible"
                   title="修改头像"
                   width="30%"
                   center
                   :destroy-on-close="true">

            <zy-upload is-list-type="picture" :is-limit="1"
                       @uploadChange="handleUploadChange">
                <template #myDefault>
                    <el-button type="primary" class="el-upload-but">上传头像</el-button>
                </template>
                <template #myTip>
                    <div class="my-tip">只能上传一张呕~~</div>
                </template>

            </zy-upload>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleSureBtn">确定</el-button>
                </span>
            </template>

        </el-dialog>

    </div>
</template>


<script lang="ts">
    import {defineComponent, computed, ref} from "vue";
    import {useStore} from "vuex";
    import cache from "@/util/cache";
    import {useRouter} from "vue-router";
    import {reqLogout} from "@/service/login/login";
    import {GET_USER_BY_ID, TOKEN} from "@/constent";
    import zyUpload from "@/base-ui/upload";
    import {getUser} from "@/util/getUser";
    import {useUploadFile} from "@/hooks/useUploadFile";
    import pageModal from "@/components/page-modal";
    import { modalInfoConfig } from "../config/modalInfo.config";
    import {modalPasswordConfig} from "../config/modalPassword.config";

    export default defineComponent({
        name: "UserInfo",
        components: {
            zyUpload,
            pageModal
        },
        setup() {
            const store = useStore();
            const roter = useRouter();

            const user = getUser();
            const nickName = user.nickname;
            const userPhoto = user.photo;

            // 【退出登录】
            const handleLogout = async () => {
                // 让服务器和本地清除缓存
                await reqLogout();
                cache.removeCache(TOKEN);
                await roter.push("/main");
            }

            // 【回到登录页】
            const handle2login = () => {
                roter.push("/login");
            }

            // 去用户编辑页
            const handle2UserInfo = () => {
                roter.push("/main/myInfo/userInfo");
                // 发送网络请求
                // 加载用户信息
                store.dispatch(`myUserInfo/${GET_USER_BY_ID}`, user.id);
            }

            // 弹出对话框
            const dialogVisible = ref<boolean>(false)
            const handlePhotoClick = () => {
                roter.push("/main/myInfo/userInfo");
                dialogVisible.value = true;
            }

            // 点击头像【上传头像】
            const [handleUploadChange, handleSureBtn, fullPath] =
                useUploadFile(dialogVisible, "photo", {
                id: user.id,
                photoUrl: user.photo
            })


            const pageModalInfoRef = ref<InstanceType<typeof pageModal>>();
            const pageModalPasswordRef = ref<InstanceType<typeof  pageModal>>();
            const defaultUserInfo = ref({})
            const defaultPasswordInfo = ref({})
            // 编辑个人信息
            const handleEditInfo = () => {
                roter.push("/main/myInfo/userInfo");
                pageModalInfoRef!.value!.dialogTitle = "修改信息";
                pageModalInfoRef!.value!.dialogVisible = true;
                defaultUserInfo.value = {id: user.id, nickname: user.nickname, cellphone: user.cellphone}
            }

            // 修改密码
            const handleEditPassword = () => {
                pageModalPasswordRef!.value!.dialogTitle = "修改密码";
                pageModalPasswordRef!.value!.dialogVisible = true;
                defaultPasswordInfo.value = {id: user.id}
                pageModalInfoRef!.value!.dialogVisible = false;
            }


            return {
                nickName, userPhoto,
                handleLogout,
                handle2login,
                handle2UserInfo,
                fullPath,
                handlePhotoClick, handleUploadChange,
                dialogVisible, handleSureBtn, handleEditInfo, handleEditPassword,
                modalInfoConfig, pageModalInfoRef, modalPasswordConfig, pageModalPasswordRef,
                defaultUserInfo, defaultPasswordInfo
            }

        }
    })

</script>


<style lang="less" scoped>

    .el-dropdown-link {
        display: flex;
        cursor: pointer;
        align-items: center;
    }

    .my-tip {
        margin: 10px 0;
    }

    .name {
        margin-left: 10px;
    }

    .el-upload-but {
        margin-right: 380px;
    }


</style>
