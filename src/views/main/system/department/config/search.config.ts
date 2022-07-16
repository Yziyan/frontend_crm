import {IForm} from "@/base-ui/form";


export const searchFormConfig: IForm = {
    formItems: [
        {
            field: "keyword",
            label: "关键词",
            type: "input",
            placeholder: "请输入关键词"
        }
    ],
    colLayout: {span: 12}
}
