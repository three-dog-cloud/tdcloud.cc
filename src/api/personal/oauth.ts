import type { Token } from "@/config/user";
import type { Redirect } from "../redirect";
import request from "../request";
import type { IResponse } from "../response";

export namespace OAuth {
    export interface IAccountOAuthResponse {
        account: string // 第三方账号ID
        connect: number // 第三方平台ID
        platform: string // 第三方平台标题
        username: string // 第三方账号
        bind_time: string | null // 绑定时间
        is_bind: boolean // 关联状态 true 绑定 false 未绑定
    }


    export function getAccountOAuth(): Promise<IAccountOAuthResponse[]> {
        return request({
            url: "/account/connect",
            method: 'get'
        })
    }

    export function unbindAccountOAuth(platform: number): Promise<IResponse> {
        return request({
            url: `/account/connect/${platform}`,
            method: 'delete'
        })
    }

    export function getBindAccountOAuthURL(platform: string): Promise<Redirect> {
        return request({
            url: `/oauth/${platform}/bind`,
            method: 'get'
        })
    }

    export function bindAccountOAuth(platform: string, query: any): Promise<IResponse> {
        return request({
            url: `/oauth/${platform}/bind`,
            method: 'post',
            params: query
        })
    }

    export function callbackAccountOAuth(platform: string, query: any): Promise<Token> {
        return request({
            url: `/oauth/${platform}/callback`,
            method: 'get',
            params: query
        })
    }

    export function getLoginAccountOAuthURL(platform: string): Promise<Redirect> {
        return request({
            url: `/oauth/${platform}/redirect`,
            method: 'get'
        })
    }
}