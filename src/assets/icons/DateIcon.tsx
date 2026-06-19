import { TIcon } from '@/types'
import React, { FC } from 'react'

const DateIcon: FC<TIcon> = ({ size, color }) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox='0 0 16 16'
      fill='none'
      stroke={color ? color : '#666666'}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10.6663 1.3335V4.00016M5.33301 1.3335V4.00016'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8.66667 2.6665H7.33333C4.81917 2.6665 3.5621 2.6665 2.78105 3.44755C2 4.2286 2 5.48568 2 7.99984V9.33317C2 11.8473 2 13.1044 2.78105 13.8854C3.5621 14.6665 4.81917 14.6665 7.33333 14.6665H8.66667C11.1808 14.6665 12.4379 14.6665 13.2189 13.8854C14 13.1044 14 11.8473 14 9.33317V7.99984C14 5.48568 14 4.2286 13.2189 3.44755C12.4379 2.6665 11.1808 2.6665 8.66667 2.6665Z'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M2 6.6665H14' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path
        d='M7.99667 9.3335H8.00267M7.99667 12.0002H8.00267M10.6603 9.3335H10.6663M5.33301 9.3335H5.33899M5.33301 12.0002H5.33899'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default DateIcon
