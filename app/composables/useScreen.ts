import type { Screen } from '~~/utils/admin-menu-type'

export const useScreen = () => {
  const getScreenList = (form: Search) => {
    return customUseFetch<Screen[]>('/admin-service/screen', {
      method: 'get',
      query: form,
      watch: false,
    })
  }

  const getScreen = (id: string) => {
    return customUseFetch<Screen>(`/admin-service/screen/${id}`, {
      method: 'get',
    })
  }

  const saveScreen = async (form: Screen) => {
    let res = null
    if (form.id) {
      res = await customFetch(`/admin-service/screen/${form.id}`, {
        method: 'patch',
        body: form,
      })
    } else {
      res = await customFetch('/admin-service/screen', {
        method: 'post',
        body: form,
      })
    }

    return res
  }

  const deleteScreen = async (form: Screen) => {
    const res = await customFetch(`/admin-service/screen/${form.id}`, {
      method: 'delete',
    })

    return res
  }

  return {
    getScreenList,
    getScreen,
    saveScreen,
    deleteScreen,
  }
}
