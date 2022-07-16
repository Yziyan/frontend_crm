import {IForm} from "@/base-ui/form";

export const modalConfig: IForm = {
    colLayout: {span: 24},
    itemStyle: {},
    formItems: [
        {
            field: "name",
            label: "角色名称",
            type: "input",
            placeholder: "请输入名称"
        },
        {
            field: "intro",
            label: "角色介绍",
            type: "input",
            placeholder: "请输入角色简介"
        }
    ],

}