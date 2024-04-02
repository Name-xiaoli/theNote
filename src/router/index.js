import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/loginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/layoutContainer.vue'),
      redirect: '/note/home',
      children: [
        {
          path: '/note/home',
          component: () => import('@/views/layout/components/layoutHome.vue')
        },
        {
          path: '/note/class',
          component: () => import('@/views/note/noteClass.vue')
        },
        {
          path: '/note/message',
          component: () => import('@/views/note/noteMessage.vue')
        },
        {
          path: '/note/amend',
          component: () => import('@/views/note/noteAmend.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/changePassword.vue')
        },
        {
          path: '/user/img',
          component: () => import('@/views/user/changeImg.vue')
        }
      ]
    }
  ]
})

// 登录访问拦截 => 默认是直接放行的
// 根据返回值决定，是放行还是拦截
// 返回值：
// 1. undefined / true  直接放行
// 2. false 拦回from的地址页面
// 3. 具体路径 或 路径对象  拦截到对应的地址
//    '/login'   { name: 'login' }
router.beforeEach((to) => {
  // 如果没有token, 且访问的是非登录页，拦截到登录，其他情况正常放行
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login') return '/login'
})

export default router
