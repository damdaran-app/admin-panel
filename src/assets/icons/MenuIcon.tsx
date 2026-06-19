import { TIcon } from '@/types'
import React, { FC } from 'react'

const MenuIcon: FC<TIcon> = ({ size, className, onClick }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      width={`${size}px`}
      height={`${size}px`}
      onClick={onClick}
      className={className}
    >
      <path d='M21 4H7V6H21V4ZM21 11H11V13H21V11ZM21 18H7V20H21V18ZM9.01041 8.81412L7.59619 7.3999L3 11.9961L7.59619 16.5923L9.01041 15.1781L5.82843 11.9961L9.01041 8.81412Z'></path>
    </svg>
  )
}

export default MenuIcon
