import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Students from '../views/Students.vue'
import Student from '../views/Student.vue'
import Users from '../views/Users.vue'
import User from '../views/User.vue'
import DemoFullCalendar from '../views/DemoFullCalendar.vue'
import MandateScheduler from '../views/MandateScheduler.vue'
import Dashboard from '../views/Dashboard.vue'
import AuthRegister from '../views/AuthRegister.vue'
import AuthLogin from '../views/AuthLogin.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/register',
    name: 'register',
    component: AuthRegister
  },
  {
    path: '/login',
    name: 'login',
    component: AuthLogin
  },
  {
    path: '/demofullcalendar',
    name: 'DemoFullCalendar',
    component: DemoFullCalendar
  },
  {
    path: '/mandate_scheduler/:caseloadId',
    name: 'MandateScheduler',
    component: MandateScheduler
  },
  {
    path: '/students',
    name: 'Students',
    component: Students
  },
  {
    path: '/student/:studentId',
    name: 'Student',
    component: Student
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/user/:userId',
    name: 'User',
    component: User
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  //why do we use user from local storage and not from vuex?
  const loggedIn = localStorage.getItem('user')

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {    
      next('/')
  } else {
    next()
  }
})

export default router