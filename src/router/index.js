import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login'),
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  }, {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/register/Register'),
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  }, {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop')
  }, {
    path: '/cartList',
    name: 'CartList',
    component: () => import(/* webpackChunkName: "cartListH" */ '../views/cartList/CartList.vue')
  }, {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () => import(/* webpackChunkName: "shop" */ '../views/orderConfirmation/OrderConfirmation.vue'),
    beforeEnter (to, from, next) {
      const shopId = from.params.id
      const productList = store.state.cartList[shopId].productList
      let total = 0
      for (const i in productList) {
        if (productList[i].count) {
          total++
        }
      }
      if (total) {
        next()
      } else {
        next(false)
      }
    }
  }, {
    path: '/orderlist',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "orderListH" */ '../views/orderList/OrderList.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  const { name } = to
  const isLoginOrRegister = (name === 'Login' || name === 'Register');
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'Login' })
  next()
})

export default router
