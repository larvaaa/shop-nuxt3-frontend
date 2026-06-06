export interface Brand {
  id: string
  name: string
  description: string
  logoUrl: string | null
  attachFile: File | null
  isUse: boolean
  createdAt: string
}
