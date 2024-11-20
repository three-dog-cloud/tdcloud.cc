import type { RouteRecordRaw } from 'vue-router'

export type AppRouteRecordRaw = RouteRecordRaw & {
  parent?: Symbol
  meta: {
    ignoreAuth: boolean
    isAnchored?: boolean
    title: string
    icon?: string
  }
}

export function defineRoute(record: AppRouteRecordRaw): AppRouteRecordRaw
export function defineRoute(records: AppRouteRecordRaw[]): AppRouteRecordRaw[]
export function defineRoute(...MuchRecord: AppRouteRecordRaw[]): AppRouteRecordRaw[]
export function defineRoute(
  records: AppRouteRecordRaw | AppRouteRecordRaw[],
  ...MuchRecord: AppRouteRecordRaw[]
) {
  if (records instanceof Array) return records
  if (MuchRecord != undefined) return [records, ...MuchRecord]
  return records
}
