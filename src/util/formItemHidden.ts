import {IFormItem} from "@/base-ui/form";

type funcHiddenType = () => void

export function formItemHidden(formItems: IFormItem[], itemFiled: string, isHidden: boolean): funcHiddenType{
    const item = formItems.find((item) => item.field === itemFiled);
    return () => {
        item!.isHidden = isHidden;
    }
}
