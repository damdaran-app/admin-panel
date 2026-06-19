// 'use server'

import { CreateNewsType, CreateProductActionType, ProductDataType } from '@/types/pages/main/product/product-type'
import { AxiosResponse } from 'axios'
import { http } from '../interseptore'

// import { http } from '../interseptore'
// import { GetDataType } from './product-api'

// export const getNewsList = async <T>(): Promise<GetDataType<T>> => {

//   const response = await http.get('/getNewsLists')
//   return response.data
// }

// export const createProduct = async <T>(data: CreateNewsType, endPoint: string): Promise<CreateProductActionType<T>> => {
//   try {
//     const response: AxiosResponse<{ message: string; data: ProductDataType }> = await http.post(`/CreateProduct`, data)
//     console.log('create product response ==>', response)
//     return {
//       success: 'true',
//       message: response.data.message,
//       data: response.data.data
//     }
//   } catch (error) {
//     if (isAxiosError(error)) {
//       return {
//         success: 'false',
//         message: error.message
//       }
//     }
//     return {
//       success: 'false',
//       message: 'مشکلی پیش آمده لطفا دو دقیقه بعد مجدد امتحان کنید'
//     }
//   }
// }
