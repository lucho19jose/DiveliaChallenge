import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
import About from "@/views/About.vue";
import Error from "@/pages/Error404.vue";

// Autentificado
const authUser = (to, from, next) => {
	if (JSON.parse(localStorage.getItem('login'))) 
		return next({ name: "Promotions" });
	else 
		return next();
};

const auth = (to, from, next) => {
	if (JSON.parse(localStorage.getItem('login'))) 
		return next();
	else 
		return next({ name: "Login" });
};

const routes = [
  {
    path: "/",
    name: "Login",
    beforeEnter: authUser,
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
    beforeEnter: auth,
    component: () => import('@/pages/Promotions.vue'),
  },
  {
    path: "/promocion/:id",
    name: "Promotion",
    beforeEnter: auth,
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
