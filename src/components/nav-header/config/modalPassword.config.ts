import {IForm} from "@/base-ui/form";


export const modalPasswordConfig: IForm = {
    colLayout: {span: 24},
    formItems: [
        {field: "oldPassword", label: "原密码", type: "password", placeholder: "请输入旧密码"},
        {field: "newPassword", label: "新密码", type: "password", placeholder: "请输入新密码"},
        {field: "surePassword", label: "确认密码", type: "password", placeholder: "请确认密码"},
        {field: "id", label: "ID", type: "input", placeholder: "请输入ID", isHidden: true},
    ],
    itemStyle: {},

}
