<template>
    <div class="zy-form">

        <div class="header">
            <slot name="header"></slot>
        </div>

        <!-- 表单组件 -->
        <el-form :label-width="labelWidth">
            <!-- 用于栅格布局【多少行】 -->
            <el-row>
                <template v-for="item in formItems" :key="item.label">
                    <!-- 用于栅格布局【多少列】 -->
                    <el-col v-bind="colLayout">
                        <!-- 大的表单组件 -->
                        <el-form-item
                                v-if="!item.isHidden"
                                :label="item.label"
                                :rules="item.rules"
                                :style="itemStyle">

                            <!-- 普通的文本框 -->
                            <template v-if="item.type === 'input'
                                            || item.type === 'password'
                                            || item.type === 'textarea'">

                                <el-input
                                        v-bind="item.otherOptions"
                                        :placeholder="item.placeholder"
                                        :show-password="item.type === 'password'"
                                        :disabled="item.disabled"
                                        :type="item.type"
                                        :autosize="true"
                                        :model-value="modelValue[`${item.field}`]"
                                        @update:model-value="handleChangeModelValue($event, item.field)"/>

                                <!-- v-model="modelValue[`${item.field}`]" -->

                            </template>

                            <!-- select选择器 -->
                            <template v-else-if="item.type === 'select'">

                                <el-select
                                        style="width: 100%"
                                        v-bind="item.otherOptions"
                                        :placeholder="item.placeholder"
                                        :disabled="item.disabled"
                                        filterable
                                        :model-value="modelValue[`${item.field}`]"
                                        @update:model-value="handleChangeModelValue($event, item.field)">

                                    <el-option v-for="option in item.options"
                                               :value="option.value">{{option.title}}
                                    </el-option>

                                </el-select>

                            </template>

                            <!-- 日期选择器 -->
                            <template v-else-if="item.type === 'datepicker'">

                                <el-date-picker
                                        v-bind="item.otherOptions"
                                        style="width: 100%"
                                        :disabled="item.disabled"
                                        :model-value="modelValue[`${item.field}`]"
                                        @update:model-value="handleChangeModelValue($event, item.field)"/>

                            </template>

                            <!-- 穿梭框 -->
                            <template v-else-if="item.type === 'transfer'">
                                <el-transfer
                                        style="text-align: left; display: inline-block"
                                        filterable
                                        :titles="item.otherOptions.titles"
                                        :button-texts="item.otherOptions.btnTexts"
                                        :data="item.transData"
                                        :disabled="item.disabled"
                                        :model-value="modelValue[`${item.field}`]"
                                        @update:model-value="handleChangeModelValue($event, item.field)">

                                </el-transfer>
                            </template>


                        </el-form-item>
                    </el-col>
                </template>
            </el-row>
        </el-form>

        <div class="footer">
            <slot name="footer"></slot>
        </div>

    </div>
</template>

<script lang="ts">
    import {defineComponent, PropType, ref, watch} from "vue";
    import {IFormItem} from "@/base-ui/form/types";

    export default defineComponent({
        name: "ZYForm",
        props: {
            // 绑定数据
            modelValue: {
                type: Object,
                required: true
            },
            // 表单选项
            formItems: {
                type: Array as PropType<IFormItem[]>,
                default: () => []
            },
            // 表单前面文字的宽度
            labelWidth: {
                type: String,
                default: "100px"
            },
            // 表单的样式
            itemStyle: {
                type: Object,
                default: () => ({padding: "10px 40px"})
            },
            // 栅格布局
            colLayout: {
                type: Object,
                default: () => ({
                    xl: 6,
                    lg: 8,
                    md: 12,
                    sm: 24,
                    xs: 24
                })
            }
        },
        emits: ["update:modelValue"],
        setup(props, {emit}) {


            const handleChangeModelValue = (value: any, field: string) => {
                // 当值改变时，将绑定的对象和对应修改的值给到父组件
                emit("update:modelValue", {...props.modelValue, [field]: value});
            }

            /*
            双向绑定
            拷贝父组件传过来的数据对象
            const formData = ref({...props.modelValue});
            watch(formData, (newValue) => {
                console.log(newValue);
                emit("update:modelValue", newValue)
            }, {
                deep: true
            })
            */


            return {
                handleChangeModelValue
            }

        }
    })
</script>

<style lang="less" scoped>

    .zy-form {
        padding-top: 22px;
    }

</style>
