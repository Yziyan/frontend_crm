import {ref} from "vue";
import pageContent from "components/page-content";

// 搜索 & 重置
export function usePageSearch() {

    // 拿到pageContent组件
    const pageContentRef = ref<InstanceType<typeof pageContent>>();
    // 重置
    const handleResetBtn = () => {
        pageContentRef.value?.listPageData();
    };
    // 搜索
    const handleSearchBtn = (searchInfo: any) => {
        pageContentRef.value?.listPageData(searchInfo);
    };


    return [pageContentRef, handleResetBtn, handleSearchBtn];

}

