import { getAuthReport } from '@/services/get/auth-api-server'
import { AuthInformationCard } from '@/views/AuthInformationCard'

const AuthInformationPage = async () => {
  const response = await getAuthReport()
  return (
    <div className='w-full flex justify-center items-center'>
      <div className='items-control w-[80%] max-md:w-full border rounded-2xl p-6 flex max-sm:flex-col justify-center items-center gap-3'>
        <div className='left w-2/4 max-sm:w-full border rounded-2xl p-2 py-6 flex flex-col'>
          <p className='text-center'>اطلاعات صفحه ثبت نام</p>
          <AuthInformationCard
            title={response.data?.signUp.title ?? ''}
            description={response.data?.signUp.description ?? ''}
            videoSrc={response.data?.signUp.videoSrc ?? ''}
          />
        </div>
        <div className='right w-2/4 max-sm:w-full border rounded-2xl p-2 py-6'>
          <p className='text-center'>اطلاعات صفحه ورود</p>
          <AuthInformationCard
            title={response.data?.signIn.title ?? ''}
            description={response.data?.signIn.description ?? ''}
            videoSrc={response.data?.signIn.videoSrc ?? ''}
          />
        </div>
      </div>
    </div>
  )
}

export default AuthInformationPage
