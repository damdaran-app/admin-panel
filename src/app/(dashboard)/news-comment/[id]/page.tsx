import { samimFont } from '@/app/layout'
import Link from '@/components/Link'
import { getCommentList } from '@/services/get/product-api'
import { GetCommentDataType } from '@/types/pages/main/product/product-type'
import CommentPageClient from '@/views/CommentPageClient'
import Warnning from '@/views/Warnning'
import { Button } from '@mui/material'

interface TProps {
  params: {
    id: string
  }
}

const NewsCommentManagementPage = async ({ params }: TProps) => {
  const { id } = await params
  console.log('id ==>', id)

  let response
  if (id != 'id') {
    response = await getCommentList<GetCommentDataType>(`/getNewsCommentList/${id}`)
    console.log('get product comment response ==>', response)
  }

  if (id == 'id') {
    return (
      <div className='controller w-full flex justify-center mt-28'>
        <Link href={'/news-list'}>
          <Button
            className={`${samimFont.className} bg-primary text-white text-xl p-4 px-10 rounded-2xl cursor-pointer`}
          >
            لطفا ابتدا مقاله ای را انتخاب کنید
          </Button>
        </Link>
      </div>
    )
  }

  if (!response?.success) {
    return <Warnning message='مشکلی پیش آمده لطفا مجدد صفحه را رفرش کنید' />
  }
  return (
    <>
      {response.data && (
        <CommentPageClient pageName='news' data={response.data} id={id} updateCommentList={getCommentList} />
      )}
    </>
  )
}

export default NewsCommentManagementPage
