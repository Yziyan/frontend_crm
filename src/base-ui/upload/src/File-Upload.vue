<template>
    <div class="upload-file">
        <el-upload
                class="el-uploader"
                :action="isAction"
                :multiple="isMultiple"
                :drag="isDrag"
                :limit="isLimit"
                :list-type="isListType"
                :file-list="fileList"
                :on-success="handleUploadSuccess"
                :on-preview="handleUploadPreview"
                :on-remove="handleUploadRemove"
                :before-upload="handleUploadBefore"
                :on-change="handleUploadChange"
                :http-request="handleUploadRequest">

            <template #default>
                <slot name="myDefault" >
                    <el-button type="primary">上传文件</el-button>
                </slot>
            </template>
            <template #tip>
                <slot name="myTip"></slot>
            </template>
            <template #file="{ file }">
                <slot name="myFile" :file="file">

                </slot>
            </template>
        </el-upload>

        <!-- 默认用来预览照片墙的插槽 -->
        <slot name="preView">
            <el-dialog v-model="dialogVisible" width="50%">
                <el-image w-full
                          :src="dialogImageUrl"
                          alt="Preview Image"
                          :preview-src-list="[dialogImageUrl]"
                          :hide-on-click-modal="true"
                          :preview-teleported="true"/>
            </el-dialog>
        </slot>


    </div>
</template>

<script lang="ts">
    import {defineComponent, PropType, ref, watch} from "vue";
    import {UploadFile, UploadFiles, UploadProps, UploadRequestOptions, UploadUserFile} from "element-plus/es";
    import ElMessage from "element-plus/lib/components/message";
    import {reqUpload} from "@/service/my-info/myInfo";
    import {UploadRawFile} from "element-plus/es/components/upload/src/upload";

    export default defineComponent({
        name: "FileUpload",
        props: {
            isAction: {
                type: String,
                default: "#"
            },
            isMultiple: {
                type: Boolean,
                default: true
            },
            isDrag: {
                type: Boolean,
                default: false
            },
            isLimit: {
                type: Number,
                default: 1
            },
            isListType: {
                type: String,
                default: "picture"
            },
            fileList: {
                type: Array as PropType<UploadUserFile[]>,
                default: () => []
            }
        },
        emits: ["uploadBefore", "uploadSuccess", "uploadRequest", "uploadRemove", "uploadChange"],
        setup(props, {emit}) {

            // 处理上传之前
            const handleUploadBefore: UploadProps['beforeUpload'] = (rawFile) => {
                emit("uploadBefore", rawFile);
            }


            // 图片改变时
            const fileArray: UploadRawFile[] = []
            const handleUploadChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
                if (uploadFile.raw) {
                    fileArray.push(uploadFile.raw);
                }
                emit("uploadChange", fileArray);
            }

            // 删除图片时
            const handleUploadRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
                // fileArray.forEach((item, index) => {
                //     if (item.uid === uploadFile.raw?.uid) {
                //         fileArray.splice(index, 1);
                //     }
                // })
                emit("uploadRemove", uploadFile);
            }

            // 处理上传的网络请求
            const handleUploadRequest = (uploadFile: UploadRequestOptions) => {
                emit("uploadRequest", fileArray);
            }

            // 处理上传成功
            const handleUploadSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
                emit("uploadSuccess", response, uploadFile);
            }

            // 预览照片
            const dialogImageUrl = ref<string>('')
            const dialogVisible = ref<boolean>(false)
            const handleUploadPreview: UploadProps['onPreview'] = (uploadFile) => {
                dialogImageUrl.value = uploadFile.url!
                dialogVisible.value = true
            }

            const isHiddenIcon = ref<boolean>(false)

            return {
                handleUploadBefore, handleUploadSuccess, handleUploadRequest, handleUploadChange,
                handleUploadPreview, dialogImageUrl, dialogVisible,
                isHiddenIcon, fileArray, handleUploadRemove
            }

        }
    })
</script>

<style lang="less" scoped>
    .upload-file {
        text-align: center;
    }
</style>
