'use client'
import { useFormik } from 'formik'
import { FC, useState } from 'react'
import CustomInput, { ICustomInput, ICustomInputEvent } from '../CustomInput'
import { samimFont } from '@/components/layout/shared/Fonts'
import { toast } from 'sonner'

interface TProps {
  formInitialValues: any
  formValidation: any
  submitAction?: (formData: FormData) => void
  cancelBtnClick?: () => void
  inputDatas?: ICustomInput[]
  btnText: {
    submitBtn: string
    resetBtn: string
  }
}

const FormWrapper: FC<TProps> = ({
  formInitialValues,
  formValidation,
  inputDatas,
  btnText,
  submitAction,
  cancelBtnClick
}) => {
  const formik = useFormik({
    initialValues: formInitialValues,
    // validationSchema: formValidation,
    onSubmit: formData => {
      console.log(formData)
      submitAction?.(formData)
    }
  })

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    let hasError = false

    for (const [key, value] of formData.entries()) {
      if (!value || value.toString().trim() === '') {
        hasError = true
        toast(`فیلد ${key} الزامی است`)
        break
      }
    }

    if (!hasError) {
      submitAction?.(formData)
    }
  }

  return (
    <div className='form-wrapper w-full'>
      <form action={''} className='w-full' onSubmit={submitHandler}>
        <div className='inputs-controller w-full flex gap-5 flex-wrap'>
          {inputDatas?.map((item, index) => {
            return (
              <CustomInput
                key={index}
                type={item.type}
                labelText={item.labelText}
                placeholder={item.placeholder}
                name={item.name}
                itemData={item.itemData}
                // onChange={formik.handleChange}
                // formInputChangeHandelr={formik.handleChange}
                className={item.className}
                flags={{ ...item.flags }}
                generateItemData={item.generateItemData}
                // errorMessage={{}}
              />
            )
          })}
        </div>
        <div className='btn-control mt-6 flex items-center gap-3'>
          <button
            type='submit'
            className={`${samimFont.className} bg-green-600 text-white text-[15px] px-6 py-1.5 rounded-2xl cursor-pointer`}
          >
            {btnText.submitBtn}
          </button>
          <button
            type='reset'
            className={`${samimFont.className} bg-red-600 text-white text-[15px] px-5 py-1.5 rounded-2xl cursor-pointer`}
            onClick={() => cancelBtnClick?.()}
          >
            {btnText.resetBtn}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormWrapper
