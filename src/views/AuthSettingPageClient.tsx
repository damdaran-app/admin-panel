'use client'
import { useState } from 'react'
import { ICustomInput } from './dashboard/CustomInput'
import { toast } from 'sonner'
import { changeAuthSettigns } from '@/services/get/auth-api'
import AuthForm from './AuthForm'
import { Button } from '@mui/material'
import { samimFont } from '@/assets/fonts'
import { useRouter } from 'next/navigation'

const AuthSettingPageClient = () => {
  const [inputData, setInputData] = useState<ICustomInput[]>([
    {
      labelText: 'عنوان',
      type: 'text',
      name: 'signUpPageTitle',
      placeholder: '',
      className: 'w-full',
      itemData: [],
      flags: {
        isGenerateItem: false
      }
    },
    {
      labelText: 'شعار',
      type: 'text',
      name: 'signUpPageDescription',
      placeholder: '',
      className: 'w-full',
      itemData: [],
      flags: {
        isGenerateItem: false
      }
    },
    {
      labelText: 'عنوان',
      type: 'text',
      name: 'signInPageTitle',
      placeholder: '',
      className: 'w-full',
      itemData: [],
      flags: {
        isGenerateItem: false
      }
    },
    {
      labelText: 'شعار',
      type: 'text',
      name: 'signInPageDescription',
      placeholder: '',
      className: 'w-full',
      itemData: [],
      flags: {
        isGenerateItem: false
      }
    }
  ])
  const [videoState, setVideoState] = useState<{ signUpVideo: string; signInVideo: string }>({
    signUpVideo: '',
    signInVideo: ''
  })
  const [videoSrcState, setVideoSrcState] = useState<{ signUpVideo: File | null; signInVideo: File | null }>({
    signUpVideo: null,
    signInVideo: null
  })
  const [btnSatus, setBtnStatus] = useState<boolean>(false)
  const router = useRouter()

  //   add report api
  //   const [addReportInitialState] = useState<CreateProductActionType<any>>({
  //     success: 'none',
  //     message: ''
  //   })
  //   const [addReportState, addReportAction, addReportPending] = useActionState(
  //     addAuthRepoprtAction,
  //     addReportInitialState
  //   )

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    let hasError = false
    let hasVideoError = false

    for (const [key, value] of formData.entries()) {
      if (!value || value.toString().trim() === '') {
        hasError = true
        toast(`فیلد ${key} الزامی است`)
        break
      }
    }

    if ((videoState.signUpVideo == '' || videoState.signInVideo == '') && !hasError) {
      toast('انتخاب ویدئو الزامیست!')
    } else {
      hasVideoError = false
    }

    if (!hasError && !hasVideoError) {
      console.log('videoSrcState ==>', videoSrcState)
      formData.append('signUpVideo', videoSrcState.signUpVideo ? videoSrcState.signUpVideo : '')
      formData.append('signInVideo', videoSrcState.signInVideo ? videoSrcState.signInVideo : '')
      setBtnStatus(true)
      const response = await changeAuthSettigns(formData)
      toast(response.message)
      setBtnStatus(false)
      if (response.success == 'true') {
        router.push('/information')
      }
    }
  }

  return (
    <div className='w-full flex justify-center items-center'>
      <div className='items-control w-[80%] max-md:w-full border rounded-2xl'>
        <form action='' className='w-full p-6' onSubmit={submitHandler}>
          <div className='inputs-element-control flex justify-center max-sm:flex-col gap-3'>
            <div className='left w-2/4 max-sm:w-full border rounded-2xl p-2 py-6'>
              <p className='text-center'>تنظیمات صفحه ثبت نام</p>
              <div className='form-controller mt-4'>
                <AuthForm
                  data={inputData.slice(0, 2)}
                  videoId='selectSugnUpVideo'
                  videoName='signUpVideo'
                  selectVideoChange={(showSrc, apiSrc) => {
                    setVideoState(prev => ({ ...prev, signUpVideo: showSrc }))
                    setVideoSrcState(prev => ({ ...prev, signUpVideo: apiSrc }))
                  }}
                  videoInitialValue={videoState.signUpVideo}
                />
              </div>
            </div>
            <div className='right w-2/4 max-sm:w-full border rounded-2xl p-2 py-6'>
              <p className='text-center'>تنظیمات صفحه ورود</p>
              <div className='form-controller mt-4'>
                <AuthForm
                  data={inputData.slice(2, 4)}
                  videoId='selectSugnInVideo'
                  videoName='signInVideo'
                  selectVideoChange={(showSrc, apiSrc) => {
                    setVideoState(prev => ({ ...prev, signInVideo: showSrc }))
                    setVideoSrcState(prev => ({ ...prev, signInVideo: apiSrc }))
                  }}
                  videoInitialValue={videoState.signInVideo}
                />
              </div>
            </div>
          </div>
          <div className='btn-control flex gap-2 items-center mt-6'>
            <Button type='submit' className={`${samimFont.className} bg-primary text-white py-2 px-5 rounded-2xl`}>
              {!btnSatus ? 'اعمال تغییرات' : 'درحال ارسال اطلاعات...'}
            </Button>
            <Button
              type='reset'
              className={`${samimFont.className} bg-red-600 text-white py-2 px-5 rounded-2xl`}
              onClick={() => setVideoState({ signUpVideo: '', signInVideo: '' })}
            >
              لغو تغییرات
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthSettingPageClient
