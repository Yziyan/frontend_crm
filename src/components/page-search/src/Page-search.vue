<template>
    <div class="page-search">
        <zy-form v-bind="searchFormConfig" v-model="formData">
            <template #header>
                <h2>高级检索</h2>
            </template>

            <template #footer>
                <div class="button">
                    <el-button icon="RefreshRight" @click="handleResetClick">重置</el-button>
                    <el-button type="primary" icon="Search" @click="handleSearchClick">搜索</el-button>
                </div>
            </template>
        </zy-form>
    </div>
</template>

<script lang="ts">
    import ZyForm from "@/base-ui/form";
    import {defineComponent, ref} from "vue";

    export default defineComponent({
        props: {
            searchFormConfig: {
                type: Object,
                required: true
            }
        },
        name: "",
        components: {
            ZyForm
        },
        emits: ["resetBtn", "searchBtn"],
        setup(props, {emit}) {

            // 所有项
            const formItems = props.searchFormConfig?.formItems ?? [];

            const formOriginData: any = {}
            for (const item of formItems) {
                // 将每一项field作为 key 放入 formOriginData 中
                formOriginData[item.field] = undefined;
            }

            // 绑定在formData上
            const formData = ref(formOriginData);
            // 重置按钮
            const handleResetClick = () => {
                /*
                因为对面是浅拷贝，所以 修改里面的值的时候，子组件的 浅拷贝的东西也会修改
                for (const key in formOriginData) {
                    formData.value[`${key}`] = formOriginData[key];
                }
                */
                // 将formData置空
                formData.value = formOriginData;
                // 将事件抛给父组件
                emit("resetBtn");
            }

            // 搜索按钮
            const handleSearchClick = () => {
                // 将事件抛给父组件
                emit("searchBtn", formData.value);
            };

            return {
                formData,
                handleResetClick,
                handleSearchClick
            }

        }
    })
</script>

<style lang="less" scoped>
    .button {
        text-align: right;
        padding: 0 50px 20px 0;
    }
</style>
