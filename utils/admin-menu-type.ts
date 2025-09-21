export interface MenuItem {
  menuId: string
  menuName: string
  menuLevel: number
  parentId?: string
  route?: Component
}
