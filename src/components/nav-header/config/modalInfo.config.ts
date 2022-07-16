import {IForm} from "@/base-ui/form";


export const modalInfoConfig: IForm = {
    colLayout: {span: 24},
    formItems: [
        {field: "nickname", label: "姓名", type: "input", placeholder: "请输入真实姓名"},
        {field: "cellphone", label: "电话号码", type: "input", placeholder: "请输入电话号码"},
        {field: "id", label: "ID", type: "input", placeholder: "请输入ID", isHidden: true}
    ],
    itemStyle: {},
}
