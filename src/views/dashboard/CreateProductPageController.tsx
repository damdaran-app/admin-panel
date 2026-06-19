'use client'
import { ChangeEvent, FC, startTransition, useActionState, useEffect, useState } from 'react'
import FormWrapper from './custom-form/FormWrapper'
import { ICustomInput, ICustomInputEvent, TSelectOptionValue } from './CustomInput'
import { TypeListDataType } from '@/services/get/product-api'
import { createProductAction, createProductImageAction } from '@/utils/server-actions'
import { CreateProductActionType, CreateProductType, ProductDataType } from '@/types/pages/main/product/product-type'
import { toast } from 'sonner'
import { Button } from '@mui/material'
import { samimFont } from '@/assets/fonts'
import { useRouter } from 'next/navigation'

interface TProps {
  typeList: TSelectOptionValue[]
}

const CreateProductPageController: FC<TProps> = ({ typeList }) => {
  const [stepController, setStepcontroller] = useState<boolean>(true)
  const [inputData, setInputData] = useState<ICustomInput[]>([
    {
      labelText: 'نام محصول',
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
      labelText: 'توضیحات کوتاه',
      type: 'miniDescription',
      name: 'miniDescription',
      placeholder: '',
      className: 'w-[45%]',
      itemData: [],
      flags: {
        isGenerateItem: false
      }
    },
    {
      labelText: 'توضیحات محصول',
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
      labelText: 'کیفیت محصول',
      type: 'select',
      name: 'quality',
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
      name: 'type',
      placeholder: 'کشور صادر کننده',
      className: 'w-[45%]',
      itemData: typeList,
      flags: {
        isGenerateItem: false
      }
    },
    {
      labelText: 'کشور صادر کننده',
      type: 'text',
      name: 'xportingCountry',
      placeholder: 'کشور صادر کننده',
      className: 'w-[45%]',
      itemData: [],
      flags: {
        isGenerateItem: false
      }
    },
    {
      labelText: 'نام برند',
      type: 'text',
      name: 'brand',
      placeholder: 'نام برند',
      className: 'w-[45%]',
      itemData: typeList,
      flags: {
        isGenerateItem: false
      }
    },
    {
      labelText: 'قیمت',
      type: 'text-range',
      name: 'price',
      placeholder: 'نام برند',
      className: 'w-[45%]',
      itemData: typeList,
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
  const [createProductData, setCreateProductData] = useState<CreateProductType>()
  const [productId, setProductId] = useState<string>('')
  const router = useRouter()

  const [createInitialState] = useState<CreateProductActionType<ProductDataType>>({
    success: 'none',
    message: ''
  })
  const [createState, createAction, createProoductPending] = useActionState(createProductAction, createInitialState)

  // create image state
  const [staticImage, setStaticImage] = useState<string>('')
  const [imageFile, setImageFile] = useState<any>()
  const [createImageInitialState] = useState<CreateProductActionType<ProductDataType>>({
    success: 'none',
    message: ''
  })
  const [createImageState, createImageAction, createImagePending] = useActionState(
    createProductImageAction,
    createImageInitialState
  )

  const submitHandler = (values: FormData) => {
    console.log('values ==>', values)
    const labels = values.getAll('useInCookingLabel')
    const descriptions = values.getAll('useInCookingDescription')

    const tips = labels.map((label, index) => ({
      title: label.toString(),
      description: descriptions[index]?.toString() || ''
    }))

    const dataObj: CreateProductType = {
      title: values.get('title')?.toString() ?? '',
      description: values.get('description')?.toString() ?? '',
      miniDescription: values.get('miniDescription')?.toString() ?? '',
      isBones: values.get('isBones')?.toString() == 'بله' ? 'true' : 'false',
      quality: values.get('quality')?.toString() ?? '',
      xportingCountry: values.get('xportingCountry')?.toString() ?? '',
      keyPoints: values.getAll('keyPoints').map(item => item.toString()),
      type: values.get('type')?.toString() ?? '',
      brand: values.get('brand')?.toString() ?? '',
      price: values.get('price')?.toString() ?? '',
      useInCooking: {
        title: values.get('useInCookingTitle')?.toString() ?? '',
        tips: tips
      }
    }

    setCreateProductData(dataObj)
    const formData = new FormData()
    formData.append('dataObj', JSON.stringify(dataObj))
    startTransition(() => createAction(formData))
  }

  const changeImageHandelr = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0]
    console.log(event.target.files)
    if (imageFile) {
      setImageFile(imageFile)
      const newUrl = URL.createObjectURL(imageFile)
      setStaticImage(newUrl)
    }
  }

  // create product message
  useEffect(() => {
    if (createState.success == 'true') {
      toast.success(createState.message)
      setProductId(createState.data?._id ?? '')
      setStepcontroller(false)
    } else if (createState.success == 'false') {
      toast.error(createState.message)
    }
  }, [createState])

  // add product image message
  useEffect(() => {
    if (imageFile) {
      toast(createImageState.message)
      if (createImageState.success == 'true') {
        setTimeout(() => {
          router.push('/products')
        }, 2000)
      }
    }
  }, [createImageState])

  console.log('createImageState ==>', createImageState)

  const createHandler = () => {
    // startTransition(() => {
    //   const formData = new FormData()
    //   formData.append('dataObj', JSON.stringify(createProductData))
    //   createAction(formData)
    // })
    const formData = new FormData()
    formData.append('productId', productId)
    formData.append('imageUrl', imageFile)
    if (imageFile) {
      startTransition(() => createImageAction(formData))
    } else {
      toast('لطفا عکس را انتخاب کنید')
    }
  }

  return (
    <div className='create-product-page-control w-full h-screen flex gap-x-5 items-start justify-center -mt-6'>
      {stepController ? (
        <div className='right w-[70%] max-lg:w-full p-5 border rounded-2xl'>
          <FormWrapper
            formInitialValues={createProductData}
            formValidation={''}
            inputDatas={inputData}
            btnText={{ submitBtn: createProoductPending ? 'درحال ارسال اطلاعات...' : 'مرحله بعد', resetBtn: 'لغو' }}
            submitAction={formData => submitHandler(formData)}
          />
        </div>
      ) : (
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
            <Button
              className={`${samimFont.className} bg-primary text-white rounded-2xl`}
              onClick={() => createHandler()}
            >
              {createImagePending ? 'درحال افزودن عکس...' : 'ساختن'}
            </Button>
            <Button
              className={`${samimFont.className} bg-red-500 text-white rounded-2xl`}
              onClick={() => {
                setStepcontroller(true)
              }}
            >
              مرحله قبل
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateProductPageController
