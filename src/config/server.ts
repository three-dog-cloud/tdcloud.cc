export interface IServerClientConfig {
  register: boolean
  github: boolean
  discourse: boolean
  google: boolean
  telegram: boolean
  register_incentives: boolean
}

export const serverKey = 'server_client_config'

export const defaultServerConfig: IServerClientConfig = {
  register: false,
  github: false,
  discourse: false,
  google: false,
  telegram: false,
  register_incentives: false
}
