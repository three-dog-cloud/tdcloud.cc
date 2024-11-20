import request from "../request";

export namespace Discourse {
    export interface IDiscourseResponse {
        time_period: number; // 信任级别 3 要求时间段（以天为单位）
        requirements_met: boolean;  // 是否符合升级 信任级别 3 
        requirements_lost: boolean; // 是否无需要求符合条件升级
        trust_level_locked: boolean; // 是否遭到信任级别锁定
        on_grace_period: boolean; // 是否按照时间段
        days_visited: number; // 截止目前时间已访问天数 （26%）
        min_days_visited: number; // 信任级别 3 要求最少访问天数 （50%）
        num_topics_replied_to: number; // 当前时间段已回复话题数
        min_topics_replied_to: number; // 要求截止当前时间段最小回复话题数
        topics_viewed: number; // 截止当前时间段浏览话题数
        min_topics_viewed: number;// 信任级别 3 要求最少浏览话题数
        posts_read: number;// 截止当前时间段阅读帖子数量
        min_posts_read: number; // 信任级别 3 要求浏览帖子数量
        topics_viewed_all_time: number;// 截止当前时间段浏览的话题（所有时间
        min_topics_viewed_all_time: number;// 截止当前时间段要求浏览话题时间 （所有时间）
        posts_read_all_time: number; // 截止目前时间段浏览的话题总数
        min_posts_read_all_time: number; // 截止目前时间段要求浏览的最小话题总数
        num_flagged_posts: number; // 截止目前时间段被举报的帖子数
        max_flagged_posts: number; // 截止目前时间段要求最多被举报的帖子数（此处是不能违反）
        num_flagged_by_users: number; // 截止目前时间段发起举报大的用户数
        max_flagged_by_users: number; // 截止目前时间段要求最多被举报的用户数（此处是不能违反）
        num_likes_given: number; // 截止目前时间段点赞数量
        min_likes_given: number; // 截止目前时间段要求点赞数量
        num_likes_received: number; // 截止目前时间段获取点赞数量
        min_likes_received: number; // 截止目前时间段要求获取点赞数量
        num_likes_received_days: number; // 截止目前时间段（单日最高）获取点赞数量
        min_likes_received_days: number; // 截止目前时间段（单日最高）要求获取点赞数量
        num_likes_received_users: number; // 截止目前时间段收到用户点赞数量
        min_likes_received_users: number; // 截止目前时间段要求收到用户点赞数量
        penalty_counts: { // 惩罚次数（过去100天）此处的100天获取的是 time_period 参数  
            silenced: number; // 禁言次数
            suspended: number; // 停用次数
            total: number; // 处罚总数
        };
        trust_level: number; // 论坛等级
        name: string; // 论坛账号名称
        username: string; // 论坛登录账号名
    }

    export function getDiscourse(): Promise<IDiscourseResponse> {
        return request({
            url: "/account/discourse/user",
            method: 'get'
        })
    }
}