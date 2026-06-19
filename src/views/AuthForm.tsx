'use client'
import { ChangeEvent, useState } from 'react'
import { ICustomInput } from './dashboard/CustomInput'
import { Label } from '@heroui/react'
import { Input } from '@mui/material'
import { samimFont } from '@/assets/fonts'

const AuthForm = ({
  data,
  videoId,
  videoName,
  selectVideoChange,
  videoInitialValue
}: {
  data: ICustomInput[]
  videoId: string
  videoName: string
  selectVideoChange: (showSrc: string, apiSrc: File) => void
  videoInitialValue: string
}) => {
  const [videoState, setVideoState] = useState<string>(videoInitialValue)

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const newUrl = URL.createObjectURL(file)
      console.log('newUrl video ==>', newUrl)
      selectVideoChange(newUrl, file)
      setVideoState(newUrl)
    }
  }

  return (
    // <form className='w-full'>
    <div className='input-container w-full flex flex-col items-center justify-center gap-4'>
      {data.map((item, index) => (
        <div key={index} className={`input-control w-full flex flex-col items-start ${samimFont.className}`}>
          <Label>{item.labelText}</Label>
          <Input
            type={item.type}
            name={item.name}
            className={`${samimFont.className} outline-none border w-full text-right
                text-dark p-3 py-2 text-[14px] rounded-xl focus:border-orange-500 focus:shadow  ${item.labelText ? 'mt-3' : 'mt-0'}`}
          />
        </div>
      ))}
      {videoState == '' ? (
        <div className='selec-video-item-control'>
          <input type='file' className='hidden' id={videoId} name={videoName} onChange={inputChangeHandler} />
          <Label htmlFor={videoId}>
            <img src='./images/placeholder.png' alt='' className='w-full cursor-pointer' />
            <p className='text-center mt-2 text-[14px]'>برای انتخاب ویدئو کلیک کنید</p>
          </Label>
        </div>
      ) : (
        <div className='video-controller w-[90%] h-[300px] overflow-hidden rounded-2xl relative group'>
          <button
            type='button'
            className='removeBtn-control w-[23px] max-sm:w-auto transition-all absolute top-3 right-3
            bg-black text-red-500 overflow-hidden hover:w-auto hover:overflow-auto flex gap-2 p-2 rounded-3xl cursor-pointer
          '
            onClick={() => setVideoState('')}
          >
            <span className=''>X</span>
            <span className={`${samimFont.className} text-white text-nowrap`}>حذف این ویدئو</span>
          </button>
          <video src={videoState} controls loop className='w-full h-full rounded-2xl object-cover'></video>
        </div>
      )}
    </div>
    // </form>
  )
}

export default AuthForm
