'use server'
import { changeAuthSettigns } from '@/services/get/auth-api'
import { AdminLoginResponseType, loginAdmin } from '@/services/get/auth-api-server'
import { updateLandingReportData } from '@/services/get/landing-api'
import { createProduct, createProductImage, createType, GetDataType } from '@/services/get/product-api'
import {
  CreateNewsType,
  CreateProductActionType,
  CreateProductType,
  NewsDataType,
  ProductDataType,
  TNewsData
} from '@/types/pages/main/product/product-type'
import { cookies } from 'next/headers'

export const createProductAction = async (
  prevState: CreateProductActionType<ProductDataType>,
  formData: FormData
): Promise<CreateProductActionType<ProductDataType>> => {
  const dataObj = JSON.parse(formData.get('dataObj')?.toString() ?? '')

  const response = await createProduct<ProductDataType, CreateProductType>(dataObj, '/CreateProduct')

  return {
    success: response.success,
    message: response.message,
    data: response.data
  }
}

export const createProductImageAction = async (
  prevState: CreateProductActionType<ProductDataType>,
  formData: FormData
): Promise<CreateProductActionType<ProductDataType>> => {
  const productId = formData.get('productId')?.toString() ?? ''
  const imageUrl = formData.get('imageUrl')

  console.log('imageUrl ==>', imageUrl)

  const newFormData = new FormData()
  if (imageUrl) {
    newFormData.append('image', imageUrl)
  }

  console.log('newFormData ==>', newFormData)

  const response = await createProductImage(`/addProductImage/${productId}`, newFormData)

  //   console.log("c response")

  return {
    success: response.success,
    message: response.message
  }
}

export const createNewsAction = async (
  prevState: CreateProductActionType<TNewsData>,
  formData: FormData
): Promise<CreateProductActionType<TNewsData>> => {
  const dataObj = JSON.parse(formData.get('dataObj')?.toString() ?? '')

  console.log('create news data ==>', dataObj)

  const response = await createProduct<TNewsData, CreateNewsType>(dataObj, '/createNews')

  console.log('create news response ==>', response)

  return {
    success: response.success,
    message: response.message,
    data: response.data
  }
}

export const createNewsImageAction = async (
  prevState: CreateProductActionType<NewsDataType>,
  formData: FormData
): Promise<CreateProductActionType<NewsDataType>> => {
  const newsId = formData.get('newsId')?.toString() ?? ''
  const imageUrl = formData.get('imageUrl')

  console.log('imageUrl ==>', imageUrl)

  const newFormData = new FormData()
  if (imageUrl) {
    newFormData.append('image', imageUrl)
  }

  console.log('newFormData ==>', newFormData)

  const response = await createProductImage(`/addImageNews/${newsId}`, newFormData)

  //   console.log("c response")

  return {
    success: response.success,
    message: response.message
  }
}

export const createTypeAction = async (
  prevState: CreateProductActionType<any>,
  formData: FormData
): Promise<CreateProductActionType<any>> => {
  const endPoint = JSON.parse(formData.get('endPoint') as string)
  const name = formData.get('title') as string
  const dataObj = { name }
  const response = await createType({ endPoint: endPoint, data: dataObj })
  return {
    success: response.success,
    message: response.message
  }
}

// add auth report
export const addAuthRepoprtAction = async (
  prevState: CreateProductActionType<any>,
  formData: FormData
): Promise<CreateProductActionType<any>> => {
  const signUpVideo = formData.get('signUpVideo') as File
  const signInVideo = formData.get('signInVideo') as File
  const newFormData = new FormData()
  newFormData.append('signUpVideo', signUpVideo)
  newFormData.append('signInVideo', signInVideo)
  newFormData.append('signUpPageTitle', formData.get('signUpPageTitle') as string)
  newFormData.append('signUpPageDescription', formData.get('signUpPageDescription') as string)
  newFormData.append('signInPageTitle', formData.get('signInPageTitle') as string)
  newFormData.append('signInPageDescription', formData.get('signInPageDescription') as string)

  const response = await changeAuthSettigns(newFormData)
  return {
    success: response.success,
    message: response.message
  }
}

// update landing report data
export const updateLandingReportAction = async (
  prevState: CreateProductActionType<any>,
  formData: FormData
): Promise<CreateProductActionType<any>> => {
  const dataObj = JSON.parse(formData.get('dataObj') as string)
  const response = await updateLandingReportData(dataObj)
  if (response.success) {
    return {
      success: 'true',
      message: response.message ?? ''
    }
  } else {
    return {
      success: 'false',
      message: response.message ?? ''
    }
  }
}

// admin login action
export const adminLoginAction = async (
  prevState: CreateProductActionType<AdminLoginResponseType>,
  formData: FormData
): Promise<CreateProductActionType<any>> => {
  const emailOrPhoneNumber = formData.get('emailOrPhoneNumber')?.toString() ?? ''
  const password = formData.get('password')?.toString() ?? ''

  console.log('emailOrPhoneNumber ===>', emailOrPhoneNumber)
  console.log('password ===>', password)

  const response = await loginAdmin({ emailOrPhoneNumber, password })
  // console.log('login response data ==>', response)
  const cookiesStore = await cookies()
  cookiesStore.set('mehrabProjectAccessToken', response.data?.token ?? '')
  return {
    success: response.success ? 'true' : 'false',
    message: response.message ?? '',
    data: response.data
  }
}
