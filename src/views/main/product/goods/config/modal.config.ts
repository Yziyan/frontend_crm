import {IForm} from "@/base-ui/form";


export const modalConfig: IForm = {
    formItems: [
        {
            field: "name",
            label: "商品名称",
            type: "textarea",
            placeholder: "请输入商品名称"
        },
        {
            field: "oldPrice",
            label: "商品价格",
            type: "input",
            placeholder: "请输入商品价格"
        },
        {
            field: "address",
            label: "生产地",
            type: "input",
            placeholder: "请输入商品生产地"
        },
        {
            field: "description",
            label: "商品描述",
            type: "textarea",
            placeholder: "请输入商品描述"
        },
        {
            field: "state",
            label: "上架状态",
            type: "select",
            placeholder: "请选择上架状态",
            options: [
                {title: "上架", value: 1},
                {title: "下架", value: 0}
            ]
        },
        {
            field: "stock",
            label: "商品库存",
            type: "input",
            placeholder: "请输入商品库存"
        },
        {
            field: "categoryId",
            label: "商品种类",
            type: "select",
            placeholder: "请选择种类",
            options: []
        }
    ],
    itemStyle: {}
}
