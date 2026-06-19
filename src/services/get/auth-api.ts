import { CreateProductActionType } from '@/types/pages/main/product/product-type'
import { http } from '../interseptore'
import { AxiosResponse, isAxiosError } from 'axios'

export const changeAuthSettigns = async (formData: FormData): Promise<CreateProductActionType<any>> => {
  try {
    const response: AxiosResponse<{ message: string }> = await http.post(`/addAuthReport`, formData)
    if (isAxiosError(response)) {
      return {
        success: 'false',
        message: response.message
      }
    }
    return {
      success: 'true',
      message: response.data.message
    }
  } catch (error) {
    return {
      success: 'false',
      message: 'Network Error!'
    }
  }
}
