import { getProductList } from '@/services/get/product-api'
import { GetProductRsponseType, ProductSearchParams } from '@/types/pages/main/product/product-type'
import ProductPageController from '@/views/dashboard/ProductPageController'
import CustomTabel from '@/views/dashboard/Table'
import Warnning from '@/views/Warnning'
import { Fragment } from 'react'

interface TProps {
  searchParams: {
    PageNumber: string
    RowsOfPage: string
    Query: string
  }
}

const ProductPage = async ({ searchParams }: TProps) => {
  // const productApi = new ProductApi()
  const { PageNumber, RowsOfPage, Query } = await searchParams
  const productListData = await getProductList<GetProductRsponseType, ProductSearchParams>({
    endPoint: '/getProductLists',
    searchParams: searchParams
  })
  console.log('productListData ==>', productListData)
  if (productListData.success && productListData.data) {
    return (
      <>
        <ProductPageController
          data={productListData.data}
          searchParamsApi={{ PageNumber, RowsOfPage }}
          updateProductList={getProductList}
        />
      </>
    )
  } else {
    <Warnning message='مشکلی در دریافت اطلاعات پیش امد لطفا صفحه را رفرش کنید' />
  }
}

export default ProductPage
