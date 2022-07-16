<template>
    <div class="menu">

        <page-content :content-table-config="contentTableConfig" page-name="menu">
             <!-- 类型插槽 -->
            <template #type="scope">
                {{typeStr(scope.row.type)}}
            </template>

        </page-content>
    </div>
</template>

<script lang="ts">
    import pageContent from '@/components/page-content'
    import {defineComponent} from 'vue'
    import {contentTableConfig} from './config/content.config'

    export default defineComponent({
        name: 'Menu',
        components: {
            pageContent
        },
        setup() {

            const typeStr = (type: number) => {
                if (type === 0) return "目录";
                if (type === 1) return "菜单";
                if (type === 2) return "按钮";
            }

            const mapIcon = (icon: string) => {
                console.log(icon);
                return  icon
            }

            return {
                contentTableConfig,
                typeStr
            }
        }
    })
</script>

<style scoped></style>
