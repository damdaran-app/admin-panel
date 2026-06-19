'use client'
import { samimFont } from '@/assets/fonts'
import { Button } from '@mui/material'
import { ChangeEvent, FC, useEffect, useState } from 'react'

interface TProps {
  pending: boolean
  actions: {
    changeImageHandlerAction: (file: File) => void
    submitBtn: (file: File) => void
    resetBtn: () => void
  }
  btnText: {
    submitBtn: string
    resetBtn: string
  }
}

const SelectImage: FC<TProps> = ({ pending, actions, btnText }) => {
  const [staticImage, setStaticImage] = useState<string>('')
  const [imageFileState, setImageFileState] = useState<File>()

  const changeImageHandelr = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0]
    if (imageFile) {
      setImageFileState(imageFile)
      actions.changeImageHandlerAction(imageFile)
      const newUrl = URL.createObjectURL(imageFile)
      setStaticImage(newUrl)
    }
  }

  const createHandler = () => {
    imageFileState ? actions.submitBtn(imageFileState) : null
  }

  return (
    <div className='left w-[500px] p-5 border rounded-2xl flex flex-col items-center justify-center gap-3 relative'>
      <h1 className='text-[17px]'> تصویر خود را اضافه کنید </h1>
      <label htmlFor='selectImage'>
        <div className='image-control group w-[450px] h-[450px] relative rounded-2xl overflow-hidden'>
          {staticImage != '' ? (
            <div className='change-image-overlay w-full h-full absolute top-0 left-0 bg-black/65 cursor-pointer hidden group-hover:flex items-center justify-center'>
              <p className='text-white'>برای تغییر عکس کلیک کنید</p>
            </div>
          ) : (
            <></>
          )}
          <img
            src={`${staticImage != '' ? staticImage : './images/placeholder.png'}`}
            alt=''
            className='w-full h-full cursor-pointer object-cover'
          />
        </div>
      </label>
      <input type='file' className='hidden' id='selectImage' onChange={changeImageHandelr} />
      <div className='btns-control w-full flex gap-3'>
        <Button className={`${samimFont.className} bg-primary text-white rounded-2xl`} onClick={() => createHandler()}>
          {btnText.submitBtn}
        </Button>
        <Button className={`${samimFont.className} bg-red-500 text-white rounded-2xl`} onClick={actions.resetBtn}>
          {btnText.resetBtn}
        </Button>
      </div>
    </div>
  )
}

export default SelectImage
