import { getTypeList, GetTypeListType } from '@/services/get/product-api'
import CategoriesPageClient from '@/views/CategoriesPageClient'
import Warnning from '@/views/Warnning'

const ProductCategoriesPage = async () => {
  const typeData = await getTypeList<GetTypeListType>('/getProductTypeLists')

  if (!typeData.success) {
    return <Warnning message='اوه مشکلی پیش اومده' />
  }

  return (
    <>
      {typeData.data && (
        <CategoriesPageClient data={typeData.data.data} pageName='product' updateTypeList={getTypeList} />
      )}
    </>
  )
}

export default ProductCategoriesPage
