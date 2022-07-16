<template>
    <div class="goods">
        <page-search :search-form-config="searchFormConfig"
                     @searchBtn="handleSearchBtn"
                     @resetBtn="handleResetBtn"
                     ref="pageSearchRef"/>

        <page-content :content-table-config="contentTableConfig"
                      page-name="goods"
                      @pageChange="handlePageChange"
                      ref="pageContentRef"
                      @handleNewData="handleNewData"
                      @handleEditData="handleEditData">

            <!-- 图片插槽 -->
            <template #image="scope">
                <el-image
                        style="width: 60px; height: 60px"
                        :src="fullPath(scope.row.imgUrl)"
                        :preview-src-list="[fullPath(scope.row.imgUrl)]"
                        :hide-on-click-modal="true"
                        :preview-teleported="true"
                />
            </template>

            <!-- 价格的插槽 -->
            <template #price="scope">
                {{"￥" + scope.row.newPrice}}
            </template>
        </page-content>

        <page-modal :modal-config="modalConfigRef"
                    page-name="goods"
                    ref="pageModalRef"
                    :default-info="defaultInfo"
                    dialog-width="70%" :other-info="otherInfo">

            <!-- 图片上传插槽 -->
            <div class="upload">
                <el-upload
                        action="#"
                        :limit="1"
                        :on-remove="handleRemove"
                        :http-request="handleRequest"
                        list-type="picture">
                    <el-button type="primary" class="el-upload-button" :disabled="disabled">上传预览图片</el-button>
                    <template #tip>
                        <div class="el-upload__tip">
                            只能上传一张预览的图片呕~~
                        </div>
                    </template>
                </el-upload>
            </div>

        </page-modal>

    </div>
</template>

<script lang="ts">
    import pageContent from '@/components/page-content'
    import {computed, defineComponent, ref} from 'vue'
    import {contentTableConfig} from "@/views/main/product/goods/config/content.config";
    import pageSearch from '@/components/page-search';
    import {searchFormConfig} from './config/search.config';
    import {usePageSearch} from "@/hooks/usePageSearch";
    import {usePageChange} from "@/hooks/usePageChange";
    import {BASE_URL} from "@/service/request/config"
    import pageModal from '@/components/page-modal';
    import {usePageModal} from "@/hooks/usePageModal";
    import { modalConfig } from './config/modal.config';
    import {useMyStore} from "@/store";
    import {UploadProps, UploadRequestOptions} from "element-plus/es";
    import zAxios from "@/service";
    import {IDataType} from "@/service/types";
    import axios from "axios";
    import cache from '@/util/cache';

    export default defineComponent({
        name: 'goods',
        components: {
            pageSearch,
            pageContent,
            pageModal
        },
        setup: function () {
            // 搜索 & 重置
            const [pageContentRef, handleResetBtn, handleSearchBtn] = usePageSearch();

            // 分页信息改变
            const [pageSearchRef, handlePageChange] = usePageChange();

            // 点击编辑按钮，的回调函数
            const otherInfo = ref({})
            const disabled = ref<boolean>(false)
            const newCallBack = (item: any) => {
                // 清空状态
                otherInfo.value = {};
                disabled.value = false;
            }
            const editCallBack = (item: any) => {
                otherInfo.value = {}
                disabled.value = false;

                const imgUrl = item.imgUrl;
                otherInfo.value = {imgUrl}
            }
            // 添加 & 编辑
            const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
                newCallBack, editCallBack, "商品");

            // 图片拼接好Url
            const fullPath = (relativePath: string) => {
                if (relativePath)
                    return BASE_URL + "/" + relativePath;
            }

            // 为配置文件属性赋值
            const modalConfigRef = computed(() => {
                const store = useMyStore();
                const categoryItem = modalConfig.formItems.find((item) => item.field === "categoryId");

                // 所有的二级商品种类
                const categories = store.state.entireCategory.
                filter((item) => item.parentId !== 0).
                sort((c1, c2) => (c1.parentId - c2.parentId));

                categoryItem!.options = categories.map((item) => {
                    return {title: item.name, value: item.id}
                })

                return modalConfig
            })

            const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
                disabled.value = false;
            }

            const handlePreview: UploadProps['onPreview'] = (file) => {
                console.log(file)
            }

            // 重写ElUpload的上传方法
            const handleRequest = (uploadFile: UploadRequestOptions) => {
                disabled.value = true;
                const imgFile = uploadFile.file;
                otherInfo.value = {...otherInfo.value, imgFile};
            }

            return {
                searchFormConfig, pageContentRef, handleSearchBtn, handleResetBtn,
                contentTableConfig, pageSearchRef, handlePageChange,
                modalConfigRef, pageModalRef, defaultInfo, handleNewData, handleEditData,
                fullPath, handleRemove, handlePreview, handleRequest, otherInfo, disabled
            }
        }
    })
</script>

<style scoped lang="less">
    .upload {
        text-align: center;
    }
</style>
