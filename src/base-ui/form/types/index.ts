
type IFormType = "input" | "password" | "select" | "datepicker" | "transfer" | "textarea" | "picture";

interface IOptions {
    title: string,
    value: any
}
interface ITransfer {
    key: number,
    label: string,
    disabled?: boolean
}

export interface IFormItem {
    field: string,
    type: IFormType,
    label: string,
    rules?: any[],
    placeholder?: any,
    disabled?: boolean,
    // 针对select & TransFer
    options?: IOptions[],
    // 针对特殊属性
    otherOptions?: any,
    isHidden?: boolean,
    // 针对Transfer
    transData?: ITransfer[]
}

export interface IForm {
    formItems: IFormItem[],
    labelWidth?: string,
    colLayout?: any,
    itemStyle?: any
}
