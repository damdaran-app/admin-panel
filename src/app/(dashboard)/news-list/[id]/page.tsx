import { samimFont } from '@/assets/fonts'
import { getSingleItem } from '@/services/get/product-api'
import { TNewsData, TProductData } from '@/types/pages/main/product/product-type'
import { changeMomentHandler } from '@/utils/hooks/useChangeMoment'
import { changeTimeHandler } from '@/utils/hooks/useChangeTime'
import NewsDetailClient from '@/views/NewsDetailClient'
import ProductDetailClient from '@/views/ProductDetailClient'
import QualityItem from '@/views/QualityItem'
import Warnning from '@/views/Warnning'
import { Button } from '@mui/material'
import Link from 'next/link'

interface TProps {
  params: {
    id: string
  }
}

const ProductDetailPage = async ({ params }: TProps) => {
  const { id } = await params

  const newsData = await getSingleItem<{ message: string; data: TNewsData }>(`/getSingleNews/${id}`)

  console.log('productData single ==>', newsData.data?.data)

  if (id == 'id') {
    return (
      <div className='w-full h-[80vh] flex justify-center items-center'>
        <Link href={'/products'}>
          <Button className={`bg-primary text-white ${samimFont.className}`}>
            لطفا ابتدا در صفحه محصولات محصولی را انتخاب کنید
          </Button>
        </Link>
      </div>
    )
  }

  if (!newsData.success) {
    return <Warnning message='اوه خطایی بوجود اومد' />
  }

  return <>{newsData.data && <NewsDetailClient data={newsData.data?.data} />}</>
}

export default ProductDetailPage
