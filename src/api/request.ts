import { API_HOST } from '@/config/client'
import axios, { type AxiosRequestConfig } from 'axios'
import { message, notification } from '@/naive'
import type { IErrorResponse } from './error'
import { useTokenStore, useSystemStore } from '@/stores'
import type { Token } from '@/config/user'
import router from '@/router'
import type { Redirect } from './redirect'

const axiosMap = new Map();
const instance = axios.create({
  baseURL: API_HOST,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Accept-Language': navigator.language.toLowerCase()
  }
})

instance.interceptors.request.use(async (config) => {
  const tkStore = useTokenStore()
  const token = tkStore.getToken()
  const refreshToken = tkStore.getRefreshToken()

  if (token && refreshToken) {
    config.headers.Authorization = `Bearer ${token}`
    config.headers['Authorization-Refresh'] = refreshToken
  }

  if (!tkStore.isTokenValid && tkStore.isRefreshTokenValid && refreshToken && token) {
    try {
      const res = await axios.put<Token>(
        API_HOST + '/account/refresh',
        {},
        {
          headers: {
            'Authorization-Refresh': refreshToken,
            Authorization: 'Bearer ' + token,
          },
        },
      );

      const data = res.data;
      tkStore.setToken(data.token, data.token_timeout);
      tkStore.setRefreshToken(data.refresh_token, data.refresh_token_timeout);
    } catch (e) {
      tkStore.clearAllTokens()
      return Promise.reject(e);
    }

    config.headers.Authorization = `Bearer ${tkStore.getToken()}`
    config.headers['Authorization-Refresh'] = tkStore.getRefreshToken()
  }

  if (!tkStore.isRefreshTokenValid) {
    tkStore.removeToken()
    tkStore.removeRefreshToken()
  }

  const key = config.url + JSON.stringify(config.data);
  if (axiosMap.has(key)) {
    axiosMap.get(key).abort();
  }

  const controller = new AbortController();
  config.signal = controller.signal;
  axiosMap.set(key, controller);

  return config;
})

instance.interceptors.response.use(
  (response) => {
    if (response.headers['Authorization'] && `Bearer ${useTokenStore().getToken()}` != response.headers['Authorization']) {
      useTokenStore().setToken(response.headers.Authorization.split(' ')[1], response.headers["Authorization_At"] ?? 3600)
    }

    if (response.headers["Authorization-Refresh"] && useTokenStore().getRefreshToken() != response.headers["Authorization-Refresh"]) {
      useTokenStore().setRefreshToken(response.headers["Authorization-Refresh"], response.headers["Authorization-Refresh_At"] ?? 7200)
    }

    const nowTime = response.headers.date || Date.now();
    useSystemStore().initTimeStamp(nowTime)
    axiosMap.delete(response.config.url + JSON.stringify(response.config.data))
    return response.data
  },
  async (error) => {
    let errorResponse: IErrorResponse = {
      code: -500,
      error: '手速太快了，慢一点，再慢一点',
      http_status: error.response?.status
    }

    if (error.response) {
      errorResponse = error.response.data as IErrorResponse

      if ([301, 302, 303].includes(error.status)) {
        return Promise.resolve(error.response.data as Redirect);
      }

      if (!isIErrorResponse(errorResponse) && error.status == 500) {
        errorResponse = {
          code: -500,
          error: '服务器返回了未知错误',
          http_status: error.response.status
        };
      }
    } else {
      errorResponse = {
        code: -300,
        error: '网络连接失败，请检查网络连接',
        http_status: 0
      }

      axiosMap.delete(error.config.url + JSON.stringify(error.config.data))

      return Promise.reject(errorResponse)
    }

    if (!error.config.hideError && (errorResponse.code === -500 || errorResponse.code === 10104)) {
      if (!await refreshToken()) {
        message.create(errorResponse.error, {
          type: 'error',
          closable: true,
          duration: 3000,
          keepAliveOnHover: true,
          onLeave: () => {
            if (errorResponse.code === 10104) {
              removeAxios()
              router.push({ name: "LoginPage" })
              return useTokenStore().clearAllTokens()
            }
          }
        })
      } else {
        notification.create({
          type: 'warning',
          title: '已自动刷新会话，请重新加载页面',
          keepAliveOnHover: true,
          closable: true,
          duration: 3000,
        })
      }

      return Promise.reject(errorResponse)
    }

    axiosMap.delete(error.config.url + JSON.stringify(error.config.data))

    throw errorResponse;
  }
)

export function removeAxios() {
  axiosMap.forEach((controller) => {
    controller.abort()
  })
  axiosMap.clear()
}

async function refreshToken() {
  const tkStore = useTokenStore()
  const token = tkStore.getToken()
  const refreshToken = tkStore.getRefreshToken()

  if (token && refreshToken) {
    try {
      const res = await axios.put<Token>(
        API_HOST + '/account/refresh',
        {},
        {
          headers: {
            'Authorization-Refresh': refreshToken,
            Authorization: 'Bearer ' + token,
          },
        },
      );

      const data = res.data;
      tkStore.setToken(data.token, data.token_timeout);
      tkStore.setRefreshToken(data.refresh_token, data.refresh_token_timeout);
      return true
    } catch (e) {
      tkStore.clearAllTokens()
    }
  }

  return false
}

interface customConfig extends AxiosRequestConfig {
  hideError?: boolean
}

export default function request<T>(config: customConfig): Promise<T> {
  config.hideError = config.hideError || false
  return instance.request(config);
}

function isIErrorResponse(obj: any): obj is IErrorResponse {
  return (
    obj &&
    typeof obj.code === 'number' &&
    typeof obj.error === 'string'
  );
}