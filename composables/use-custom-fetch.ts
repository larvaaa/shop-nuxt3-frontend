interface UseCustomFetchOptions {
  method: 'get' | 'post' | 'put' | 'delete'
  body?: Record<string, any>
}

export const useCustomFetch = async <R>(
  url: string,
  options: UseCustomFetchOptions,
) => {
  const { $api } = useNuxtApp()

  const response = await $api<R>(url, {
    method: options.method,
    body: options.body,
  })

  return response
}
