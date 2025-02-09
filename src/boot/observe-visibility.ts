import { boot } from 'quasar/wrappers'
import VueObserveVisibility from 'vue3-observe-visibility'

export default boot(({ app }) => {
  app.use(VueObserveVisibility)
})
