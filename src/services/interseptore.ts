import axios from 'axios'
const baseUrl = 'http://localhost:4001/project/api'
// https://goshtdamdaran-aplication-api.liara.run/project/api

export const http = axios.create({
  baseURL: baseUrl
  // headers: {
  //   'Content-Type': 'application/json'
  // }
})

const getToken = async () => {
  const isClient = typeof window != 'undefined' ? true : false
  let token: string = ''
  if (isClient) {
    token = localStorage.getItem('damdaranProjectToken') ?? ''
  } else {
    const cookies = await import('next/headers')
    const cookiesStore = await cookies.cookies()
    token = cookiesStore.get('damdaranProjectToken')?.value ?? ''
  }
  return token
}

http.interceptors.request.use(
  async request => {
    const token = await getToken()
    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    }
    return request
  },
  async error => error
)

http.interceptors.response.use(
  response => response,
  error => error
)
