import type { UserInfo } from "@/stores/personal"
import request from "../request"
import type { Token } from "@/config/user";
import type { IResponse } from "../response";

export namespace User {
    export interface LoginParams {
        username: string;
        password: string;
    }

    export interface LoginResult extends Token { }

    export function requestLogin(params: LoginParams): Promise<LoginResult> {
        params.password = window.btoa(params.password)
        return request<LoginResult>({
            url: "/account/login",
            method: 'post',
            data: params
        })
    }

    export function requestRefreshToken(): Promise<LoginResult> {
        return request<LoginResult>({
            url: "/account/refresh",
            method: 'post',
        })
    }

    export interface IUserResponse extends UserInfo { }

    export function getUserInfo(): Promise<IUserResponse> {
        return request({
            url: "/account/user",
            method: "get"
        })
    }


    export interface IUpdateAccountPasswordParams {
        old_password: string;
        password: string;
        confirm_password: string;
    }

    export function updateAccountPassword(params: IUpdateAccountPasswordParams): Promise<IResponse> {
        params.old_password = window.btoa(params.old_password)
        params.password = window.btoa(params.password)
        params.confirm_password = window.btoa(params.confirm_password)

        return request({
            url: '/account/password',
            method: 'put',
            data: params
        })
    }

    export interface IUpdateAccountUsernameParams {
        username: string;
    }

    export function updateAccountUsername(params: IUpdateAccountUsernameParams): Promise<IResponse> {
        return request({
            url: '/account/name',
            method: 'put',
            data: params
        })
    }
}