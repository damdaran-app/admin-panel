import { ReactNode } from 'react'

interface TProps {
  children: ReactNode
}

const ProductDetailLayout = ({ children }: TProps) => {
  return <>{children}</>
}

export default ProductDetailLayout
