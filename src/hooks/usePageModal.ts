import PageModal from "@/components/page-modal"
import {ref} from "vue"

type callBackType = (item?: any) => void

export function usePageModal(newCb?: callBackType, editCb?: callBackType, dialogTitle?: string) {

    // 【组件实例】：page-modal
    const pageModalRef = ref<InstanceType<typeof PageModal>>()

    // 【编辑：回显的信息】
    const defaultInfo = ref({});

    // 【处理新建按钮】
    const handleNewData = () => {
        defaultInfo.value = {};
        if (pageModalRef.value) {
            pageModalRef.value.dialogTitle = dialogTitle ? `添加${dialogTitle}` : "添加";
            pageModalRef.value.dialogVisible = true;
        }
        newCb && newCb()
    }

    // 【处理编辑按钮】
    const handleEditData = (item: any) => {
        defaultInfo.value = {...item};
        if (pageModalRef.value) {
            pageModalRef.value.dialogTitle = dialogTitle ? `${dialogTitle}编辑` : "编辑";
            pageModalRef.value.dialogVisible = true;
        }
        editCb && editCb(item);
    }

    return [pageModalRef, defaultInfo, handleNewData, handleEditData];

}
