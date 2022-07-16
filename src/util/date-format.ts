
import dayJs from "dayjs"

const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";

// 转换时间戳的函数
export function formatTimeStamp(timeStr: number, format: string = DATE_FORMAT) {
    return dayJs(timeStr).format(format);
}
