import Vue from "vue";
import Router, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";

/* Layout */
import Layout from "@/layout/index.vue";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/layout",
    name: "Layout",
    component: Layout,
    children: [
      {
        path: "/",
        component: () => import("../views/About.vue")
      }
    ]
  }
];
// console.log(routes);

export const constantRoutes: RouteConfig[] = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/About.vue"),
        name: "Dashboard",
        meta: {
          title: "dashboard",
          icon: "dashboard",
          affix: true
        }
      }
    ]
  },
  {
    path: "/layout",
    component: Layout,
    name: "Layout",
    redirect: "/layout/index",
    meta: {
      title: "Layout",
      icon: "dashboard",
      alwaysShow: true
    },
    children: [
      {
        path: "index",
        name: "About",
        meta: {
          title: "about",
          noCache: true
        },
        component: () => import("@/views/Home.vue")
      },
      {
        path: "home",
        name: "Home",
        meta: {
          title: "home"
        },
        component: () => import("@/views/About.vue")
      }
    ]
  },
  {
    path: "/admin",
    name: "Admin",
    component: Layout,
    redirect: "/admin/index",
    meta: {
      title: "Admin",
      icon: "dashboard",
      alwaysShow: true
    },
    children: [
      {
        path: "index",
        name: "Admin Index",
        meta: {
          title: "Admin",
          noCache: true
        },
        component: () => import("@/views/Home.vue")
      },
      {
        path: "awi",
        name: "Awi",
        meta: {
          title: "Awi"
        },
        component: () => import("@/views/About.vue")
      }
    ]
  }
];

export const asyncRoutes: RouteConfig[] = [
  {
    path: "/a",
    name: "a",
    component: Layout,
    children: [
      {
        path: "/",
        component: () => import("../views/About.vue")
      }
    ]
  }
];

// const router = new Router({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes
// });

const createRouter = () =>
  new Router({
    mode: "history", // Disabled due to Github Pages doesn't support this, enable this if you need.
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
    base: process.env.BASE_URL,
    routes: constantRoutes
  });

const router = createRouter();

export default router;
