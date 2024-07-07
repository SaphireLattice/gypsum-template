import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
            meta: {
                showFooter: true,
            },
        },
    ],
});

router.beforeEach(async (to, from) => {
    if (!from.name) {
        const showFooter =
            (to.meta?.showFooter as boolean) ??
            [...to.matched].reverse().find((m) => m.meta?.showFooter)?.meta
                ?.showFooter ??
            false;

        document
            .getElementsByTagName("body")[0]
            .classList.toggle("footer-shown", showFooter);
    }
});

export default router;
