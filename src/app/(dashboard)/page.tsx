// MUI Imports

// Components Imports
import LandingPageClient from '@/views/LandingPageClient'
import { cookies } from 'next/headers'

const DashboardAnalytics = async () => {
  const cookiesStore = await cookies()
  const token = cookiesStore.get('mehrabProjectAccessToken')?.value ?? ''
  return <LandingPageClient tokenValue={token} />
}

export default DashboardAnalytics
