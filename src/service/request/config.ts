
// 不同环境下的

let BASE_URL: string = "";
const TIMEOUT: number = 10000;

if (process.env.NODE_ENV === "development") {
    BASE_URL = "http://localhost:8888";
} else if (process.env.NODE_ENV === "production") {
    BASE_URL = "http://159.75.71.126:8888";
} else {
    BASE_URL = "http://192.168.1.8:8888";
}

export {BASE_URL, TIMEOUT};
