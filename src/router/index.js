import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/LogIn.vue";
import SignUp from "../components/Signup.vue";
import Dashboard from "../components/Dashboard.vue";
import Profile from "../components/Profile.vue";
import Uprofile from "../components/Uprofile.vue";
import Register from "../components/Register.vue";
import store from "../store/index.js";

import registeredUsers from "../components/registeredUsers.vue";


Vue.use(VueRouter);

const routes = [

  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },

  
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  
  {
    path: "/Register",
    name: "Register",
    component: Register,
  },

  

  {
    path: "/Signup",
    name: "Signup",
    component: SignUp,
  },

  {
    path: "/Dashboard",
    name: "Dashboard",
    component: Dashboard,

    children:[
      {
        path: "Profile",
        name: "Profile",
        component: Profile,
      },
      {
        path: "home",
        name: "home",
        component: Home,
      },
      {
        path: "uprofile",
        name: "uprofile",
        component: Uprofile,
      },
      {
        path: "registeredUsers",
        name: "registeredUsers",
        component: registeredUsers,
      },
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
