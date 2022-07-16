import {useStore} from "vuex";
import {IUser} from "@/service/my-info/type";
import {computed} from "vue"

export function getUser(): IUser {

    const store = useStore();

    // 缓存里的User
    const cacheUserRef = computed(() => store.state.login.userInfo.user);
    const cacheUser: IUser = cacheUserRef.value;

    // 新请求的User
    const userRef = computed(() => store.state.myUserInfo.user);
    const user: IUser = userRef.value;

    return user.id ? user : cacheUser;
}
