import type { HTMLAttributes, VNode } from "vue"

export type AlertDialogNodeType = string | VNode | VNode[] | null

export interface AlertDialogProps<T> {
    class?: HTMLAttributes['class']
    cancelText?: string
    confirmText?: string
    isShowConfirm?: boolean
    isShowCancel?: boolean

    title?: string
    contentNode?: T
    description?: T
    onBerforeCreate?: () => void

    open: boolean
}