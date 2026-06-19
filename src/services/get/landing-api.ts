'use server'

import { UpdateLandingReportDataType } from '@/types/pages/main/product/product-type'
import { GetDataType } from './product-api'
import { http } from '../interseptore'
import { AxiosResponse, isAxiosError } from 'axios'

export const updateLandingReportData = async (data: UpdateLandingReportDataType): Promise<GetDataType<any>> => {
  try {
    const response: AxiosResponse<{ data: UpdateLandingReportDataType; message: string }> = await http.put(
      '/updateLandingReport',
      data
    )
    console.log('update landing report data response ==>', response)
    if (isAxiosError(response)) {
      return {
        success: false,
        message: response.message
      }
    }
    return {
      success: true,
      message: response.data.message,
      data: response.data.data
    }
  } catch (error) {
    return {
      success: false,
      message: 'Network Error!'
    }
  }
}
