import { App } from "vue";

import { ElButton, ElAside, ElAlert, ElContainer, ElMenu, ElSubMenu, ElMenuItemGroup, ElMenuItem,
    ElForm, ElFormItem, ElInput, ElRadio, ElTabPane, ElTabs, ElIcon, ElCheckbox, ElLink, ElHeader, ElMain,
    ElDropdown, ElDropdownItem, ElDropdownMenu, ElAvatar, ElRow, ElCol, ElSelect, ElDatePicker, ElOption,
    ElBreadcrumb, ElBreadcrumbItem, ElTable, ElTableColumn, ElPagination, ElImage, ElDialog, ElTransfer,
    ElSwitch, ElTree, ElUpload, ElCarousel, ElCarouselItem, ElCollapse, ElCollapseItem, ElCard, ElTooltip
} from "element-plus";

import * as ElIcons from '@element-plus/icons-vue';
const components = [
    ElButton, ElAside, ElAlert, ElForm, ElCheckbox, ElLink, ElHeader, ElMain,
    ElFormItem, ElInput, ElRadio, ElTabs, ElTabPane, ElIcon, ElContainer, ElMenu,
    ElSubMenu, ElMenuItemGroup, ElMenuItem, ElDropdown, ElDropdownItem, ElDropdownMenu,
    ElAvatar, ElRow, ElCol, ElSelect, ElDatePicker, ElOption, ElBreadcrumb, ElBreadcrumbItem,
    ElTable, ElTableColumn, ElPagination, ElImage, ElDialog, ElTransfer, ElSwitch, ElTree, ElUpload,
    ElCarousel, ElCarouselItem, ElCollapse, ElCollapseItem, ElCard, ElTooltip

];


// 注册 element-plus 全局组件
export default function (app: App): void {
    for (const component of components) {
        app.component(component.name, component);
    }
    for (const name in ElIcons){
        app.component(name,(ElIcons as any)[name])
    }
}

