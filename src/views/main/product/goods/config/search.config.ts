import {IForm} from "@/base-ui/form";


export const searchFormConfig: IForm = {
    formItems: [
        {
            field: "name",
            type: "input",
            label: "名称",
            placeholder: "请输入名称"
        },
        {
            field: "description",
            type: "input",
            label: "描述信息",
            placeholder: "请输入描述信息"
        },
        {
            field: "address",
            type: "input",
            label: "地址",
            placeholder: "请输入地址"
        },
        {
            field: "createdTime",
            type: "datepicker",
            label: "上架时间",
            otherOptions: {
                startPlaceholder: "开始时间",
                endPlaceholder: "结束时间",
                type: "daterange"
            }
            },
        {
            field: "state",
            type: "select",
            label: "上架状态",
            placeholder: "请选择上架状态",
            options: [
                {title: "上架", value: 1},
                {title: "下架", value: 0}
            ]
        },
        {
            field: "categoryId",
            type: "select",
            label: "类别",
            placeholder: "请选择类别",
            options: [
                {title: "打底衫", value: 1},
                {title: "衬衫", value: 2}
            ]
        }
    ]
}
