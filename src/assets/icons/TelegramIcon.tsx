import { TIcon } from '@/types'
import React, { FC } from 'react'

const TelegramIcon: FC<TIcon> = ({ size, className }) => {
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
        d='M26.5358 33.6856C26.5738 33.7803 26.6398 33.861 26.7251 33.9171C26.8103 33.9732 26.9107 34.0018 27.0126 33.9992C27.1146 33.9966 27.2134 33.9628 27.2956 33.9025C27.3779 33.8421 27.4397 33.7581 27.4728 33.6616L33.9728 14.6616C34.0048 14.573 34.0109 14.4771 33.9904 14.3851C33.9699 14.2932 33.9236 14.209 33.857 14.1423C33.7904 14.0757 33.7062 14.0295 33.6143 14.009C33.5223 13.9885 33.4264 13.9946 33.3378 14.0266L14.3378 20.5266C14.2413 20.5597 14.1572 20.6215 14.0969 20.7037C14.0365 20.786 14.0028 20.8847 14.0002 20.9867C13.9976 21.0887 14.0262 21.1891 14.0823 21.2743C14.1383 21.3595 14.2191 21.4256 14.3138 21.4636L22.2438 24.6436C22.4945 24.7439 22.7223 24.894 22.9134 25.0848C23.1045 25.2756 23.255 25.5031 23.3558 25.7536L26.5358 33.6856Z'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M33.8541 14.1475L22.9141 25.0865'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default TelegramIcon
