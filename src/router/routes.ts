import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/HomePage.vue'),
  },
  {
    path: '/hotels/place/:id(\\d+)',
    component: () => import('layouts/HotelsPage.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
