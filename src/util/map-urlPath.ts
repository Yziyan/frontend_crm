import {BASE_URL} from "@/service/request/config";
import zAxios from "@/service";


type callBackType = (item: string) => void;

export class MapUrlPath {

    imgPath: string;
    fileName: string;

    constructor(fileName: string) {
        this.fileName = fileName;
        this.imgPath = BASE_URL + "/" + fileName;
    }

    importFile(callback: callBackType) {
        this.getBase64(callback)
    }

    private getBase64(callback: callBackType) {
        let Img = new Image();
        Img.src = this.imgPath + "?v=" + Math.random(); // 处理缓存,fix缓存bug,有缓存，浏览器会报错;
        Img.setAttribute("crossOrigin", "Anonymous"); // 解决控制台跨域报错的问题

        let dataURL = "";
        Img.onload = function () {
            //要先确保图片完整获取到，这是个异步事件
            let canvas = document.createElement("canvas"); //创建canvas元素
            let width = Img.width;                          //确保canvas的尺寸和图片一样
            let height = Img.height;
            canvas.width = width;
            canvas.height = height;
            canvas.getContext("2d")?.drawImage(Img, 0, 0, width, height); //将图片绘制到canvas中
            dataURL = canvas.toDataURL("image/jpeg"); //转换图片为dataURL
            callback ? callback(dataURL) : null; //调用回调函数
        };

    }

    dataURLtoFile(dataUrl: string) {
        //将base64转换为文件，dataUrl，filename为文件名（必须带后缀名，如.jpg,.png）
        let arr = dataUrl.split(",");

        // @ts-ignore
        let mime: string = arr[0].match(/:(.*?);/)[1];
        let bStr = atob(arr[1]);
        let n = bStr.length;

        let u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bStr.charCodeAt(n);
        }
        return new File([u8arr], this.fileName, {type: mime});
    }
}

interface IFile {
    data: File
}
export function getImageFileFromUrl(url: string) {
    return  new Promise((resolve, reject) => {
        let blob = null;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.setRequestHeader("Accept", "image/jpeg");
        xhr.responseType = "blob";
        xhr.onload = () => {
            blob = xhr.response;
            let imgFile = new File([blob], url, {type: "image/jpeg"});
            resolve(imgFile);
        };
        xhr.send();
    });
}

