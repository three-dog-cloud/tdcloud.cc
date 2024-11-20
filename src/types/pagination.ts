export interface Pagination<T, S> {
    total: number
    page: number
    limit: number
    link: {
        next: string
        prev: string
    },
    items: Array<T> | null,
    filter: null | Array<S>
}

export type PaginationSearchItemType = 'select' | 'input' | 'datetime'

export interface PaginationSearchItemOption {
    label: string
    value: string
}
export interface PaginationSearchItem {
    label: string
    name: string
    type: PaginationSearchItemType
    options: null | Array<PaginationSearchItemOption>
    value: any
}

export const defaultPagination: Pagination<any, any> = {
    total: 0,
    page: 1,
    limit: 10,
    link: {
        next: '',
        prev: ''
    },
    items: null,
    filter: null
}