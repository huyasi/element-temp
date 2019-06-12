<template>
    <div class="app-container">
        <div>
            <transition
                name="router-fade"
                mode="out-in"
            >
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
            </transition>
            <transition
                name="router-fade"
                mode="out-in"
            >
                <router-view v-if="!$route.meta.keepAlive"></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    created() {}
};
</script>
<style lang="scss">
.app-container {
    overflow: hidden;
}

[v-cloak] {
    display: none;
}
</style>
