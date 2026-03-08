import type { Member } from '~~/types/user'

export const useMember = () => {
  const getMemberList = async (form: Ref<Member>) => {
    const res = await customUseFetch<ApiResponse<Member[]>>(
      '/member-service/member',
      {
        method: 'get',
        query: form,
      },
    )
    return res
  }

  return { getMemberList }
}
