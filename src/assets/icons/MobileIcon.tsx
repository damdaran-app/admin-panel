import { TIcon } from '@/types'
import React, { FC } from 'react'

const MobileIcon: FC<TIcon> = ({ size, color }) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={color}
    >
      <path
        d='M15.8739 13.7434C16.8787 12.7837 17.5003 11.4578 17.5003 9.99342C17.5003 8.52892 16.8787 7.20312 15.8739 6.24341M14.167 8.11841C14.6694 8.59825 14.9802 9.26117 14.9802 9.99342C14.9802 10.7257 14.6694 11.3886 14.167 11.8684'
        stroke='#EBE719'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.3333 5.83341C13.3333 3.86923 13.3333 2.88714 12.7232 2.27694C12.1129 1.66675 11.1308 1.66675 9.16667 1.66675H6.66667C4.70248 1.66675 3.72039 1.66675 3.11019 2.27694C2.5 2.88714 2.5 3.86923 2.5 5.83341V14.1667C2.5 16.1309 2.5 17.113 3.11019 17.7232C3.72039 18.3334 4.70248 18.3334 6.66667 18.3334H9.16667C11.1308 18.3334 12.1129 18.3334 12.7232 17.7232C13.3333 17.113 13.3333 16.1309 13.3333 14.1667'
        stroke='#EBE719'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.58333 1.66675H6.25L6.66667 2.50008H9.16667L9.58333 1.66675Z'
        stroke='#EBE719'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default MobileIcon
