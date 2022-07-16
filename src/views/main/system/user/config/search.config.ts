import {IForm} from "@/base-ui/form";

export const searchFormConfig: IForm = {
    formItems: [
        {
            field: "name",
            type: "input",
            label: "用户名",
            placeholder: "请输入用户名"
        },
        {
            field: "nickname",
            type: "input",
            label: "姓名",
            placeholder: "请输入姓名"
        },
        {
            field: "cellphone",
            type: "input",
            label: "电话号码",
            placeholder: "请输入电话号码"
        },
        {
            field: "enable",
            type: "select",
            label: "状态",
            placeholder: "请选择状态",
            options: [
                {title: "可用", value: 1},
                {title: "禁用", value: 0}
            ]
        },
        {
            field: "createdTime",
            type: "datepicker",
            label: "创建时间",
            placeholder: "请选择创建时间范围",
            otherOptions: {
                startPlaceholder: "开始时间",
                endPlaceholder: "结束时间",
                type: "daterange"
            }
        },
    ],
    labelWidth: "120px",
    itemStyle: {
        padding: "10px 40px"
    },
    colLayout: {
        span: 8
    }
}