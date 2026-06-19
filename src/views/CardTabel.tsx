'use client'
import { FC, ReactNode } from 'react'
import { samimFont } from '@/components/layout/shared/Fonts'

interface TFildKeys {
  type: 'image' | 'action' | 'string'
  child?: {
    isChild: boolean
    renderItem?: (data: boolean | string, rowItem: Record<string, any>) => ReactNode
  }
  dataValue: string
}

type TColumn = Array<Record<string, any>>

interface TProps {
  data?: {
    headData: string[]
    column?: TColumn
  }
  fildKeys?: TFildKeys[]
}

const CustomCard: FC<TProps> = ({ data, fildKeys }) => {
  return (
    <div className='card-control max-md:flex hidden flex-wrap justify-center gap-5'>
      {data?.column?.map((rowItem, rowIndex) => (
        <div
          key={rowIndex}
          className='bg-white w-[300px] grow shrink-0 rounded-2xl shadow-sm p-4 border border-gray-100'
        >
          {fildKeys?.map((field, index) => {
            const value = rowItem?.[field.dataValue]

            const imageSrc = Array.isArray(value)
              ? value?.[0]?.src
              : typeof value === 'string'
                ? value
                : (value?.src ?? '')

            return (
              <div key={index} className='flex items-center justify-between py-2 border-b last:border-b-0'>
                <span className={`${samimFont.className} text-sm text-gray-500`}>{data.headData[index]}</span>

                {!field.child?.isChild ? (
                  field.type === 'image' ? (
                    <img src={imageSrc} alt='بدون عکس' className='w-20 h-16 rounded-xl object-cover' />
                  ) : (
                    <span className={`${samimFont.className} text-sm text-gray-800`}>{rowItem?.[field.dataValue]}</span>
                  )
                ) : (
                  field.child.renderItem?.(rowItem?.[field.dataValue], rowItem)
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default CustomCard
