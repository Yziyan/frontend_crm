<template>
    <div class="user">
        <page-search :search-form-config="searchFormConfig"
                     @searchBtn="handleSearchBtn"
                     @resetBtn="handleResetBtn" ref="pageSearchRef" />

        <page-content :content-table-config="contentTableConfig"
                      page-name="user"
                      ref="pageContentRef"
                      @pageChange="handlePageChange"
                      @handleNewData="handleNewData"
                      @handleEditData="handleEditData">

        </page-content>

        <page-modal :modal-config="modalConfigRef"
                    :default-info="defaultInfo"
                    ref="pageModalRef"
                    dialog-width="50%"
                    page-name="user">

        </page-modal>

    </div>
</template>

<script lang="ts">

    import {computed, defineComponent, ref} from 'vue'
    import {searchFormConfig} from "@/views/main/system/user/config/search.config";
    import {contentTableConfig} from './config/content.config';
    import pageContent from '@/components/page-content';
    import pageSearch from '@/components/page-search';
    import {usePageSearch} from "@/hooks/usePageSearch";
    import {usePageChange} from "@/hooks/usePageChange";
    import { modalConfig } from './config/modal.config';
    import pageModal from '@/components/page-modal';
    import {usePageModal} from "@/hooks/usePageModal";
    import {formItemHidden} from "@/util/formItemHidden";
    import {useMyStore} from "@/store";


    export default defineComponent({
        name: 'user',
        components: {
            pageSearch,
            pageContent,
            pageModal
        },
        setup() {

            // 【搜索 & 重置】
            const [pageContentRef, handleResetBtn, handleSearchBtn] = usePageSearch();

            // 【分页信息改变】
            const [pageSearchRef, handlePageChange] = usePageChange();

            // 【编辑 & 保存】
            const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
                // 密码框是否隐藏
                formItemHidden(modalConfig.formItems, "password", false),
                formItemHidden(modalConfig.formItems, "password", true), "用户"
            );

            // 【将配置文件的下拉框赋值】：因为请求数据是异步的，所以将其放在Vuex里的数据加一个 副作用函数
            const modalConfigRef = computed(() => {
                const store = useMyStore();
                const departmentItem = modalConfig.formItems.find((item) => item.field === "departmentId");
                const roleItem = modalConfig.formItems.find((item) => item.field === "roleIds");

                // 给配置的部门选项赋值
                departmentItem!.options =  store.state.entireDepartment.map((item) => {
                    return {title: item.name, value: item.id};
                })
                // 给配置的角色选项赋值
                roleItem!.transData = store.state.entireRole.map((item) => {
                    return {label: item.name, key: item.id};
                })

                return modalConfig
            })

            return {
                //  配置文件
                searchFormConfig, contentTableConfig, modalConfigRef,
                // 页面内容
                pageContentRef, handleSearchBtn, handleResetBtn,
                // 页面搜索
                pageSearchRef, handlePageChange,
                // 页面编辑 & 新建
                pageModalRef, defaultInfo, handleNewData, handleEditData
            }
        }
    })
</script>

<style lang="less" scoped>

</style>
