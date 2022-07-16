import {IForm} from "@/base-ui/form";


export const searchFormConfig: IForm = {
    formItems: [
        {
            field: "keyword",
            label: "关键字",
            type: "input",
            placeholder: "请输入关键字"
        }
    ],
    colLayout: {span: 12}
}

