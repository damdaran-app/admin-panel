'use client'

import { ChangeEvent, FC, startTransition, useActionState, useEffect, useState } from 'react'
import { ICustomInput, TSelectOptionValue } from './dashboard/CustomInput'
import FormWrapper from './dashboard/custom-form/FormWrapper'
import { Button } from '@mui/material'
import { samimFont } from '@/assets/fonts'
import {
  CreateNewsType,
  CreateProductActionType,
  CreateProductType,
  NewsDataType,
  ProductDataType,
  TNewsData
} from '@/types/pages/main/product/product-type'
import { createNewsAction, createNewsImageAction } from '@/utils/server-actions'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'
import SelectImage from './SelectImage'

interface TProps {
  typeList: TSelectOptionValue[]
  stepFlag?: boolean
}

const CreateNewsPageClient: FC<TProps> = ({ typeList, stepFlag }) => {
  const [inputData, setInputData] = useState<ICustomInput[]>([
    {
      labelText: 'نام مقاله',
      type: 'text',
      name: 'title',
      placeholder: '',
      className: 'w-[45%]',
      itemData: [],
      flags: {
        isGenerateItem: false
      }
    },
    {
      labelText: 'گوگل نام مقاله',
      type: 'text',
      name: 'googleTitle',
      placeholder: '',
      className: 'w-[45%]',
      itemData: [],
      flags: {
        isGenerateItem: false
      }
    },
    {
      labelText: 'توضیحات مقاله',
      type: 'description',
      name: 'description',
      placeholder: '',
      className: 'w-full',
      itemData: [],
      generateItemData: {
        title: 'آیتم ',
        label: 'دیتای جدید',
        placeholder: 'دیتای جدید'
      },
      flags: {
        isGenerateItem: false
      }
    },
    {
      labelText: 'امتیاز مقاله',
      type: 'select',
      name: 'rating',
      placeholder: '',
      className: 'w-[45%]',
      itemData: [
        { id: 'A', value: '2' },
        { id: 'B', value: '4' },
        { id: 'C', value: '6' }
      ],
      flags: {
        isGenerateItem: false
      }
    },
    {
      labelText: 'کتگوری',
      type: 'select',
      name: 'categoriesList',
      className: 'w-[45%]',
      itemData: typeList,
      flags: {
        isGenerateItem: false,
        selectMode: 'multiple'
      }
    },
    {
      labelText: 'آیا استخان دارد؟',
      type: 'select',
      name: 'isBones',
      placeholder: '',
      className: 'w-[45%]',
      itemData: [
        { id: 'yes', value: 'بله' },
        { id: 'no', value: 'ندارد' }
      ],
      flags: {
        isGenerateItem: false
      }
    },
    {
      labelText: 'تایم مطالعه',
      type: 'text',
      name: 'studyTime',
      placeholder: '15',
      className: 'w-[45%]',
      itemData: [],
      flags: {
        isGenerateItem: false
      }
    },
    {
      labelText: 'عنوان اصلی کتگوری',
      type: 'text',
      name: 'titleCategories',
      placeholder: 'مرغ',
      className: 'w-[45%]',
      itemData: [],
      flags: {
        isGenerateItem: false
      }
    },
    {
      labelText: 'نکات کلیدی',
      type: 'text',
      name: 'keyPoints',
      className: 'w-full',
      itemData: [],
      generateItemData: {
        label: 'نکته کلیدی',
        placeholder: 'این مرغ سوخاری نمیشود',
        title: 'این مرغ سوخاری نمیشود'
      },
      flags: {
        isGenerateItem: true
      }
    },
    {
      labelText: 'نکات کلیدی',
      type: 'text',
      name: 'useInCooking',
      className: 'w-full',
      itemData: [],
      generateItemData: {
        label: 'کاربرد در آشپزی',
        placeholder: 'این مرغ سوخاری نمیشود',
        title: 'این مرغ سوخاری نمیشود'
      },
      flags: {
        isGenerateItem: true,
        isTitle: true
      }
    }
  ])
  const [stepController, setStepcontroller] = useState<boolean>(true)
  const [newsId, setNewsId] = useState<string>('')
  const [staticImage, setStaticImage] = useState<string>('')
  const [imageFile, setImageFile] = useState<any>()
  const router = useRouter()
  const searchParams = useSearchParams()

  // create news action
  const [createNewsInitialState] = useState<CreateProductActionType<TNewsData>>({ success: 'none', message: '' })
  const [createNewsState, createNews, createNewsPending] = useActionState(createNewsAction, createNewsInitialState)

  // create news image action
  const [createNewsImageInitialState] = useState<CreateProductActionType<NewsDataType>>({
    success: 'none',
    message: ''
  })
  const [createNewsImageState, createNewsImage, createNewsImagePending] = useActionState(
    createNewsImageAction,
    createNewsImageInitialState
  )

  const submitHandler = (formData: FormData) => {
    console.log('formData ==>', formData)

    const labels = formData.getAll('useInCookingLabel')
    const descriptions = formData.getAll('useInCookingDescription')

    const tips = labels.map((label, index) => ({
      title: label.toString(),
      description: descriptions[index]?.toString() || ''
    }))

    const dataObj: CreateNewsType = {
      title: formData.get('title')?.toString() ?? '',
      googleTitle: formData.get('googleTitle')?.toString() ?? '',
      description: formData.get('description')?.toString() ?? '',
      titleCategories: formData.get('titleCategories')?.toString() ?? '',
      categoriesList: JSON.parse(formData.get('categoriesList') as string),
      rating: formData.get('rating')?.toString() ?? '',
      studyTime: formData.get('studyTime')?.toString() ?? '',
      keyPoints: formData.getAll('keyPoints').map(item => item.toString()),
      useInCooking: {
        title: formData.get('useInCookingTitle')?.toString() ?? '',
        tips: tips
      }
    }

    const newFormData = new FormData()
    newFormData.append('dataObj', JSON.stringify(dataObj))
    startTransition(() => createNews(newFormData))

    // console.log('create news data obj ==>', dataObj)
  }

  console.log('createNewsState ==>', createNewsState)

  const changeImageHandelr = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0]
    console.log(event.target.files)
    if (imageFile) {
      setImageFile(imageFile)
      const newUrl = URL.createObjectURL(imageFile)
      setStaticImage(newUrl)
    }
  }

  useEffect(() => {
    if (createNewsState.success == 'true') {
      console.log(createNewsState.data)
      toast.success(createNewsState.message)
      setNewsId(createNewsState.data?._id ?? '')
      setStepcontroller(false)
    } else if (createNewsState.success == 'false') {
      toast.error(createNewsState.message)
    }
  }, [createNewsState])

  const createHandler = (file: File) => {
    // startTransition(() => {
    //   const formData = new FormData()
    //   formData.append('dataObj', JSON.stringify(createProductData))
    //   createAction(formData)
    // })
    const formData = new FormData()
    // console.log('newsId ==>', newsId)
    const id = searchParams.get('id')
    console.log('id ==>', id)
    formData.append('newsId', id ? id : newsId)
    formData.append('imageUrl', file)
    if (file) {
      startTransition(() => createNewsImage(formData))
    } else {
      toast('لطفا عکس را انتخاب کنید')
    }
  }

  useEffect(() => {
    if (createNewsImageState.success != 'none') {
      toast(createNewsImageState.message)
      if (createNewsImageState.success == 'true') {
        setTimeout(() => {
          router.push('/news-list')
        }, 2000)
      }
    }
  }, [createNewsImageState])

  console.log('StepFlag ==>', stepFlag)

  return (
    <div className='create-product-page-control w-full h-screen flex gap-x-5 items-start justify-center -mt-6'>
      {stepController && !stepFlag ? (
        <div className='right w-[70%] max-lg:w-full p-5 border rounded-2xl'>
          <FormWrapper
            formInitialValues={''}
            formValidation={''}
            inputDatas={inputData}
            btnText={{ submitBtn: createNewsPending ? 'درحال ارسال اطلاعات...' : 'مرحله بعد', resetBtn: 'لغو' }}
            submitAction={formData => submitHandler(formData)}
          />
        </div>
      ) : (
        <SelectImage
          btnText={{ submitBtn: createNewsImagePending ? 'درحال ثبت عکس...' : 'ساختن', resetBtn: 'مرحله قبل' }}
          actions={{
            changeImageHandlerAction: file => {},
            submitBtn: file => createHandler(file),
            resetBtn: () => setStepcontroller(true)
          }}
          pending
        />
      )}
    </div>
  )
}

export default CreateNewsPageClient
