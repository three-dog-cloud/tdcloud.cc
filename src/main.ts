import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import '@/assets/styles/index.scss'


import { createApp } from 'vue'
import App from './app.vue'
import { setupI18n } from '@/locales'
import router from '@/router'

async function initApplication() {
  const app = createApp(App)
  const { initStore } = await import('./bootstrap')
  await initStore(app)

  await setupI18n(app)

  app.use(router)

  app.mount('#app')
}

initApplication()