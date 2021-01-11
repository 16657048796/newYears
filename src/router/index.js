import Vue from "vue";
import VueRouter from "vue-router";
import About from "../views/About.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: '/About',
        // component: About
    },
    {
        path: "/About",
        name: "About",
        component: About
    },
    {
        path: "/Begin",
        name: "Begin",
        component: () => import("../views/Begin.vue")
    },
    {
        path: "/start",
        component: () => import("../views/Start.vue"),
        redirect: '/meet',
        children: [
            {
                path: '/meet',
                component: () => import('../views/houzheng/canyujiang.vue')
            },
            {
                path: '/third',
                component: () => import('../views/houzheng/sandengj.vue')
            },
            {
                path: '/second',
                component: () => import('../views/lizhi/erdengj.vue')
            },
            {
                path: '/first',
                component: () => import('../views/lizhi/yidengj.vue')
            },
            {
                path: '/mysterious',
                component: () => import('../views/wangpengfei/shenmi.vue')
            },
            {
                path: '/special',
                component: () => import('../views/wangpengfei/tedengj.vue')
            }
        ]
    },
    {
        path: "/result",
        component: () =>
            import("../views/Result.vue")
    },
    {
        path: "/namelist",
        component: () =>
            import("../views/Namelist.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
