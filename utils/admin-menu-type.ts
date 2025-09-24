export interface MenuItem {
  menuId: string
  menuName: string
  menuLevel: number | undefined
  parentId?: string
  route?: Component
  screenId?: string
  screenName?: string
  order?: number | undefined
  useYn?: string
}
