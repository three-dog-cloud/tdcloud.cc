import request from "../request"

export namespace Role {
    export interface IRouterParams {
        api: number
    }

    export interface IRouterResponse {
        title: string
        icon: string | null
        path: string
        index: number
        children: IRouterResponse[]
    }

    export function getRoutes(params: IRouterParams): Promise<IRouterResponse[]> {
        return request<IRouterResponse[]>({
            url: "/routes",
            method: "get",
            data: params
        })
    }
}