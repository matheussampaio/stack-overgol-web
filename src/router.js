import Vue from "vue";
import VueRouter from "vue-router";

import Auth from "@/views/Auth.vue";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

export default new VueRouter({
  base: process.env.BASE_URL || "/",
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/auth", name: "auth", component: Auth }
  ]
});
