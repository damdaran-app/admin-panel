import { samimFont } from '@/assets/fonts'
import { getSingleItem } from '@/services/get/product-api'
import { TProductData } from '@/types/pages/main/product/product-type'
import { changeMomentHandler } from '@/utils/hooks/useChangeMoment'
import { changeTimeHandler } from '@/utils/hooks/useChangeTime'
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

  const productData = await getSingleItem<{ message: string; data: TProductData }>(`/getSingleProduct/${id}`)

  console.log('productData single ==>', productData.data?.data)

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

  if (!productData.success) {
    return <Warnning message='اوه خطایی بوجود اومد' />
  }

  return <>{productData.data && <ProductDetailClient data={productData.data?.data} />}</>
}

export default ProductDetailPage
