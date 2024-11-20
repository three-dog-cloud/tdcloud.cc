import { defineStore } from "pinia";
import { User } from "@/api/personal";

export interface UserInfo {
    node_id: number
    user_no: string
    email: string
    username: string
    last_login_at: string
    last_login_ip: string
    beta_level: number
    wait_delete: boolean
    created_at: string
    updated_at: string
}

export const useUserStore = defineStore('personal-user', {
    state: () => ({
        userInfo: {
            node_id: 0,
            user_no: '',
            email: '',
            username: 'unknown',
            last_login_at: '',
            last_login_ip: '',
            beta_level: 0,
            wait_delete: false,
            created_at: '',
            updated_at: ''
        }
    }),
    getters: {
        node_id(): number {
            return this.userInfo.node_id
        },
        user_no(): string {
            return this.userInfo.user_no
        },
        email(): string {
            return this.userInfo.email
        },
        last_login_at(): string {
            return this.userInfo.last_login_at
        },
        last_login_ip(): string {
            return this.userInfo.last_login_ip
        },
        beta_level(): number {
            return this.userInfo.beta_level
        },
        wait_delete(): boolean {
            return this.userInfo.wait_delete
        },
        created_at(): string {
            return this.userInfo.created_at
        },
        updated_at(): string {
            return this.userInfo.updated_at
        },
        username(): string {
            return this.userInfo.username
        },
    },
    actions: {
        async initUserInfo() {
            this.userInfo = await User.getUserInfo()
        }
    }
})