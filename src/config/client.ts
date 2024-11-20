export const API_HOST = (() => {
    if (import.meta.env.VITE_API_HOST) {
        return import.meta.env.VITE_API_HOST
    }

    if (import.meta.env.VITE_API_PREFIX && import.meta.env.VITE_API_REPLACE) {
        return location.origin.replace(import.meta.env.VITE_API_REPLACE, import.meta.env.VITE_API_PREFIX)
    }

    if (location.origin.split('.').length >= 3) {
        return location.origin.replace(
            location.origin.substring(0, location.origin.lastIndexOf('.')),
            location.protocol + '//api'
        )
    }

    return location.origin + '/api'
})()

export const DISCOURSE_HOST = 'https://discourse.tdcloud.cc'

export const DOCS_HOST = 'https://docs.tdcloud.cc'