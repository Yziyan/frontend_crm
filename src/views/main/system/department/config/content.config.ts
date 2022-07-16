import {ITable} from "@/base-ui/table/types";


export const contentTableConfig: ITable = {

    showIndexColumn: true,
    showSelectColumn: true,
    tableList: [
        {prop: "name", label: "部门名称", minWidth: "100"},
        {prop: "leader", label: "部门领导人", minWidth: "100"},
        {label: "操作", minWidth: "100", slotName: "operation"}
    ],
    title: "部门信息"

}
