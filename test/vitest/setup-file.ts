import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { config } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import messages from '@/i18n'

const i18n = createI18n({
  locale: 'pt-BR',
  legacy: false,
  messages,
})

installQuasarPlugin()

config.global.plugins = [i18n]
