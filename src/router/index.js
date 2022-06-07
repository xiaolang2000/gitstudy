import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Layout from "@/views/Layout";
import SelectCore from "@/views/SelectCore";
import CreateCore from "@/views/CreateCore";
import Back from "@/views/Back";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/selectcore',
    name: 'selectcore',
    component: SelectCore
  },
  {
    path:'/back',
    component: Back,
    name:"back"
  },
  {
    path: '/createcore',
    name: 'createcore',
    component: CreateCore
  },
  {
    path: '/layout',
    name: 'layout',
    component: Layout,
    redirect:"/layout/home",
    children: [
      {
        path: 'home',
        name: 'home',
        component:()=>import("@/components/HomePage/HomeView.vue")
      },
      {
        path: 'nf',
        name: 'nf',
        component:()=>import("@/components/NF/Nfconfig.vue")
      },
    ]

  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
