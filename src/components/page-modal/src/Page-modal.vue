<template>
    <div class="page-modal">
        <el-dialog v-model="dialogVisible"
                   :title="dialogTitle"
                   :width="dialogWidth"
                   :destroy-on-close="true"
                   center>

            <zy-form v-bind="modalConfig" v-model="formData"/>

            <!-- 给一个默认插槽 -->
            <slot></slot>

            <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSureBtn">确定</el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import ZyForm from "@/base-ui/form";
    import {defineComponent, ref, watch} from "vue";
    import {useMyStore} from "@/store";
    import {SAVE_UPDATE_ACTION} from "@/constent";

    export default defineComponent({
        name: "PageModal",
        components: {
            ZyForm
        },
        props: {
            modalConfig: {
                type: Object,
                default: () => ({})
            },
            defaultInfo: {
                type: Object,
                default: () => ({})
            },
            dialogWidth: {
                type: String,
                default: "30%"
            },
            pageName: {
                type: String,
                required: true
            },
            otherInfo: {
                type: Object,
                default: () => ({})
            }
        },
        setup(props) {

            // 【数据】
            const dialogVisible = ref<boolean>(false);
            const dialogTitle = ref<string>("Dialog")
            // 用于表单所需双向绑定的字段
            const formData = ref<any>({})
            watch(() => props.defaultInfo, (newValue) => {
                for (const item of props.modalConfig.formItems) {
                    formData.value[`${item.field}`] = newValue[`${item.field}`];
                }
            })

            // 【确定按钮】
            const store = useMyStore();

            const handleSureBtn = () => {
                dialogVisible.value = false;

                if (Object.keys(props.defaultInfo).length > 0) { // 用于【回显的对象有值】，说明是编辑【传ID】
                    store.dispatch(`system/${SAVE_UPDATE_ACTION}`, {
                        pageName: props.pageName,
                        reqData: {...formData.value, id: props.defaultInfo.id, ...props.otherInfo}
                    })
                } else { // 添加
                    store.dispatch(`system/${SAVE_UPDATE_ACTION}`, {
                        pageName: props.pageName,
                        reqData: {...formData.value, ...props.otherInfo}
                    })
                }


            }

            return {
                dialogVisible,
                dialogTitle,
                formData,
                handleSureBtn
            }
        }
    })
</script>

<style lang="less" scoped>

</style>
