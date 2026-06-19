import { getTypeList, GetTypeListType } from '@/services/get/product-api'
import CreateNewsPageClient from '@/views/CreateNewsPageClient'

interface TProps {
  searchParams: {
    StepFlag: string
  }
}

const CreateNewsPage = async ({ searchParams }: TProps) => {
  const { StepFlag } = await searchParams
  const typeData = await getTypeList<GetTypeListType>(`/getNewsTypeList`)
  // console.log('typeList ==>', typeList)
  if (typeData.success) {
    const newTypeList = typeData.data?.data.map(item => ({ id: item._id, value: item.name }))
    return (
      <CreateNewsPageClient typeList={newTypeList ?? []} stepFlag={StepFlag ? JSON.parse(StepFlag as string) : false} />
    )
  } else {
    return <p>اوه مشکلی پیش اومد</p>
  }
}

export default CreateNewsPage
