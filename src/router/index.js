import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
import About from "@/views/About.vue";
import Error from "@/pages/Error404.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/promociones",
    name: "Promotions",
    component: () => import('@/pages/Promotions.vue'),
  },
  {
    path: "/promocion/:id",
    name: "Promotion",
    component: () => import('@/pages/Promotion.vue'),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import('@/pages/Error404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
