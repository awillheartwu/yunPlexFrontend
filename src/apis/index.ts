import axios, { /* AxiosRequestConfig, */ AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
// import { Router, RouteLocationNormalizedLoaded } from 'vue-router'

// Define a base URL for your API
const baseURL: string = import.meta.env.VITE_APP_BASE_API as string

// Create an Axios instance
const api = axios.create({
    baseURL,
    timeout: 60000, // Set your desired timeout
    withCredentials: true // Enable or disable sending credentials (cookies) with requests
})

// Request interceptor 暂无权限
// api.interceptors.request.use(
//     config => {
//         // You can add any request headers or modify the request here
//         const token = localStorage.getItem('token')
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`
//         }
//         return config
//     },
//     error => {
//         return Promise.reject(error)
//     }
// )

// Response interceptor
api.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log('♿️ - response:', response);
        // You can handle the response here, such as checking for specific status codes
        // and displaying error messages using Element Plus or your preferred library.
        if (response.status === 200) {
            if (response.data.code === 0) {
                return response.data.data
            } else {
                ElMessage.error(response.data.msg)
                return Promise.reject(response.data.msg)
            }
        } else {
            return Promise.reject(`Status ${response.status}`)
        }
    },
    error => {
        return Promise.reject(error)
    }
)

// Define your API methods as functions

export async function get<T>(url: string, params?: unknown): Promise<T> {
    const response = await api.get(url, { params })
    return response as unknown as T
}

export async function post<T>(url: string, data: unknown): Promise<T> {
    const response = await api.post(url, data)
    return response as unknown as T
}

export async function put<T>(url: string, data: unknown): Promise<T> {
    const response = await api.put(url, data)
    return response as unknown as T
}

export async function del<T>(url: string): Promise<T> {
    const response = await api.delete(url)
    return response as unknown as T
}

// Usage example in a Vue 3 component
// import { get, post, put, del } from './api';

// async function fetchData() {
//   try {
//     const data = await get<YourDataType>('/your-api-endpoint');
//     // Handle the data here
//   } catch (error) {
//     // Handle errors here
//   }
// }
