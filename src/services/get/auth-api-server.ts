'use server'
import { AxiosResponse, isAxiosError } from 'axios'
import { http } from '../interseptore'
import { GetDataType } from './product-api'

interface AuthReportObjDataType {
  title: string
  description: string
  videoSrc: string
}

interface GetAuthReportType {
  signUp: AuthReportObjDataType
  signIn: AuthReportObjDataType
}

export interface AdminLoginResponseType {
  token: string
  message: string
}

export interface AdminLoginRequestType {
  emailOrPhoneNumber: string
  password: string
}

export const getAuthReport = async (): Promise<GetDataType<GetAuthReportType>> => {
  try {
    const response: AxiosResponse<{ data: GetAuthReportType }> = await http.get('/getAuthReport')
    if (isAxiosError(response)) {
      return {
        success: false,
        message: response.message
      }
    }
    return {
      success: true,
      message: 'Get Auth Report Data SuccessFully',
      data: response.data.data
    }
  } catch (error) {
    return {
      success: false,
      message: 'Network Error!'
    }
  }
}

export const loginAdmin = async ({
  emailOrPhoneNumber,
  password
}: AdminLoginRequestType): Promise<GetDataType<AdminLoginResponseType>> => {
  try {
    const response: AxiosResponse<AdminLoginResponseType> = await http.post('/adminLogin', {
      emailOrPhoneNumber,
      password
    })
    console.log("response ==>", response)
    if (isAxiosError(response)) {
      console.log("isAxiosError ==>", response)
      return {
        success: false,
        message: response.response?.data.message
      }
    }
    return {
      success: true,
      message: response.data.message,
      data: response.data
    }
  } catch (error) {
    return {
      success: false,
      message: 'Network Error!'
    }
  }
}
