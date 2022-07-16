<template>
    <div class="category">


        <page-search :search-form-config="searchFormConfig"
                     page-name="category"
                     @resetBtn="handleResetBtn"
                     @searchBtn="handleSearchBtn"></page-search>

        <page-content :content-table-config="contentTableConfig"
                      page-name="category"
                      ref="pageContentRef"
                      @handleNewData="handleNewData"
                      @handleEditData="handleEditData">

            <template #cateName="scope">
                <span>{{scope.row.children ? `【一级】${scope.row.name}` : scope.row.name}}</span>
            </template>

        </page-content>

        <page-modal :modal-config="modalConfigRef"
                    page-name="category"
                    ref="pageModalRef"
                    :default-info="defaultInfo" ></page-modal>

    </div>
</template>

<script lang="ts">
    import pageContent from '@/components/page-content'
    import pageModal from '@/components/page-modal'
import pageSearch from '@/components/page-search'
import {defineComponent, computed} from 'vue'
    import {contentTableConfig} from "@/views/main/product/category/config/content.config";
    import { searchFormConfig } from './config/search.config';
    import { modalConfig } from './config/modal.config';
    import {usePageModal} from "@/hooks/usePageModal";
    import {usePageSearch} from "@/hooks/usePageSearch";
    import {useMyStore} from "@/store";
    import { ICategory } from '@/store/type';

    export default defineComponent({
        name: 'category',
        components: {
            pageSearch,
            pageContent,
            pageModal
        },
        setup() {


            // 搜索 & 重置
            const [pageContentRef, handleResetBtn, handleSearchBtn] = usePageSearch();


            // 表单的父ID选项
            const store = useMyStore();
            const parentIdItem = modalConfig.formItems.find((item) => item.field === "parentId")

            const newCallBack = () => {
                if (parentIdItem?.options) {
                    parentIdItem?.options?.unshift({title: "【一级】", value: 0})
                }
            }

            // 编辑的回调函数
            const editCallBack = (item: ICategory) => {
                parentIdItem!.disabled = item.parentId === 0;
            }
            // 添加 & 编辑
            const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
                newCallBack,
                editCallBack, "商品种类")

            // 给配置文件的种类赋值
            const modalConfigRef = computed(() => {
                const categories = store.state.entireCategory.
                                    sort((c1, c2) => (c1.parentId - c2.parentId)).
                                    filter((item: any) => item.parentId == 0)

                parentIdItem!.options = categories.map((item) => {
                    return {title: item.name, value: item.id};
                })
                return modalConfig
            })

            return {
                contentTableConfig,

                searchFormConfig, pageContentRef, handleResetBtn, handleSearchBtn,

                modalConfigRef, pageModalRef, defaultInfo, handleNewData, handleEditData

            }
        }
    })
</script>

<style scoped></style>
