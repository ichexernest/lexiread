import { useState, useCallback } from 'react'
import { useAuth } from '@clerk/nextjs'
import useSWR, { mutate } from 'swr'

interface ApiConfig extends RequestInit {
  url: string
  requireAuth?: boolean
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  revalidateOnFocus?: boolean
  revalidateOnReconnect?: boolean
  revalidateOnMount?: boolean
}

interface ApiResponse<T = any> {
  data?: T
  error?: string
  status: number
  ok: boolean
}

interface UseApiReturn<T> {
  data: T | null
  loading: boolean
  error: string | null
  execute: (config?: Partial<ApiConfig>) => Promise<ApiResponse<T>>
  mutate: (data?: T | ((current: T) => T)) => void
  reset: () => void
  refresh: () => void
}

// 統一的 fetcher 支援認證
const createAuthFetcher = (
  getToken: () => Promise<string | null>,
  requireAuth: boolean = true
) => async (url: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  }

  if (requireAuth) {
    const token = await getToken()
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }

  const response = await fetch(url, { headers })
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  return response.json()
}

export function useApi<T = any>(
  url?: string,
  options: Partial<ApiConfig> = {}
): UseApiReturn<T> {
  const {
    requireAuth = true,
    method = 'GET',
    revalidateOnFocus = false,
    revalidateOnReconnect = true,
    revalidateOnMount = true,
    ...swrOptions
  } = options

  const [manualData, setManualData] = useState<T | null>(null)
  const [manualLoading, setManualLoading] = useState(false)
  const [manualError, setManualError] = useState<string | null>(null)
  const { getToken } = useAuth()

  // 只有 GET 請求且提供了 URL 才使用 SWR
  const shouldUseSWR = method === 'GET' && !!url
  const swrKey = shouldUseSWR ? url : null

  const { 
    data: swrData, 
    error: swrError, 
    mutate: swrMutate,
    isLoading: swrLoading 
  } = useSWR(
    swrKey,
    swrKey ? createAuthFetcher(getToken, requireAuth) : null,
    {
      revalidateOnFocus,
      revalidateOnReconnect,
      revalidateOnMount,
      ...swrOptions
    }
  )

  const execute = useCallback(async (config: Partial<ApiConfig> = {}) => {
    const {
      url: execUrl = url,
      method: execMethod = method,
      requireAuth: execRequireAuth = requireAuth,
      headers = {},
      ...restConfig
    } = config

    if (!execUrl) {
      throw new Error('API URL is required')
    }

    // GET 請求優先返回 SWR 數據
    if (execMethod === 'GET' && shouldUseSWR && swrData && !config.url) {
      return {
        data: swrData,
        status: 200,
        ok: true
      }
    }

    setManualLoading(true)
    setManualError(null)

    try {
      const finalHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(headers as Record<string, string>)
      }

      if (execRequireAuth) {
        const token = await getToken()
        if (token) {
          finalHeaders.Authorization = `Bearer ${token}`
        }
      }

      const response = await fetch(execUrl, {
        method: execMethod,
        headers: finalHeaders,
        ...restConfig
      })

      let result
      try {
        result = await response.json()
      } catch {
        result = null
      }

      const apiResponse: ApiResponse<T> = {
        data: result,
        status: response.status,
        ok: response.ok,
        error: response.ok ? undefined : result?.error || 'Request failed'
      }

      if (response.ok) {
        setManualData(result)
        
        // 非 GET 請求成功後，更新相關的快取
        if (execMethod !== 'GET') {
          // 更新當前資源的快取
          if (execMethod === 'PUT' || execMethod === 'PATCH') {
            mutate(execUrl, result, false)
          }
          // 刪除操作清除快取
          else if (execMethod === 'DELETE') {
            mutate(execUrl, undefined, false)
          }
          // 創建操作可能需要重新驗證列表
          else if (execMethod === 'POST') {
            // 重新驗證相關的列表快取（可以根據需要自定義）
            mutate(key => typeof key === 'string' && key.startsWith(execUrl.split('/').slice(0, -1).join('/')))
          }
        }
      } else {
        setManualError(apiResponse.error || 'Request failed')
      }

      return apiResponse

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setManualError(errorMessage)
      
      return {
        status: 0,
        ok: false,
        error: errorMessage
      } as ApiResponse<T>
    } finally {
      setManualLoading(false)
    }
  }, [url, method, requireAuth, getToken, shouldUseSWR, swrData])

  const reset = useCallback(() => {
    setManualData(null)
    setManualError(null)
    setManualLoading(false)
  }, [])

  const refresh = useCallback(() => {
    if (shouldUseSWR) {
      swrMutate()
    } else {
      execute()
    }
  }, [shouldUseSWR, swrMutate, execute])

  // 統一的 mutate 函數
  const unifiedMutate = useCallback((data?: T | ((current: T) => T)) => {
    if (shouldUseSWR) {
      swrMutate(data as any)
    } else {
      if (typeof data === 'function') {
        setManualData(prev => prev ? (data as (current: T) => T)(prev) : null)
      } else {
        setManualData(data || null)
      }
    }
  }, [shouldUseSWR, swrMutate])

  return {
    data: shouldUseSWR ? swrData : manualData,
    loading: shouldUseSWR ? swrLoading : manualLoading,
    error: shouldUseSWR ? swrError?.message : manualError,
    execute,
    mutate: unifiedMutate,
    reset,
    refresh
  }
}