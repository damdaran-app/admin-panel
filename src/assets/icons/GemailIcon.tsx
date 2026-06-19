import { TIcon } from '@/types'
import React, { FC } from 'react'

const GemailIcon: FC<TIcon> = ({ size, className }) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <rect width='48' height='48' rx='16' fill='white' fillOpacity='0.4' />
      <path
        d='M34 19L25.009 24.727C24.7039 24.9042 24.3573 24.9976 24.0045 24.9976C23.6517 24.9976 23.3051 24.9042 23 24.727L14 19'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M32 16H16C14.8954 16 14 16.8954 14 18V30C14 31.1046 14.8954 32 16 32H32C33.1046 32 34 31.1046 34 30V18C34 16.8954 33.1046 16 32 16Z'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default GemailIcon
