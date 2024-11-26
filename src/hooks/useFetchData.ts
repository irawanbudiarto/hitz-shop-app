import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useCallback, useEffect, useState } from 'react'

import Satellite from '@/utils/Satellite'

interface UseFetchDataResult<T> {
  data: T | null
  error: AxiosError | null
  loading: boolean
  refetch: () => void
}

const useFetchData = <T>(
  url: string,
  method: AxiosRequestConfig['method'] = 'GET',
  payload: any = null
): UseFetchDataResult<T> => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<AxiosError | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [fetchKey, setFetchKey] = useState<number>(0) // to trigger re-fetch

  const refetch = useCallback(() => {
    setFetchKey((prevKey) => prevKey + 1) // Change key to trigger useEffect re-run
  }, [])

  useEffect(() => {
    let isMounted = true // to prevent setting state on unmounted component

    const fetchData = async () => {
      try {
        const options: AxiosRequestConfig = {
          method,
          url,
          data: method !== 'GET' ? payload : undefined,
        }

        const response: AxiosResponse<T> = await Satellite(options)

        if (isMounted) {
          setData(response.data)
        }
      } catch (error) {
        if (isMounted) {
          setError(error as AxiosError)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [url, method, payload, fetchKey]) // Re-run useEffect when fetchKey changes

  return { data, error, loading, refetch }
}

export default useFetchData
