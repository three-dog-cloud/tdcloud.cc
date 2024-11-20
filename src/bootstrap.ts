import { createPinia } from 'pinia'
import type { App } from 'vue'
import { useSystemStore } from './stores'

export async function initStore(app: App) {
  const { createPersistedState } = await import('pinia-plugin-persistedstate')

  const pinia = createPinia()

  pinia.use(
    createPersistedState({
      key: (storeKey: string) => `td-client-${storeKey}`,
      storage: localStorage
    })
  )

  app.use(pinia)

  const systemStore = useSystemStore()
  await systemStore.initServerConfig()


  return pinia
}
