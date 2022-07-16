import {ITable} from "@/base-ui/table/types";


export const contentTableConfig: ITable = {
    tableList: [
        {prop: "name", label: "名称", minWidth: "100"},
        {prop: "intro", label: "简介", minWidth: "100"},
        {label: "操作", minWidth: "120", slotName: "operation"}
    ],
    showSelectColumn: true,
    showIndexColumn: true,
    title: "角色列表"
}