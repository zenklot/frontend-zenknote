import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AddNote from '../views/AddNote.vue'
import Dashboard from '../views/Dashboard.vue'
import ForgetPassword from '../views/ForgetPassword.vue'
import RefreshToken from '../views/RefreshToken.vue'
import DetailNote from '../views/DetailNote.vue'
import EditNote from '../views/EditNote.vue'
import NotFound from '../views/404.vue'
import RenewPassword from '../views/RenewPassword.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: '404',
    component: NotFound
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      noLogin: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/new-note',
    name: 'AddNote',
    component: AddNote,
    meta:{ 
      auth:true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta:{ 
      auth:true
    }
  },
  {
    path: '/forget-password',
    name: 'ForgetPassword',
    component: ForgetPassword
  },
  {
    path: '/refresh',
    name: 'RefreshToken',
    component: RefreshToken,
    meta:{ 
      refresh:true
    }
  },
  {
    path: '/detail/:id',
    name: 'DetailNote',
    component: DetailNote,
    meta:{ 
      auth:true
    }
  },
  {
    path: '/edit/:id',
    name: 'EditNote',
    component: EditNote,
    meta:{ 
      auth:true
    }
  },
  {
    path: '/repassword/:token',
    name: 'RenewPassword',
    component: RenewPassword,
    meta:{ 
      noLogin: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta:{ 
      auth: true
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "logout" */ '../views/Logout.vue'),
    meta:{ 
      auth:true
    }

  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) =>{
  if(to.matched.some(record => record.meta.auth)){
    if(localStorage.refresh_token && !localStorage.token ){
      next('/refresh')
    }else if(!localStorage.token || !localStorage.refresh_token){
      next('/login')
    }else{
      next()
    }
  }else if(to.matched.some(record => record.meta.noLogin)){
    if(localStorage.token && localStorage.refresh_token){
      next('/dashboard')
    }else{
      next()
    }
  }else if(to.matched.some(record => record.meta.refresh)){
    if(!localStorage.refresh_token){
      next('/login')
    }else{
      next()
    }
  }else{
    next()
  }
})


export default router
