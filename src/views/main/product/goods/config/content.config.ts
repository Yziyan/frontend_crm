import {ITable} from "@/base-ui/table/types";


export const contentTableConfig: ITable = {
    title: "商品列表",
    tableList: [
        {
            prop: "name",
            label: "名称",
            minWidth: "80",
        },
        {
            prop: "newPrice",
            label: "现价",
            minWidth: "80",
            slotName: "price"
        },
        {
            prop: "description",
            label: "描述信息",
            minWidth: "100",
        },
        {
            prop: "imgUrl",
            label: "图片",
            minWidth: "100",
            slotName: "image"
        },
        {
            prop: "createdTime",
            label: "上架时间",
            minWidth: "90",
            slotName: "createAt"
        },
        {
            prop: "stock",
            label: "库存",
            minWidth: "50"
        },
        {
            prop: "favorCount",
            label: "点赞数",
            minWidth: "50"
        },
        {
            label: "操作",
            minWidth: "120",
            slotName: "operation"
        }
    ],
    showIndexColumn: true,
    showSelectColumn: true
}