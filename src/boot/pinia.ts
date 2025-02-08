import { boot } from 'quasar/wrappers'
import { createPinia, PiniaVuePlugin } from 'pinia'

export default boot(({ app }) => {
  const pinia = createPinia()

  app.use(PiniaVuePlugin)
  app.use(pinia)
})
