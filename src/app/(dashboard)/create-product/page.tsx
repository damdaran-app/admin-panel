import { getTypeList, GetTypeListType } from '@/services/get/product-api'
import CreateProductPageController from '@/views/dashboard/CreateProductPageController'
import FormWrapper from '@/views/dashboard/custom-form/FormWrapper'

const CreateProductPage = async () => {
  const typeData = await getTypeList<GetTypeListType>(`/getProductTypeLists`)
  // console.log('typeList ==>', typeList)
  if (typeData.success) {
    const newTypeList = typeData.data?.data.map(item => ({ id: item._id, value: item.name }))
    return <CreateProductPageController typeList={newTypeList ?? []} />
  } else {
    return <p>اوه مشکلی پیش اومد</p>
  }
}

export default CreateProductPage
