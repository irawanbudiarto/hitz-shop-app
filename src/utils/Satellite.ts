import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

// Base instance for API calls
const Satellite = axios.create({
  baseURL: `${process.env.API_PROTOCOL}://${process.env.API_HOST}`,
  timeout: 30000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})

// Debug mode
const DEBUG = process.env.NODE_ENV === 'development'

// Request Interceptor
Satellite.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (DEBUG) {
      console.info('Request:', config)
    }
    return config
  },
  (error: AxiosError) => {
    if (DEBUG) {
      console.error('Request Error:', error)
    }
    return Promise.reject(error)
  }
)

// Response Interceptor
Satellite.interceptors.response.use(
  (response: AxiosResponse) => {
    if (DEBUG) {
      console.info('Response x:', response)
    }
    return response
  },
  (error: AxiosError) => {
    if (DEBUG) {
      console.error('Response Error:', error.response || error.message)
    }

    // Handle Unauthorized Error
    if (error.response?.status === 401) {
      console.warn('⚠️ Unauthorized! Trigger logout logic.')
      // Optional: Add logout logic if needed
    }

    // Optional: Show error messages using your UI components

    return Promise.reject(
      error.response?.data || error.message || 'Unknown error occurred'
    )
  }
)

export default Satellite
