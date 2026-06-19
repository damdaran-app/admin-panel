import { TIcon } from '@/types'
import React, { FC } from 'react'

const MessageIcon: FC<TIcon> = ({ size }) => {
  return (
    <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M10.0034 10H10.0109M13.333 10H13.3405M6.67383 10H6.6813'
        stroke='#121212'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M17.9173 10.0002C17.9173 14.3724 14.3729 17.9168 10.0007 17.9168C8.6439 17.9168 7.36682 17.5755 6.25065 16.9741C4.69379 16.1352 3.64617 16.9151 2.72225 17.055C2.5821 17.0762 2.44252 17.0253 2.34229 16.9252C2.19016 16.773 2.1612 16.5377 2.24523 16.3397C2.60786 15.485 2.94082 13.8653 2.48683 12.5002C2.22548 11.7143 2.08398 10.8737 2.08398 10.0002C2.08398 5.6279 5.62839 2.0835 10.0007 2.0835C14.3729 2.0835 17.9173 5.6279 17.9173 10.0002Z'
        stroke='#121212'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default MessageIcon
