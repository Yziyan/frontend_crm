<template>
    <div class="department">

        <page-search :search-form-config="searchFormConfig"
                     page-name="department"
                     ref="pageSearchRef"
                     @resetBtn="handleResetBtn"
                     @searchBtn="handleSearchBtn"></page-search>

        <page-content :content-table-config="contentTableConfig"
                      page-name="department"
                      ref="pageContentRef"
                      @handleNewData="handleNewData"
                      @handleEditData="handleEditData"
                      @pageChange="handlePageChange"></page-content>

        <page-modal :modal-config="modalConfig"
                    page-name="department"
                    ref="pageModalRef"
                    :default-info="defaultInfo" ></page-modal>

    </div>
</template>

<script lang="ts">
    import pageContent from '@/components/page-content'
    import pageModal from '@/components/page-modal'
    import pageSearch from '@/components/page-search'
import {defineComponent} from 'vue'
    import { contentTableConfig } from './config/content.config'
    import { modalConfig } from './config/modal.config'
    import { searchFormConfig } from './config/search.config'
    import {usePageSearch} from "@/hooks/usePageSearch";
    import {usePageModal} from "@/hooks/usePageModal";
    import {usePageChange} from "@/hooks/usePageChange";

    export default defineComponent({
        name: 'department',
        components: {
            pageContent,
            pageSearch,
            pageModal
        },
        setup() {

            const [pageContentRef, handleResetBtn, handleSearchBtn] = usePageSearch();

            const [pageSearchRef, handlePageChange] = usePageChange();

            const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
                undefined,
                undefined, "部门")

            return {
                searchFormConfig, pageContentRef, handleResetBtn, handleSearchBtn,

                contentTableConfig, pageSearchRef, handlePageChange,

                modalConfig, pageModalRef, defaultInfo, handleNewData, handleEditData
            }
        }
    })
</script>

<style scoped></style>
