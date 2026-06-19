'use client'
import { TProductData } from '@/types/pages/main/product/product-type'
import { FC, useState } from 'react'
import QualityItem from './QualityItem'
import { Button } from '@mui/material'
import { samimFont } from '@/assets/fonts'
import { changeMomentHandler } from '@/utils/hooks/useChangeMoment'
import { changeTimeHandler } from '@/utils/hooks/useChangeTime'

interface TProps {
  data: TProductData
}

const ProductDetailClient: FC<TProps> = ({ data }) => {
  const [btnFlag, setBtnFlag] = useState<boolean>(false)
  return (
    <div className='flex justify-center'>
      <div
        className='items-control w-[90%] max-lg:w-full border rounded-2xl flex justify-between gap-4 p-3
        max-md:flex-col-reverse max-md:items-center
      '
      >
        <div className='info-control w-2/4 max-md:w-full flex flex-col gap-3 font-medium max-md:text-center'>
          <p className=''>{`عنوان: ${data.title}`}</p>
          <p className=''>
            {`توضیحات جزئی: `}
            <span className='text-wrap'>{data.miniDescription}</span>
          </p>
          <p className='max-md:w-full'>{`توضیحات تکمیلی: ${data.description}`}</p>
          <p className=''>{`نام برند: ${data.brand}`}</p>
          <p className=''>{`کشور مبدا : ${data.xportingCountry}`}</p>
          <p className='type'>
            <span>نوع: </span>
            <span>{data.type}</span>
          </p>
          <p>{`وضعیت استخان : ${data.isBones == 'true' ? 'استخان دارد' : 'استخان ندارد'}`}</p>
          <QualityItem quality={data.quality ?? ''} />
          <div className='conroller flex gap-3 max-md:justify-center'>
            <div className='border p-2 rounded-2xl'>
              <p>کاربرد درآشپزی</p>
              <ul className='m-0 p-0'>
                <label>{`عنوان : ${data.useInCooking.title}`}</label>
                {data.useInCooking.tips.map((item, index) => (
                  <li key={index} className='mr-4'>
                    <span>{item.title} : </span>
                    <span>{item.description}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className='border p-2 rounded-2xl'>
              <ul className='m-0 p-0'>
                <label htmlFor='#' className='m-0'>
                  نکات کلیدی
                </label>
                {data.keyPoints.map((item, index) => (
                  <li key={index} className='mr-4'>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* <div className='btn-control flex gap-2'>
            {!btnFlag ? (
              <Button className={`bg-primary text-white ${samimFont.className}`} onClick={() => setBtnFlag(true)}>
                ویرایش
              </Button>
            ) : (
              <>
                <Button className={`bg-primary text-white ${samimFont.className}`}>ثبت تغییرات</Button>
                <Button className={`bg-red-500 text-white ${samimFont.className}`} onClick={() => setBtnFlag(false)}>
                  لغو
                </Button>
              </>
            )}
          </div> */}
        </div>
        <div className='image-control w-auto max-lg:w-2/4 max-md:w-full  border rounded-2xl p-3 flex flex-col items-center gap-3'>
          <img src={data.imageAddress ?? ''} className='w-[400px] h-[400px] max-md:w-full rounded-2xl object-cover' />
          <button className={`bg-gray-600 p-1 flex justify-evenly gap-4 rounded-2xl w-full ${samimFont.className}`}>
            <span className='bg-white text-black p-1.5 rounded-2xl w-[70%]'>
              {`ساخته شده در تاریخ: ${changeMomentHandler(data.createAt ?? '')}`}
            </span>
            <span className='bg-white text-black p-1.5 rounded-2xl w-[30%]'>{`ساعت : ${changeTimeHandler(data.createAt ?? '')}`}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailClient
