import type { IServerClientConfig } from '@/config/server'
import request from '../request'

export namespace System {
  export interface IServerProperties extends IServerClientConfig { }

  export interface IWelcomeMessage {
    message: string
  }

  export function getServerProperties(): Promise<IServerProperties> {
    return request<IServerProperties>({
      url: '/.well-known/properties.json',
      method: 'get'
    })
  }

  export function getWelcomeMessage(): Promise<IWelcomeMessage> {
    return request<IWelcomeMessage>({
      url: '/',
      method: 'get'
    })
  }
}