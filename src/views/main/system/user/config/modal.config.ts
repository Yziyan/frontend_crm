import {IForm} from "@/base-ui/form";


export const modalConfig: IForm = {
    colLayout: {span: 24},
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
            field: "password",
            type: "input",
            label: "密码",
            placeholder: "请输入密码",
            isHidden: true
        },
        {
            field: "enable",
            type: "select",
            label: "账号状态",
            placeholder: "请选择账号状态",
            options: [
                {title: "可用", value: 1},
                {title: "禁用", value: 0}
            ]
        },{
            field: "cellphone",
            type: "input",
            label: "电话号码",
            placeholder: "请输入电话号码"
        },
        {
            field: "departmentId",
            type: "select",
            label: "所属部门",
            placeholder: "请选择部门ID",
            options: []
        },
        {
            field: "roleIds",
            type: "transfer",
            label: "角色",
            transData: [],
            otherOptions: {
                titles: ["所有角色", "你的角色"],
                btnTexts: ["取消选择", "选择角色"]
            }
        },
    ],
    itemStyle: {}
}
