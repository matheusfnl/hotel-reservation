import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: () => import('pages/HomeView.vue'),
  },
  {
    name: 'hotels.place',
    path: '/hotels/place/:placeId(\\d+)',
    component: () => import('pages/HotelsView.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
