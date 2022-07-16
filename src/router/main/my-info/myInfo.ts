const userInfo = () => import("@/views/main/my-info/myInfo/UserInfo.vue")

export default {
    path: "/main/myInfo/userInfo",
    name: "userInfo",
    component: userInfo,
    children: []
}

