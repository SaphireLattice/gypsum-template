<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { RouterView, useRoute } from "vue-router";

const route = useRoute();

const body = document.getElementsByTagName("body")[0];
body.classList.add("loaded");

function footerUpdate(appearing: boolean) {
    body.classList.toggle("footer-shown", appearing);
}

const showFooter = computed(
    () =>
        (route.meta?.showFooter as boolean) ??
        [...route.matched].reverse().find((m) => m.meta?.showFooter)?.meta
            ?.showFooter ??
        false
);

let suffix = "";
if (__COMMIT_HASH__)
    suffix = __COMMIT_HASH__.endsWith("-dirty")
        ? "-dev"
        : `-${__COMMIT_HASH__}`;

const version = __APP_VERSION__ + suffix;
</script>

<template>
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
    <teleport to="#footer">
        <transition
            @after-enter="footerUpdate(true)"
            @after-leave="footerUpdate(false)"
            name="fade"
            mode="out-in"
        >
            <div
                v-if="showFooter"
                class="absolute bottom-0 left-0 right-0 flex justify-center py-1"
            >
                <span>GYPSUM-TEMPLATE v{{ version }}</span>
            </div>
        </transition>
    </teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
