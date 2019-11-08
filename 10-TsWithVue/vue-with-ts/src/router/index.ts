import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import("@/views/Home.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/Login.vue")
  },
  /** TODO Register rout is missing use login for both */
  {
    path: "/settings",
    name: "settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "@/views/Settings.vue")
  }
  // {
  //   path: "/login",
  //   name: "login",
  //   component: () => import(/* webpackChunkName: "login" */ "@/views/Login.vue")
  // }
];

const router = new VueRouter({
  routes
});

export default router;
