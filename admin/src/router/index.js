import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '../views/main.vue'
import CategoryEdit from '../views/CategoryEdit'
import CategoryList from '../views/CategoryList'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'main',
    component: main,
    children: [
      {path:'/categories/create', component: CategoryEdit },
      {path:'/categories/list', component: CategoryList}
    ]
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
  routes
})

export default router
