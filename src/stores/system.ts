import { defaultServerConfig, serverKey, type IServerClientConfig } from '@/config/server'
import { defineStore } from 'pinia'
import type { IErrorResponse } from '@/api'
import { System } from '@/api/server'

interface SystemState {
  config: IServerClientConfig | null,
  lastFetchTime: number | null,
  timer: ReturnType<typeof setTimeout> | null,
  timeStamp: number
  isExpired: boolean
}

export const useSystemStore = defineStore(serverKey, {
  state: (): SystemState => ({
    config: null,
    lastFetchTime: null,
    timer: null,
    timeStamp: 0,
    isExpired: true,
  }),

  getters: {},

  actions: {
    async initServerConfig() {
      if (this.checkExpiration()) {
        await System.getServerProperties().then((res) => {
          this.config = res
          this.lastFetchTime = Date.now()
          this.isExpired = false
        }).catch((err: IErrorResponse) => {
          console.log('Failed to fetch server properties:', err)
          this.config = defaultServerConfig
        })
      }
      return this.config
    },

    checkExpiration() {
      const now = Date.now()
      const oneHour = 10 * 60 * 1000 // 30 minutes in milliseconds
      this.isExpired = !this.lastFetchTime || (now - this.lastFetchTime > oneHour)

      return this.isExpired
    },

    initTimeStamp(timeStamp: number = Date.now()) {
      this.timeStamp = timeStamp
      if (this.timer) clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.timeStamp += 1000
      }, 1000)
    }
  },
  persist: true
})
