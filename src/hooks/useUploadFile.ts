import {UploadRawFile, UploadRequestOptions, ElMessage} from "element-plus";
import {IUpload, reqUpload} from "@/service/my-info/myInfo";
import {GET_USER_BY_ID} from "@/constent";
import store from "@/store";
import router from "@/router";
import {ref} from "vue";
import {BASE_URL} from "@/service/request/config";
import {getImageFileFromUrl, MapUrlPath} from "@/util/map-urlPath";


export function useUploadFile(dialogVisible: any,
                              reqType: string,
                              reqData: IUpload,
                              matchIndex?: any) {


    // 图片拼接好Url
    const fullPath = (relativePath: string): string => {
        if (relativePath) return BASE_URL + "/" + relativePath;
        return "";
    }

    // 上传文件的请求
    const handleUploadRequest = (uploadFile: UploadRequestOptions) => {
        if (reqData.photo) {
            reqData.photo = uploadFile.file;
        }
    }

    // 图片修改时
    const handleUploadChange = (fileList: UploadRawFile[]) => {
        if (reqType === "photo") {
            reqData.photo = fileList[0];
        } else if (reqType === "album") {
            reqData.album = fileList;
        }
    }


    // 确认按钮
    const handleSureBtn = async () => {

        if (matchIndex?.length > 0) {
            reqData.matchIndex = matchIndex;
        }

        const reqResult = await reqUpload(reqData)
        // 请求重新、并且刷新页面
        if (reqResult?.code === 0) {
            await store.dispatch(`myUserInfo/${GET_USER_BY_ID}`, reqData.id);

            ElMessage({
                showClose: true,
                message: '保存成功',
                type: 'success',
                duration: 5000
            })
            setTimeout(() => router.go(0), 1000);
            dialogVisible.value = false;
        }


    }

    return [handleUploadChange, handleSureBtn, fullPath];

}