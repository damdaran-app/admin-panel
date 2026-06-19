'use server'
import {
  CreateProductActionType,
  CreateProductType,
  GetCommentDataType,
  GetProductRsponseType,
  ProductDataType
} from '@/types/pages/main/product/product-type'
import { AxiosResponse, isAxiosError } from 'axios'
import { http } from '../interseptore'

export interface GetProductListParamsType<T> {
  endPoint: string
  searchParams: T
}

export interface GetDataType<T> {
  success: boolean
  message?: string
  data?: T
}

// TProductData
export const getProductList = async <T, TParams>({
  endPoint,
  searchParams
}: GetProductListParamsType<TParams>): Promise<GetDataType<T>> => {
  try {
    const response = await http.get(endPoint, { params: searchParams })
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    return {
      success: false
    }
  }
}

export const getSingleItem = async <T>(endPoint: string): Promise<GetDataType<T>> => {
  try {
    const response = await http.get(endPoint)
    if (isAxiosError(response)) {
      return {
        success: false,
        message: response.message
      }
    }
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    return {
      success: false,
      message: 'Network Error!'
    }
  }
}

interface DeleteProductType {
  success: boolean
  message: string
}

export const deleteProductHadnler = async (endPoint: string): Promise<DeleteProductType> => {
  try {
    const response: AxiosResponse<{ message: string }> = await http.delete(endPoint)
    console.log('response ==>', response)
    return {
      message: response.data.message,
      success: true
    }
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return { message: error.response?.data?.message || error.message, success: false }
    }
    return { message: 'An unexpected error occurred', success: false }
  }
}

export type TypeListDataType = { _id: string; name: string }

export interface GetTypeListType {
  data: TypeListDataType[]
  message: string
  totalCount: number
}

export const getTypeList = async <T>(endPoint: string): Promise<GetDataType<T>> => {
  try {
    const response = await http.get(endPoint)
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    // if (isAxiosError(error)) {
    return {
      success: false
    }
    // }
    // return { success: false }
  }
}

export const deleteType = async (endPoint: string): Promise<GetDataType<any>> => {
  try {
    const response: AxiosResponse<{ message: string }> = await http.delete(endPoint)
    if (isAxiosError(response)) {
      return {
        success: false,
        message: response.message
      }
    }
    return {
      success: true,
      message: response.data.message
    }
  } catch (error) {
    return {
      success: false,
      message: 'Network Error!'
    }
  }
}

export const createType = async ({
  endPoint,
  data
}: {
  endPoint: string
  data: { name: string }
}): Promise<CreateProductActionType<any>> => {
  try {
    const response: AxiosResponse<{ message: string }> = await http.post(endPoint, data)
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

export const createProduct = async <T, dataPostType>(
  data: dataPostType,
  endPoint: string
): Promise<CreateProductActionType<T>> => {
  try {
    const response: AxiosResponse<{ message: string; data: T }> = await http.post(endPoint, data)
    console.log('create product response ==>', response)
    return {
      success: 'true',
      message: response.data.message,
      data: response.data.data
    }
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: 'false',
        message: error.message
      }
    }
    return {
      success: 'false',
      message: 'مشکلی پیش آمده لطفا دو دقیقه بعد مجدد امتحان کنید'
    }
  }
}

export const createProductImage = async (endPoint: string, data: FormData): Promise<CreateProductActionType<any>> => {
  console.log('data ==>', data)
  try {
    const response: AxiosResponse<{ message: string }> = await http.post(endPoint, data)
    console.log('create product image response ==>', response)
    return {
      success: 'true',
      message: response.data.message
    }
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: 'false',
        message: error.message
      }
    }
    return {
      success: 'false',
      message: 'مشککلی پیش آمد لطفا دو دقیقه دیگه مجدد امتحان کنید'
    }
  }
}

export const getCommentList = async <T>(endPoint: string): Promise<GetDataType<T>> => {
  try {
    const response: AxiosResponse<T> = await http.get(endPoint)
    console.log('response ==>', response)
    if (isAxiosError(response)) {
      return {
        success: false,
        message: response.message
      }
    }
    return {
      success: true,
      message: 'get comment successfully',
      data: response.data
    }
  } catch (error) {
    return {
      success: false,
      message: 'Network Error!'
    }
  }
}

export const deleteComment = async (endPoint: string): Promise<GetDataType<any>> => {
  try {
    const response: AxiosResponse<{ message: string }> = await http.delete(endPoint)
    if (isAxiosError(response)) {
      return {
        success: false,
        message: response.message
      }
    }
    return {
      success: true,
      message: response.data.message
    }
  } catch (error) {
    return {
      success: false,
      message: 'Nrtwork Error!'
    }
  }
}
