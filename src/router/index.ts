import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import cache from "@/util/cache";
import {firstMenu} from "@/util/map-dir";



const routes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: "/main"
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login/Login.vue")
    },
    {
        path: "/main",
        name: "main",
        component: () => import("@/views/main/Main.vue"),
        children: [
            {
                path: "myInfo/userInfo",
                component: () => import("@/views/main/my-info/myInfo/UserInfo.vue")
            }
        ]
    },
    {
        path: "/:pathMatch(.*)*",
        name: "not found",
        component: () => import("@/views/notFound/Not-found.vue")
    }
]

const router = createRouter({
    routes: routes,
    history: createWebHashHistory()
})

// 导航守卫
router.beforeEach(to => {
    if (to.path !== "/login") { // 【判断是否登录】
        const token = cache.getCache("token");
        if (!token) return "/login"
    }

    // 发现导航的路由是 /main
    if (to.path === "/main") {
        return firstMenu.uri;
    }

})

export default router;

