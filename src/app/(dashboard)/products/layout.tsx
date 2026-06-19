import { ReactNode } from 'react'

interface TProps {
  children: ReactNode
}

const ProductPageLayout = ({ children }: TProps) => {
  return <>{children}</>
}

export default ProductPageLayout
