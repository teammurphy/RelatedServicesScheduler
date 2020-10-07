import Vue from 'vue'
import VueRouter from 'vue-router'
//general views
import Home from '../views/Home.vue'
import About from '../views/About.vue'
//provider views
import ProviderMyCaseload from '../views/ProviderMyCaseload'
//admin views
import AdminUsers from '../views/AdminUsers.vue'
//auth views
import AuthRegister from '../views/AuthRegister.vue'
import AuthLogin from '../views/AuthLogin.vue'
//not yet sorted
import Students from '../views/Students.vue'
import Student from '../views/Student.vue'
import Users from '../views/Users.vue'
import User from '../views/User.vue'
import DemoFullCalendar from '../views/DemoFullCalendar.vue'
import MandateScheduler from '../views/MandateScheduler.vue'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  //general views
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  //provider views
  {
    path: '/mycaseload',
    name: 'mycaseload',
    component: ProviderMyCaseload,
    meta: { requiresAuth: true }
  },
  //admin views
  {
    path: '/adminusers',
    name: 'adminusers',
    component: AdminUsers
  },
  //auth views
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
  //odds and ends - need to be sorted
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
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
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