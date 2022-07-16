<template>
    <div class="content-info" v-bind="user">
        <zy-fold></zy-fold>
    </div>
</template>

<script lang="ts">
    import {defineComponent, ref} from "vue";
    import {getUser} from "@/util/getUser";
    import zyFold from "@/base-ui/collapse"

    export default defineComponent({
        name: "ContentInfo",
        components: {
            zyFold
        },
        setup() {

            const user = getUser();

            interface IFold {
                key: string,
                value: any
            }

            const foldItem = ref<IFold[]>([])
            Object.keys(user).forEach(key => {
                const item = user as any
                foldItem.value.push({key: key, value: item[key]});
            })

            return {
                user,
                foldItem
            }
        }
    })
</script>

<style lang="less" scoped>

</style>
