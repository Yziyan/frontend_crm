import {IForm} from "@/base-ui/form";


export const searchFormConfig: IForm = {
    formItems: [
        {
            field: "name",
            type: "input",
            label: "角色名称",
            placeholder: "请输入角色名称"
        },
        {
            field: "intro",
            type: "input",
            label: "描述信息",
            placeholder: "请输入角色描述信息"
        }
    ]
}
