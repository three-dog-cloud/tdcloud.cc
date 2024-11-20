import { computed, h, ref, watch } from 'vue'
import { createDiscreteApi, lightTheme, darkTheme, NAlert, type MessageRenderMessage, type MessageType } from 'naive-ui'
import { useColorMode } from '@vueuse/core'


const themeRef = ref<'light' | 'dark' | 'auto'>(useColorMode().value)

watch(
  useColorMode(),
  (newColorMode) => {
    themeRef.value = newColorMode === 'dark' ? 'dark' : 'light';
  }
);

const themeProviderProps = computed(() => ({
  theme: themeRef.value == 'dark' ? darkTheme : lightTheme,
  themeOverrides: {
    common: {
      borderRadius: '1rem',
    },
    LoadingBar: {
      colorLoading: "#2563ebFF",
      colorError: "#FB1A1DFF"
    }
  }
}))

const themeOverridesProviderProps = computed(() => ({
  themeOverrides: {
    common: {
      borderRadius: '1rem',
    },
  },
  max: 3,
  keepAliveOnHover: true
}))

export const { dialog, loadingBar, message, modal, notification } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar', 'modal'],
  {
    configProviderProps: themeProviderProps,
    loadingBarProviderProps: themeProviderProps,
    messageProviderProps: themeOverridesProviderProps,
    notificationProviderProps: themeOverridesProviderProps,
  }
)


export const nAlertMessage = (content: string, title: string = '错误', elType: MessageType = 'error') => {
  const renderMessage: MessageRenderMessage = (props) => {
    const { type } = props
    return h(
      NAlert,
      {
        closable: props.closable,
        onClose: props.onClose,
        type: type === 'loading' ? 'default' : type,
        title: title,
        class: ['w-80', 'w-max[calc(100vw - 32px)]', 'dark:text-gray-100', 'text-gray-800']
      },
      {
        default: () => props.content
      }
    )
  }

  message.create(content, {
    type: elType,
    render: renderMessage,
    closable: true
  })
}
