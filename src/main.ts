import { createApp } from 'vue'
import router from "@/router";
import store, {setupStore} from "@/store";

import "normalize.css";
import "./assets/css/index.less";
import App from './App.vue';
import { registerApp } from "@/global";

const app = createApp(App);
// 【加载缓存数据 & 初始化数据】
setupStore();
registerApp(app).use(router).use(store);

app.mount("#app");
