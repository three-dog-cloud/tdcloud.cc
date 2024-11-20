import type { Pagination, Params } from "@/types"
import request from "../request"

export namespace Commodity {
    export interface ICommodityParams extends Params {
        gd_no?: string
        gd_name?: string
        gd_keywords?: string
    }

    export interface ICommodityResponse {
        gd_no: string // 商品编号
        gd_name: string // 商品名称
        gd_keywords: Array<string> // 商品关键词
        gd_type: number// 商品类型
        gd_type_label: string // 商品类型名称
        picture_url: string// 商品图片地址
        retail_price: number // 零售价
        actual_price: number // 实际价格
        in_stock: number// 库存
        sales_volume: number// 销量
        connected_user_no: string// 连接的用户编号
        connected_user_name: string // 连接的用户名称
        created_at: string// 创建时间
        updated_at: string// 更新时间
    }

    export interface ICommodityDetailResponse extends ICommodityResponse {
        gd_description: string // 商品描述
        buy_limit_num: number // 限购数量
        buy_prompt: string // 购买提示
        wholesale_price_cnf: Array<string> // 批发价配置
        other_ipu_cnf: Array<string> // 其他信息配置
        pre_api_hook: string // 预API钩子
    }

    export function searchCommodityList(params: ICommodityParams): Promise<Pagination<ICommodityResponse, null>> {
        return request({
            url: "/commodity",
            method: "get",
            params: params
        })
    }

    export function getCommodityDetail(gd_no: string): Promise<ICommodityDetailResponse> {
        return request({
            url: `/commodity/${gd_no}`,
            method: "get"
        })
    }
}