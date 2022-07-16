import zAxios from "@/service";
import {IDataType} from "@/service/types";
import qs from "axios"
import {IUser} from "@/service/my-info/type";


enum ReqApi {
    reqUploadPhoto = "/users/uploadPhoto",
    reqUploadAlbum = "/users/uploadAlbum",
    reqUserInfo = "/users/getUser"
}

export interface IUpload {
    id: number,
    photo?: File,
    photoUrl?: string,
    album?: File[],
    albumUrl?: string,
    matchIndex?: number[]
}

export function reqUserById(userId: number) {
    return zAxios.get<IDataType>({
        url: ReqApi.reqUserInfo,
        params: {
            userId
        }
    })
}



export function reqUpload(reqData: any) {

    let formData = new FormData();
    Object.keys(reqData).forEach(key => {
        if (!reqData[key]) return
        if (key === "album") {
            reqData[key].forEach((item: any) => {
                formData.append(key, item);
            })
        } else {
            formData.append(key, reqData[key]);
        }
    })

    let reqUrl: string;
    if (reqData.photo) {
        reqUrl = ReqApi.reqUploadPhoto;
    } else {
        reqUrl = ReqApi.reqUploadAlbum;
    }

    return zAxios.post<IDataType<IUser>>({
        url: reqUrl,
        data: formData
    })
}
