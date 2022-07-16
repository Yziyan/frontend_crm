import {ITable} from "@/base-ui/table/types";


export const contentTableConfig: ITable = {
    tableList: [
        {prop: "name", label: "用户名", minWidth: "100"},
        {prop: "nickname", label: "姓名", minWidth: "100"},
        {prop: "cellphone", label: "电话", minWidth: "100"},
        {prop: "enable", label: "状态", minWidth: "100", slotName: "state"},
        {prop: "createdTime", label: "创建时间", minWidth: "100", slotName: "createAt"},
        {prop: "updateTime", label: "更新时间", minWidth: "100", slotName: "updateAt"},
        {label: "操作", minWidth: "120", slotName: "operation"}
    ],
    showIndexColumn: true,
    showSelectColumn: true,
    title: "用户列表"
}