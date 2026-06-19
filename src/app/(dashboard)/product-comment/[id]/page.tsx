import { samimFont } from '@/assets/fonts'
import { getCommentList } from '@/services/get/product-api'
import { GetCommentDataType } from '@/types/pages/main/product/product-type'
import CommentPageClient from '@/views/CommentPageClient'
import Warnning from '@/views/Warnning'
import { Button } from '@heroui/react'
import Link from 'next/link'

interface TProps {
  params: {
    id: string
  }
}

const ProductCommentManagementPage = async ({ params }: TProps) => {
  const { id } = await params
  console.log('id ==>', id)

  let response
  if (id != 'id') {
    response = await getCommentList<GetCommentDataType>(`/getAllProductCommentList/${id}`)
    console.log('get product comment response ==>', response)
  }

  if (id == 'id') {
    return (
      <div className='controller w-full flex justify-center mt-28'>
        <Link href={'/products'}>
          <Button
            className={`${samimFont.className} bg-primary text-white text-xl p-4 px-10 rounded-2xl cursor-pointer`}
          >
            لطفا ابتدا محصولی را انتخاب کنید
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
        <CommentPageClient pageName='product' id={id} data={response.data} updateCommentList={getCommentList} />
      )}
    </>
  )
}

export default ProductCommentManagementPage
