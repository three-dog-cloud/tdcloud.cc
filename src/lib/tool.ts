import { toast } from "vue-sonner"

export const copyToClipboard = (text: string) => {
    if (text.length > 0) {
        navigator.clipboard.writeText(text)
        toast.success('复制成功')
    }
}