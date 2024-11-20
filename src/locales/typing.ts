import { createI18n } from 'vue-i18n'

export type SupportedLanguagesType = 'en-US' | 'zh-CN'

export type ImportLocaleFn = () => Promise<{ default: Record<string, string> }>

export type LoadMessageFn = (
  lang: SupportedLanguagesType
) => Promise<Record<string, string> | undefined>

export const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: 'zh-CN',
  message: {}
})
