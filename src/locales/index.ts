import { type Locale } from 'vue-i18n'
import type { ImportLocaleFn, SupportedLanguagesType } from './typing'
import { unref, type App } from 'vue'
import { i18n } from './typing'

const modules = import.meta.glob('./langs/*.json')

const localesMap = loadLocalesMap(modules)

async function loadMessages(lang: SupportedLanguagesType) {
  const appLocaleMessages = await localesMap[lang]?.()
  return appLocaleMessages?.default
}

function loadLocalesMap(modules: Record<string, () => Promise<unknown>>) {
  const localesMap: Record<Locale, ImportLocaleFn> = {}

  for (const [path, loadLocale] of Object.entries(modules)) {
    const key = path.match(/\/([^/]+)\.json$/)?.[1]
    if (key) {
      localesMap[key] = loadLocale as ImportLocaleFn
    }
  }

  return localesMap
}

function setI18nLanguage(locale: Locale) {
  i18n.global.locale.value = locale

  document?.querySelector('html')?.setAttribute('lang', locale)
}

async function setupI18n(app: App) {
  app.use(i18n)
  await loadLocalMessages('zh-CN')

  i18n.global.setMissingHandler((locale, key) => {
    if (key.includes('.')) {
      console.warn(`Missing translation for key ${key} in locale ${locale}`)
    }
  })
}

async function loadLocalMessages(lang: SupportedLanguagesType) {
  const message = await localesMap[lang]?.()

  if (message?.default) {
    i18n.global.setLocaleMessage(lang, message.default)
  }

  const mergeMessage = await loadMessages(lang)
  i18n.global.mergeLocaleMessage(lang, mergeMessage)

  return setI18nLanguage(lang)
}

const $t = i18n.global.t as (key: string, locale?: Locale) => string

export { $t, setupI18n, loadLocalMessages, setI18nLanguage }
