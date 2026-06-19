import { TIcon } from '@/types'
import React, { FC } from 'react'

const LocationIcon: FC<TIcon> = ({ size }) => {
  return (
    <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect width='40' height='40' rx='20' fill='#EBE719' />
      <path
        d='M28 18C28 22.993 22.461 28.193 20.601 29.799C20.4277 29.9293 20.2168 29.9998 20 29.9998C19.7832 29.9998 19.5723 29.9293 19.399 29.799C17.539 28.193 12 22.993 12 18C12 15.8783 12.8429 13.8434 14.3431 12.3431C15.8434 10.8429 17.8783 10 20 10C22.1217 10 24.1566 10.8429 25.6569 12.3431C27.1571 13.8434 28 15.8783 28 18Z'
        stroke='#2D2D2D'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M20 21C21.6569 21 23 19.6569 23 18C23 16.3431 21.6569 15 20 15C18.3431 15 17 16.3431 17 18C17 19.6569 18.3431 21 20 21Z'
        stroke='#2D2D2D'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default LocationIcon
