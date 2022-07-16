import {IForm} from "@/base-ui/form";

export const modalConfig: IForm = {
    colLayout: {span: 24},
    formItems: [
        {
            field: "name",
            label: "名称",
            type: "input",
            placeholder: "请输入种类名称"
        },
        {
            field: "parentId",
            label: "父级ID",
            type: "select",
            placeholder: "请选择父级ID",
            options: [],
            disabled: false
        }
    ],
    itemStyle: {}
}
