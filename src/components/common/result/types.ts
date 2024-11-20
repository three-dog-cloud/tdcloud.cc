import type { Ref } from "vue"

export type ResultStatusType =
    | 'error'
    | '500'
    | 'info'
    | 'success'
    | 'warning'
    | '404'
    | '403'
    | '418'

export interface ResultProps {
    sec?: number
    loading?: boolean
    title: string
    description?: string
    status?: ResultStatusType
    init?: (status: Ref<ResultStatusType>) => void
    operation?: () => void
}

export type StatusType = 'loading' | 'success' | 'error'

export interface PageProps {
    status?: StatusType
    title: string
    description?: string
    responseMessage: string
    sec?: number
    init?: (status: Ref<StatusType>) => void
    retryFunc?: (status: Ref<StatusType>) => void
    successFunc?: () => void
}