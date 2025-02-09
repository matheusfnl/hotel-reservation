import { boot } from 'quasar/wrappers'
import mitt from 'mitt'

import type { DrawerState } from '@/types'

const emitter = mitt()

export default boot(({ app }) => {
  const drawer = {
    open(data: DrawerState) {
      emitter.emit('drawer-open', data)
    },
    close() {
      emitter.emit('drawer-close')
    },
  }

  app.provide('emitter', emitter)
  app.provide('drawer', drawer)
})
