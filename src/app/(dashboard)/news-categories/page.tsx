import { getTypeList, GetTypeListType } from '@/services/get/product-api'
import CategoriesPageClient from '@/views/CategoriesPageClient'
import Warnning from '@/views/Warnning'

const NewsCategoriesPage = async () => {
  const typeData = await getTypeList<GetTypeListType>('/getNewsTypeList')

  console.log('typeData ==>', typeData)

  if (!typeData.success) {
    return <Warnning message='اوه مشکلی پیش اومده' />
  }

  return (
    <>
      {typeData.data && <CategoriesPageClient data={typeData.data.data} pageName='news' updateTypeList={getTypeList} />}
    </>
  )
}

export default NewsCategoriesPage
