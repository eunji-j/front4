import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import MovieDetail from '../components/MovieDetail.vue'
import Mypage from '../components/Mypage.vue'
import Select from '../components/Select.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/detail',
    name: 'detail',
    component: MovieDetail
  },
  {
    // 이름을 가지는 routes
    path: '/mypage/:userId',
    name: 'mypage',
    component: Mypage,
    props: true
  },
  {
    path: '/select',
    name: 'select',
    component: Select
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
