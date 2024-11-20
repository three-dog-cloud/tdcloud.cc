import { defineStore } from 'pinia'

interface TokenState {
    token: string
    token_timeout: number,
    refreshToken: string,
    refreshToken_timeout: number,
}

export const useTokenStore = defineStore('user_tk', {
    state: (): TokenState => ({
        token: '',
        token_timeout: 0,
        refreshToken: '',
        refreshToken_timeout: 0,
    }),

    getters: {
        isTokenValid(): boolean {
            return Date.now() <= this.token_timeout
        },
        isRefreshTokenValid(): boolean {
            return Date.now() <= this.refreshToken_timeout
        },

        isLogin(): boolean {
            return this.token.length > 0
        }
    },

    actions: {
        getToken(): string {
            return this.token
        },

        setToken(token: string, timeout: number): void {
            this.token = token
            this.token_timeout = Date.now() + (timeout * 1000)
        },

        removeToken(): void {
            this.token = ''
            this.token_timeout = 0
        },

        getRefreshToken(): string {
            return this.refreshToken
        },

        setRefreshToken(token: string, timeout: number): void {
            this.refreshToken = token
            this.refreshToken_timeout = Date.now() + (timeout * 1000)
        },

        removeRefreshToken(): void {
            this.refreshToken = ''
            this.refreshToken_timeout = 0
        },

        clearAllTokens(): void {
            this.removeToken()
            this.removeRefreshToken()
        },
    },
    persist: true,
})