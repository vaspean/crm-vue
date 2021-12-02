import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/compat/app'
import store from '../store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Categories.vue'),
  },
  {
    path: '/detail-record/:id',
    name: 'detail-record',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/DetailRecord.vue'),
  },
  {
    path: '/history',
    name: 'history',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/History.vue'),
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Planning.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/record',
    name: 'record',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Record.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=> {
  const currentUser = firebase.auth().currentUser
  const requiredAuth = to.matched.some(path => path.meta.auth)
  if (to.path === '/login' || to.path === '/register') {
    store.commit('setLocaleEmpty', `en-US`)
  }

  if (requiredAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
