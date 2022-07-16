import {IForm} from "@/base-ui/form";


export const modalConfig: IForm = {
    colLayout: {span: 24},
    formItems: [
        {
            field: "name",
            label: "部门名称",
            type: "input",
            placeholder: "请输入部门名称",
        },
        {
            field: "leader",
            label: "部门领导人",
            type: "input",
            placeholder: "请输入领导人",
        }
    ]
}
