export interface LoginResponse {
  accessToken: string
  memberId: number | null
  memberName: string
  isLogin: boolean
  code?: string
}

export interface AuthState {
  accessToken: string
  memberId: number | null
  memberName: string
  isLogin: boolean
}

export interface Member {
  loginId: string
  name: string
  mobileNumber: string
}
