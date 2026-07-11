import axios from 'axios'
import { env } from '@/configs/env.ts'

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})
