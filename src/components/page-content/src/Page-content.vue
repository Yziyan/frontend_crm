<template>
    <div class="page-content">
        <zy-table :list-data="dataList"
                  :list-count="dataCount ?? 0"
                  v-bind="contentTableConfig"
                  v-model:page="pageInfo">

            <template #handler>
                <el-button type="primary" v-if="isCreate" @click="handleNewBtn">新建</el-button>
                <el-button icon="Refresh"/>
            </template>

            <!-- 状态 -->
            <template #state="scope">
                <el-switch :model-value="scope.row.enable === 1"
                           inline-prompt
                           size="large"
                           active-text="启用"
                           disabled
                           :width="50"
                           active-color="#FF0EAC"
                           inactive-text="禁用"/>
                <!--<el-button-->
                <!--        plain-->
                <!--        size="small"-->
                <!--        disabled-->
                <!--        :type="scope.row.enable === 1 ? 'success' : 'danger'">-->

                <!--    {{scope.row.enable === 1 ? "启用" : "禁用"}}-->
                <!--</el-button>-->
            </template>

            <!-- 时间的插槽 -->
            <template #createAt="scope">
                <span> {{$filters.formatTime(scope.row.createdTime)}}</span>
            </template>

            <!-- 操作的插槽 -->
            <template #operation="scope">
                <div class="operation-btn">
                    <el-button icon="Remove"
                               type="text"
                               v-if="isDelete"
                               @click="handleDeleteBtn(scope.row)">删除
                    </el-button>

                    <el-button icon="Edit" type="text" v-if="isUpdate" @click="handleEditBtn(scope.row)">编辑</el-button>
                </div>
            </template>

            <!-- 图标插槽 -->
            <template #icon="scope">
                <template v-if="scope.row.icon">
                    <el-icon>
                        <component :is="scope.row.icon"/>
                    </el-icon>
                </template>
            </template>

            <!-- 动态添加其余的插槽 -->
            <template v-for="item in otherPropSlots" :key="item.prop" #[item.slotName]="scope">
                <template v-if="item.slotName">
                    <slot :name="item.slotName" :row="scope.row"></slot>
                </template>
            </template>


        </zy-table>
    </div>
</template>

<script lang="ts">
    import zyTable from "@/base-ui/table";
    import {computed, defineComponent, ref, watch} from "vue";
    import {useMyStore} from "@/store";
    import {DELETE_DATA_ACTION, LIST_PAGE_ACTION, PAGE_LIST_COUNT, PAGE_LIST_DATA} from "@/constent";
    import {usePermission} from "@/hooks/usePermission";
    import {ElMessage, ElMessageBox} from 'element-plus';

    export default defineComponent({
        name: "Page-content",
        components: {
            zyTable
        },
        props: {
            contentTableConfig: {
                type: Object,
                require: true
            },
            pageName: {
                type: String,
                require: true
            }
        },
        emits: ["pageChange", "handleNewData", "handleEditData"],
        setup(props, {emit}) {
            const store = useMyStore();

            //【鉴权】：查看对应权限
            const isCreate: boolean = usePermission(`${props.pageName}`, "create");
            const isUpdate: boolean = usePermission(`${props.pageName}`, "update");
            const isDelete: boolean = usePermission(`${props.pageName}`, "delete");
            const isQuery: boolean = usePermission(`${props.pageName}`, "query");

            // 【分页】
            // 分页的信息
            const pageInfo = ref({currentPage: 1, pageSize: 10});
            // 分页信息改变后，通知父组件重新发送网络请求
            watch(pageInfo, () => emit("pageChange"));

            // 【发送网络请求】
            const listPageData = (searchInfo: any = {}) => {
                if (!isQuery) return; // 【没有查询权限】：直接不发请求
                store.dispatch(`system/${LIST_PAGE_ACTION}`, {
                    pageName: props.pageName,
                    query: {
                        page: pageInfo.value.currentPage,
                        size: pageInfo.value.pageSize,
                        ...searchInfo
                    }
                });
            };
            // 初始化页面发送的网络请求
            listPageData();

            // 【从Vuex里获取数据】
            // 表格数据
            const dataList = computed(() => {
                return store.getters[`system/${PAGE_LIST_DATA}`](props.pageName);
            });
            // 表格数据总数
            const dataCount = computed(() => {
                return store.getters[`system/${PAGE_LIST_COUNT}`](props.pageName);
            });

            // 【获取其余插槽的名字】
            const otherPropSlots = props.contentTableConfig?.tableList.filter((item: any) => {
                if (item.slotName === "handler") return false;
                if (item.slotName === "state") return false;
                if (item.slotName === "createAt") return false;
                if (item.slotName === "operation") return false;
                if (item.slotName === "icon") return false;
                // 除了全局的过滤掉，其余的全要
                return true
            })

            // 【删除按钮】
            const handleDeleteBtn = (row: any) => {
                if (!row) return;
                ElMessageBox.confirm(
                    '您确认要删除吗？',
                    'Warning',
                    {
                        confirmButtonText: '确认',
                        cancelButtonText: '取消',
                        type: 'warning',
                    })
                    .then(() => {
                        store.dispatch(`system/${DELETE_DATA_ACTION}`, {
                            pageName: props.pageName,
                            ids: row.id
                        })
                    })
            };

            // 【新建按钮】
            const handleNewBtn = () => {
                emit("handleNewData");
            }

            // 【编辑按钮】
            const handleEditBtn = (item: any) => {
                emit("handleEditData", item);
            }

            return {
                // 页面数据
                dataList, dataCount,
                // 分页信息
                pageInfo,
                // 权限信息
                isCreate, isUpdate, isDelete,
                // 其他插槽
                otherPropSlots,
                // 发送给父组件的函数
                listPageData, handleDeleteBtn, handleNewBtn, handleEditBtn
            }
        }
    })
</script>

<style lang="less" scoped>
    .page-content {
        padding: 20px;
        border-top: 20px solid #f5f5f5;
        color: #0eace7;
    }
</style>
