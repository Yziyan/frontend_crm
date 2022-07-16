import {ref} from "vue";
import pageSearch from "components/page-search";

// 分页信息改变时。 将搜索信息和分页信息一起发给服务器
export function usePageChange() {
    // 拿到搜索组件
    const pageSearchRef = ref<InstanceType<typeof pageSearch>>();
    // 调用搜索的方法
    const handlePageChange = () => {
        pageSearchRef.value?.handleSearchClick();
    }

    return [pageSearchRef, handlePageChange];

}
