import {App} from "vue"
import {formatTimeStamp} from "@/util/date-format";

// 注册APP全局的配置
export default function (app: App): void {
    app.config.globalProperties.$filters = {
        formatTime(timeStr: number) {
            return formatTimeStamp(timeStr);
        }
    }
}

