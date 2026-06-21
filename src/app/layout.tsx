// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'
import fontLocal from 'next/font/local'

// Type Imports
import type { ChildrenType } from '@core/types'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
// import '@assets/iconify-icons/generated-icons.css'
import { Toaster } from 'sonner'

export const samimFont = fontLocal({
  src: [{ path: '../assets/fonts/Samim-Bold-FD.ttf' }]
})

export const metadata = {
  title: 'Demo: Materio - NextJS Dashboard Free',
  description:
    'Develop next-level web apps with Materio Dashboard Free - NextJS. Now, updated with lightning-fast routing powered by MUI and App router.'
}

const RootLayout = ({ children }: ChildrenType) => {
  // Vars
  const direction = 'rtl'

  return (
    <html id='__next' dir={direction}>
      <body className={`flex is-full min-bs-full flex-auto flex-col ${samimFont.className}`}>
        <Toaster position='top-right' toastOptions={{ className: `${samimFont.className} text-[16px]` }} />
        {children}
      </body>
    </html>
  )
}

export default RootLayout
