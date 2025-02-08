import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: () => import('layouts/HomePage.vue'),
  },
  {
    name: 'hotels.place',
    path: '/hotels/place/:id(\\d+)',
    component: () => import('layouts/HotelsPage.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
