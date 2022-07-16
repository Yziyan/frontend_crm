import {ITable} from "@/base-ui/table/types";

export const contentTableConfig: ITable = {
    title: "菜单列表",
    tableList: [
        {
            prop: "name",
            label: "名称",
            minWidth: "80"
        },
        {
            prop: "type",
            label: "类型",
            minWidth: "80",
            slotName: "type"
        },
        {
            prop: "uri",
            label: "路由",
            minWidth: "80"
        },
        {
            prop: "icon",
            label: "图标",
            minWidth: "80",
            slotName: "icon"
        },
        {
            prop: 'permission',
            label: '按钮权限',
            minWidth: '100'
        },
        {
            label: "操作",
            minWidth: "120",
            slotName: "operation"
        }
    ],
    childrenProps: {
        rowKey: "id",
        treeProp: {
            children: "children"
        },
        indent: 40
    },
    showFooter: false
}