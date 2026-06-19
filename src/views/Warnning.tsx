import { FC } from 'react'

interface TProps {
  message: string
}

const Warnning: FC<TProps> = ({ message }) => {
  return (
    <div>
      <p>{message}</p>
    </div>
  )
}

export default Warnning
