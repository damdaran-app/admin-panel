// Type Imports
import type { ChildrenType } from '@core/types'

// Layout Imports
import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'

// Component Imports
import Providers from '@components/Providers'
import Navigation from '@components/layout/vertical/Navigation'
import Navbar from '@components/layout/vertical/Navbar'
import VerticalFooter from '@components/layout/vertical/Footer'
import { Toaster } from 'sonner'
import { samimFont } from '@/assets/fonts'

const Layout = async ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'

  return (
    <Providers direction={direction}>
      <LayoutWrapper
        verticalLayout={
          <VerticalLayout navigation={<Navigation />} navbar={<Navbar />} footer={<></>}>
            {/* <div className='border-gray-800'></div> */}
            {/* <Toaster position='top-right' toastOptions={{ className: `${samimFont.className} text-[16px]` }} /> */}
            {children}
          </VerticalLayout>
        }
      />
    </Providers>
  )
}

export default Layout
