import type { Screen } from '~~/utils/admin-menu-type'

export const screen = ref<Screen>({} as Screen)

export async function getScreenList() {
  const response = await useCustomFetch<Screen[]>('/screen', {
    method: 'get',
  })

  return response
}

export async function getScreen(id: string) {
  const response = await useCustomFetch<Screen>(`/screen/${id}`, {
    method: 'get',
  })

  screen.value = response
}
