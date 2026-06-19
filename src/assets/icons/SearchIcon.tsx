import { TIcon } from '@/types'
import React, { FC } from 'react'

const SearchIcon: FC<TIcon> = ({ size }) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='cursor-pointer'
    >
      <rect width='48' height='48' rx='24' fill='#EBE719' />
      <path d='M33 33L28.66 28.66' stroke='#2D2D2D' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <path
        d='M23 31C27.4183 31 31 27.4183 31 23C31 18.5817 27.4183 15 23 15C18.5817 15 15 18.5817 15 23C15 27.4183 18.5817 31 23 31Z'
        stroke='#2D2D2D'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default SearchIcon
