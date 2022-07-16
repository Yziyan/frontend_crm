<template>
    <div class="header-info">
        <h3 class="title">This is {{nickname}}~</h3>
        <div class="header-info-carousel">
            <template v-if="albums.length > 0">
                <el-carousel indicator-position="outside">
                    <el-carousel-item v-for="item in albums" :key="item">
                        <el-image
                                w-full
                                fit="none"
                                class="header-info-img"
                                :src="fullPath(item)"
                                :preview-src-list="[fullPath(item)]"
                                :hide-on-click-modal="true"
                                :preview-teleported="true"/>
                    </el-carousel-item>
                </el-carousel>
            </template>
            <template v-else>
                <h3>还没有相册呕~</h3>
            </template>
            <div class="edit-album">
                <el-button type="primary" icon="Edit" @click="handleEditBtn">编辑相册</el-button>
            </div>
        </div>


        <el-dialog v-model="dialogVisible"
                   title="编辑相册"
                   width="35%"
                   center
                   :destroy-on-close="true">

            <zy-upload is-list-type="picture-card" :is-limit="9" :file-list="fileList"
                       @uploadChange="handleUploadChange" @uploadRemove="handleUploadRemove">
                <template #myDefault>
                    <el-button type="" size="small" round icon="upload" text bg/>
                </template>
                <template #myTip>
                    <div class="my-tip">选取你的背景吧~~</div>
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
    import {BASE_URL} from "@/service/request/config";
    import {useStore} from "vuex";
    import {getUser} from "@/util/getUser";
    import zyUpload from "@/base-ui/upload";
    import {useUploadFile} from "@/hooks/useUploadFile";
    import {UploadFile, UploadRawFile, UploadUserFile} from "element-plus/es";
    import {getImageFileFromUrl, MapUrlPath} from "@/util/map-urlPath";

    export default defineComponent({
        name: "HeaderInfo",
        components: {
            zyUpload
        },
        setup() {
            const store = useStore();

            // 重新请求的 user
            const user = getUser();
            const nickname = user.nickname;
            const albums: string[] = user.album?.split(",");


            const dialogVisible = ref<boolean>(false)

            const fullUrl = (relativePath: string): string => {
                if (relativePath) return BASE_URL + "/" + relativePath;
                return "";
            }

            const reqFile = new MapUrlPath(user.photo)
            reqFile.importFile((dataUrl) => {
                console.log(reqFile.dataURLtoFile(dataUrl));
            })


            const fileList: any[] = [];
            const matchIndex: number[] = [];
            let tempFileList: any[] = [];
            let isAddFileList: boolean = true

            // 弹出对话框
            const handleEditBtn = () => {
                if (matchIndex.length == 0) {
                    for (let i = 0; i < albums.length; i++) {
                        matchIndex.push(1);
                    }
                }
                dialogVisible.value = true;
                if (isAddFileList) {
                    albums.forEach((item) => {
                        if (item) {
                            fileList.push({
                                url: fullUrl(item),
                            })
                        }
                    })
                    tempFileList = [...fileList]
                    isAddFileList = false
                }
            }

            // 【上传相册】
            const [handleUploadChange, handleSureBtn, fullPath] =
                useUploadFile(dialogVisible, "album", {
                    id: user.id,
                    albumUrl: user.album,
                    album: []
                }, matchIndex)

            const handleUploadRemove = (removeFile: UploadFile) => {
                tempFileList.forEach((item, index) => {
                    if (item.uid == removeFile.uid) {
                        matchIndex[index] = 0;
                    }
                })
            }

            return {
                albums, user, nickname, dialogVisible, fileList, handleUploadRemove,
                fullPath, handleEditBtn, handleUploadChange, handleSureBtn
            }

        }
    })
</script>

<style lang="less" scoped>
    .header-info {
        margin-top: 20px;

        .title {
            margin-right: 500px;
        }

        .header-info-carousel {
            margin: 0 auto;
            width: 45%;

            .header-info-img {
            }
        }
    }
</style>
