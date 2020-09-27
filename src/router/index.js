import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Students from '../views/Students.vue'
import Student from '../views/Student.vue'
import Users from '../views/Users.vue'
import User from '../views/User.vue'
import DemoFullCalendar from '../views/DemoFullCalendar.vue'
import DemoMandateScheduler from '../views/DemoMandateScheduler.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/demofullcalendar',
    name: 'DemoFullCalendar',
    component: DemoFullCalendar
  },
  {
    path: '/demoMandateScheduler',
    name: 'DemoMandateScheduler',
    component: DemoMandateScheduler
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
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router