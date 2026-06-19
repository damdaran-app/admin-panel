import { FC } from 'react'

interface AuthInformationType {
  title: string
  description: string
  videoSrc: string
}

export const AuthInformationCard: FC<AuthInformationType> = ({ title, description, videoSrc }) => {
  return (
    <>
      <div className='form-controller mt-6 flex flex-col max-sm:items-center gap-2'>
        <p>
          <span>عنوان: </span>
          <span className='mr-0.5'>{title}</span>
        </p>
        <p>
          <span>شعار: </span>
          <span className='mr-1'>{description}</span>
        </p>
        <div className='video-controller w-full h-[400px] overflow-hidden rounded-2xl mt-2'>
          <video src={videoSrc} controls className='w-full h-full object-cover'></video>
        </div>
      </div>
    </>
  )
}
