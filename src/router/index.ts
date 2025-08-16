import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import ProfilePage from '../components/ProfilePage.vue'
import AboutPage from '../components/AboutPage.vue'
import CareersPage from '../components/CareersPage.vue'
import ContactPage from '../components/ContactPage.vue'
import PressPage from '../components/PressPage.vue'
import userStore from '../stores/userStore'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  { path: '/help', name: 'Help', component: () => import('../components/HelpPage.vue') },
  { path: '/shipping', name: 'Shipping', component: () => import('../components/ShippingPage.vue') },
  { path: '/returns', name: 'Returns', component: () => import('../components/ReturnsPage.vue') },
  { path: '/invoice', name: 'Invoice', component: () => import('../components/InvoicePage.vue') },
  { path: '/guide', name: 'Guide', component: () => import('../components/GuidePage.vue') },
  { path: '/security', name: 'Security', component: () => import('../components/SecurityPage.vue') },
  { path: '/payment', name: 'Payment', component: () => import('../components/PaymentPage.vue') },
  { path: '/promotions', name: 'Promotions', component: () => import('../components/PromotionsPage.vue') },
  { path: '/activities', name: 'Activities', component: () => import('../components/ActivitiesPage.vue') },
  { path: '/analytics', name: 'Analytics', component: () => import('../components/AnalyticsPage.vue') },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
    meta: { requiresAuth: true }
  },
  { path: '/about', name: 'About', component: AboutPage },
  { path: '/careers', name: 'Careers', component: CareersPage },
  { path: '/contact', name: 'Contact', component: ContactPage },
  { path: '/press', name: 'Press', component: PressPage },
  { path: '/cart', name: 'Cart', component: () => import('../components/CartPage.vue'), meta: { requiresAuth: true } },
  { path: '/checkout', name: 'Checkout', component: () => import('../components/CheckoutPage.vue'), meta: { requiresAuth: true } },
  { path: '/product/:id', name: 'ProductDetail', component: () => import('../components/ProductDetailPage.vue'), meta: { requiresAuth: true } },
  { path: '/pay/alipay', name: 'PayAlipay', component: () => import('../components/pay/PayAlipay.vue') },
  { path: '/pay/wechat', name: 'PayWeChat', component: () => import('../components/pay/PayWeChat.vue') },
  { path: '/pay/card', name: 'PayCard', component: () => import('../components/pay/PayCard.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 简单登录守卫：需要登录的页面，如果未登录则跳转到登录页
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !userStore.checkLoginStatus()) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router 