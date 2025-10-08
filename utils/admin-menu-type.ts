export interface MenuItem {
  menuId: string
  menuName: string
  level: number | undefined
  parentId?: string
  route?: Component
  screenId?: string
  screenName?: string
  sort?: number | undefined
  useYn?: string
}
