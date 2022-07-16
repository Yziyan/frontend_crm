<template>
    <div class="zy-table">
        <!-- 表格的页眉 -->
        <div class="header">
            <slot name="header" >
                <div class="title">{{title}}</div>
                <div class="handler">
                    <slot name="handler"></slot>
                </div>
            </slot>
        </div>
        <!-- 表格 -->
        <el-table :data="listData"
                  stripe style="width: 100%"
                  @selection-change="handleSelectChange" v-bind="childrenProps">

            <!-- 选择列 -->
            <el-table-column v-if="showSelectColumn"
                             type="selection"
                             align="center"
                             width="60"/>
            <!-- 序号 -->
            <el-table-column v-if="showIndexColumn"
                             label="序号"
                             type="index"
                             align="center"
                             width="80"/>

            <!-- 所有的数据【每一行】 -->
            <template v-for="column in tableList" :key="column.prop">

                <el-table-column v-bind="column" align="center" show-overflow-tooltip>
                    <!-- 自带的插槽 -->
                    <template #default="scope" >
                        <!-- 动态插槽 -->
                        <slot :name="column.slotName" :row="scope.row">
                            {{scope.row[column.prop]}}
                        </slot>
                    </template>

                </el-table-column>
            </template>
        </el-table>
        <!-- 表格的页脚 -->
        <div class="footer" v-if="showFooter">
            <slot name="footer">
                <el-pagination
                        :currentPage="page.currentPage"
                        :page-size="page.pageSize"
                        :page-sizes="[1, 2, 3, 10]"
                        :small="true"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="listCount"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                />
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent, PropType} from "vue";
    import {ITableColumn} from "@/base-ui/table/types";

    export default defineComponent({
        name: "Table",
        props: {
            title: {
                type: String,
                default: ""
            },
            showIndexColumn: {
              type: Boolean,
              default: false
            },
            showExpandColumn: {
                type: Boolean,
                default: false
            },
            showSelectColumn: {
                type: Boolean,
                default: false
            },
            tableList: {
                type: Array as PropType<ITableColumn[]>,
                required: true
            },
            listData: {
                type: Array,
                required: true
            },
            listCount: {
                type: Number,
                required: true
            },
            page: {
                type: Object,
                default: () => ({currentPage: 1, pageSize: 10})
            },
            showFooter: {
                type: Boolean,
                default: true
            },
            childrenProps: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ["selectChange", "update:page"],
        setup(props, {emit}) {

            // 选择表格
            const handleSelectChange = (value: any) => {
                emit("selectChange", value);
            };

            // 切换页数
            const handleCurrentChange = (currentPage: number) => {
                emit("update:page", {...props.page, currentPage});
            };

            // 更改每页数据大小
            const handleSizeChange = (pageSize: number) => {
                emit("update:page", {...props.page, pageSize});
            };

            return {
                handleSelectChange,
                handleCurrentChange,
                handleSizeChange,
            };

        }
    })
</script>

<style lang="less" scoped>
    .header {
        display: flex;
        height: 45px;
        padding: 0 5px;
        justify-content: space-between;
        align-items: center;

        .title {
            font-size: 20px;
            font-weight: 700;
        }

        .handler {
            align-items: center;
        }
    }

    .footer {
        margin-top: 15px;

        .el-pagination {
            text-align: right;
        }
    }
</style>
