import { TIcon } from '@/types'
import React, { FC } from 'react'

const PhoneIcon: FC<TIcon> = ({ size }) => {
  return (
    <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect width='40' height='40' rx='20' fill='#EBE719' />
      <path
        d='M25 10H15C13.8954 10 13 10.8954 13 12V28C13 29.1046 13.8954 30 15 30H25C26.1046 30 27 29.1046 27 28V12C27 10.8954 26.1046 10 25 10Z'
        stroke='#2D2D2D'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M20 26H20.0075' stroke='#2D2D2D' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

export default PhoneIcon
