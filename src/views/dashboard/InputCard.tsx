'use client'
import { FC } from 'react'

interface TProps {
  title: string
  inputType: string
  inputPlaceholder: string
  onChange: (value: string) => void
}

const InputCard: FC<TProps> = ({ title, inputType, inputPlaceholder, onChange }) => {
  return (
    <div>
      <h4>{title}</h4>
      <input type={inputType} placeholder={inputPlaceholder} onChange={event => onChange(event.target.value)} />
    </div>
  )
}

export default InputCard
