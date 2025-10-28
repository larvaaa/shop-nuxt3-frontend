export interface MenuItem {
  menuId: string
  menuName: string
  level: number | undefined
  parentId?: string
  route?: Component
  screenId?: string
  screenName?: string
  screenPath?: string
  sort?: number | undefined
  useYn?: string
  params?: Record<string, string>
}
export interface Screen {
  id?: string
  name: string
  path: string
  useYn?: string
  params?: Record<string, string>
}
