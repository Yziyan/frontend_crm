import {ITable} from "@/base-ui/table/types";

export const contentTableConfig: ITable = {
    tableList: [
        {prop: "name", label: "名称", minWidth: "120", slotName: "cateName"},
        {label: "操作", minWidth: "100", slotName: "operation"}
    ],
    title: "商品种类",
    showIndexColumn: true,
    childrenProps: {
        rowKey: "id",
        treeProp: {
            children: "children"
        },
        indent: 75
    },
    showFooter: false
}
