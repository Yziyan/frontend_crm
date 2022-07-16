<template>
    <div class="role">
        <page-search :search-form-config="searchFormConfig"
                     @resetBtn="handleResetBtn"
                     @searchBtn="handleSearchBtn" ref="pageSearchRef"></page-search>

        <page-content :content-table-config="contentTableConfig"
                      page-name="role"
                      ref="pageContentRef"
                      @pageChange="handlePageChange"
                      @handleNewData="handleNewData"
                      @handleEditData="handleEditData"></page-content>

        <page-modal :modal-config="modalConfig"
                    page-name="role"
                    :default-info="defaultInfo"
                    ref="pageModalRef"
                    :other-info="otherInfo">

            <!-- 默认插槽 -->
            <div class="el-tree">
                <span>角色权限：</span>
                <el-input class="el-input-search"
                          v-model="filterText"
                          placeholder="搜索角色权限"/>
                <el-tree
                        :data="treeData"
                        show-checkbox
                        node-key="id"
                        @check="handleChecked"
                        :props="defaultProps"
                        :default-expanded-keys="expandKeys"
                        :accordion="true"
                        ref="elTreeRef"
                        :filter-node-method="filterNode"
                />

            </div>
        </page-modal>

    </div>
</template>

<script lang="ts">
    import pageContent from '@/components/page-content'
    import {defineComponent, computed, ref, watch, nextTick} from 'vue'
    import {contentTableConfig} from "@/views/main/system/role/config/content.config";
    import pageSearch from '@/components/page-search';
    import {searchFormConfig} from "@/views/main/system/role/config/search.config";
    import {usePageSearch} from "@/hooks/usePageSearch";
    import {usePageChange} from "@/hooks/usePageChange";
    import pageModal from '@/components/page-modal';
    import {modalConfig} from './config/modal.config';
    import {usePageModal} from "@/hooks/usePageModal";
    import {useMyStore} from "@/store";
    import {reqDIR} from "@/service/login/login";
    import {mapDir2TreeLeaf} from "@/util/map-dir";
    import {ElTree} from "element-plus/es";

    export default defineComponent({
        name: 'role',
        components: {
            pageSearch,
            pageContent,
            pageModal
        },
        setup() {

            // 搜索 & 重置
            const [pageContentRef, handleResetBtn, handleSearchBtn] = usePageSearch();

            // 分页数据改变时
            const [pageSearchRef, handlePageChange] = usePageChange();

            // 添加 & 编辑
            const elTreeRef = ref<InstanceType<typeof ElTree>>()
            const expandKeys = ref<number[]>();
            const editCallBack = async (item?: any) => { // 编辑的回调
                // 将默认暂开先置空
                expandKeys.value = [];
                // 1、请求角色的目录
                const {data: roleDir} = await reqDIR(item.id);
                // 2、获取 tree的 叶子
                const leafKeys = mapDir2TreeLeaf(roleDir);

                expandKeys.value = leafKeys;
                // 3、回显原先拥有的角色
                elTreeRef.value?.setCheckedKeys(leafKeys);
            }
            const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
                undefined, editCallBack, "角色");

            // 展示所有资源【树状结构】
            const store = useMyStore();
            const defaultProps = {
                children: 'children',
                label: 'name',
            }
            const treeData = computed(() => store.state.treeDir)

            // 选择时
            const otherInfo = ref({})
            const handleChecked = (data1: any, data2: any) => {
                const checkedKeys = data2.checkedKeys;
                const halfCheckedKeys = data2.halfCheckedKeys;
                const resIds = [...checkedKeys, ...halfCheckedKeys]
                otherInfo.value = {resIds}
            }

            // 搜索 tree
            const filterText = ref('')
            watch(filterText, (val) => {
                elTreeRef.value!.filter(val)
            })
            const filterNode = (value: string, data: any) => {
                if (!value) return true
                return data.name?.includes(value)
            }

            return {
                searchFormConfig, contentTableConfig, modalConfig,
                pageSearchRef, handleResetBtn, handleSearchBtn,
                pageContentRef, handlePageChange,
                pageModalRef, defaultInfo, handleNewData, handleEditData,
                defaultProps, treeData, otherInfo, handleChecked,
                elTreeRef, filterNode, filterText, expandKeys
            }
        }
    })
</script>

<style scoped lang="less">
    .el-tree {
        margin-top: 10px;
        margin-left: 20px;
        padding: 8px;
        background-color: #f5f5f5;

        .el-input-search {
            width: 40%;
        }
    }

</style>
