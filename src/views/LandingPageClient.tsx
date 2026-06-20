'use client'
import { samimFont } from '@/assets/fonts'
import { CreateProductActionType, UpdateLandingReportDataType } from '@/types/pages/main/product/product-type'
import { updateLandingReportAction } from '@/utils/server-actions'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { FormEvent, startTransition, useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import CustomInput, { ICustomInput } from './dashboard/CustomInput'

const LandingInputComp = ({
  titleText,
  isTitle,
  inputData,
  startNumSlice,
  endNumSlide
}: {
  titleText: string
  isTitle: boolean
  inputData: ICustomInput[]
  startNumSlice: number
  endNumSlide: number
}) => {
  return (
    <>
      {isTitle && <h3 className='bg-gray-500 text-white p-2 rounded-xl'>{titleText}</h3>}
      <div className='inputs-control flex flex-wrap gap-3 mt-4'>
        {inputData.slice(startNumSlice, endNumSlide).map((item, index) => (
          <CustomInput
            key={index}
            name={item.name}
            placeholder={item.placeholder}
            labelText={item.labelText}
            className={item.className}
            {...item}
          />
        ))}
      </div>
    </>
  )
}

const LandingPageClient = ({ tokenValue }: { tokenValue: string }) => {
  const [btnText, setBtnText] = useState<string>('نمایش محتوای فعلی')
  const [inputData, setInputData] = useState<ICustomInput[]>([
    {
      labelText: 'تایتل',
      type: 'text',
      name: 'headingTextTitle',
      itemData: [],
      className: 'w-[45%] max-sm:w-full'
    },
    {
      labelText: 'استارت تایتل',
      type: 'text',
      name: 'headingTextStartTitle',
      itemData: [],
      className: 'w-[45%] max-sm:w-full'
    },
    {
      labelText: 'تایتل کیلیشه ای',
      type: 'text',
      name: 'headingTextClicheTitle',
      itemData: [],
      className: 'w-[45%] max-sm:w-full'
    },
    {
      labelText: 'تایتل آخر',
      type: 'text',
      name: 'headingTextEndTitle',
      itemData: [],
      className: 'w-[45%] max-sm:w-full'
    },
    {
      labelText: 'توضیحات',
      type: 'text',
      name: 'headingTextDescription',
      itemData: [],
      className: 'w-[91%] max-sm:w-full'
    },
    {
      labelText: 'تایتل',
      type: 'text',
      name: 'aboutProductsTitle',
      itemData: [],
      className: 'w-[45%] max-sm:w-full'
    },
    {
      labelText: 'توضیحات',
      type: 'text',
      name: 'aboutProductsDescrption',
      itemData: [],
      className: 'w-[45%] max-sm:w-full'
    },
    {
      labelText: 'محصول',
      type: 'text',
      name: 'aboutProductsProducts',
      itemData: [],
      className: 'w-[45%] max-sm:w-full',
      generateItemData: {
        label: 'نکته کلیدی',
        placeholder: 'این مرغ سوخاری نمیشود',
        title: 'این مرغ سوخاری نمیشود'
      },
      flags: {
        isGenerateItem: true,
        isTitle: true,
        showTitle: true
      },
      max: {
        generatItemLength: 3
      }
    },
    {
      labelText: 'سوال',
      type: 'text',
      name: 'singleQuestionQuestion',
      itemData: [],
      className: 'w-[45%] max-sm:w-full'
    },
    {
      labelText: 'پاسخ سوال',
      type: 'text',
      name: 'singleQuestionAnswerToTheQuestion',
      itemData: [],
      className: 'w-[45%] max-sm:w-full'
    },
    {
      labelText: 'تایتل',
      type: 'text',
      name: 'ourPositivePointsTitle',
      itemData: [],
      className: 'w-[91%] max-sm:w-full'
    },
    {
      labelText: 'محصول',
      type: 'text',
      name: 'ourPositivePointsTips',
      itemData: [],
      className: 'w-[45%] max-sm:w-full',
      generateItemData: {
        label: 'نکته کلیدی',
        placeholder: 'این مرغ سوخاری نمیشود',
        title: 'این مرغ سوخاری نمیشود'
      },
      flags: {
        isGenerateItem: true,
        isTitle: true,
        showTitle: true
      },
      max: {
        generatItemLength: 4
      }
    },
    {
      labelText: 'نام کمپانی',
      type: 'text',
      name: 'aboutMeCompanyName',
      itemData: [],
      className: 'w-[91%] max-sm:w-full'
    },
    {
      labelText: 'تایتل',
      type: 'text',
      name: 'aboutMeTitle',
      itemData: [],
      className: 'w-[91%] max-sm:w-full'
    },
    {
      labelText: 'توضیحات',
      type: 'text',
      name: 'aboutMeDescription',
      itemData: [],
      className: 'w-[91%] max-sm:w-full'
    },
    {
      labelText: 'سال های فعالیت',
      type: 'text',
      name: 'myWorkYearsOfActivity',
      itemData: [],
      className: 'w-[91%] max-sm:w-full'
    },
    {
      labelText: 'گوشت ارگانیک',
      type: 'text',
      name: 'myWorkOrganicMeat',
      itemData: [],
      className: 'w-[91%] max-sm:w-full'
    },
    {
      labelText: 'برند معتبر',
      type: 'text',
      name: 'myWorkAuthenticBrand',
      itemData: [],
      className: 'w-[91%] max-sm:w-full'
    },
    {
      labelText: 'محصول',
      type: 'text',
      name: 'frequentlyAskedQuestions',
      itemData: [],
      className: 'w-[45%] max-sm:w-full',
      generateItemData: {
        label: 'نکته کلیدی',
        placeholder: 'این مرغ سوخاری نمیشود',
        title: 'این مرغ سوخاری نمیشود'
      },
      flags: {
        isGenerateItem: true,
        isTitle: true,
        showTitle: true
      },
      max: {
        generatItemLength: 4
      }
    }
  ])

  const [updateReportInitialState] = useState<CreateProductActionType<any>>({ success: 'none', message: '' })
  const [updateReportState, updateReportAction, updateReportPending] = useActionState(
    updateLandingReportAction,
    updateReportInitialState
  )
  const router = useRouter()

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
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
      const headingTextTitle = formData.get('headingTextTitle')?.toString() ?? ''
      const headingTextStartTitle = formData.get('headingTextStartTitle')?.toString() ?? ''
      const headingTextClicheTitle = formData.get('headingTextClicheTitle')?.toString() ?? ''
      const headingTextEndTitle = formData.get('headingTextEndTitle')?.toString() ?? ''
      const headingTextDescription = formData.get('headingTextDescription')?.toString() ?? ''
      const aboutProductsTitle = formData.get('aboutProductsTitle')?.toString() ?? ''
      const aboutProductsDescrption = formData.get('aboutProductsDescrption')?.toString() ?? ''
      const aboutProductsProductsLabel = formData.getAll('aboutProductsProductsLabel')
      const aboutProductsProductsDescription = formData.getAll('aboutProductsProductsDescription')
      const singleQuestionQuestion = formData.get('singleQuestionQuestion')?.toString() ?? ''
      const singleQuestionAnswerToTheQuestion = formData.get('singleQuestionAnswerToTheQuestion')?.toString() ?? ''
      const ourPositivePointsTitle = formData.get('ourPositivePointsTitle')?.toString() ?? ''
      const ourPositivePointsTipsLabel = formData.getAll('ourPositivePointsTipsLabel')
      const ourPositivePointsTipsDescription = formData.getAll('ourPositivePointsTipsDescription')
      const aboutMeCompanyName = formData.get('aboutMeCompanyName')?.toString() ?? ''
      const aboutMeTitle = formData.get('aboutMeTitle')?.toString() ?? ''
      const aboutMeDescription = formData.get('aboutMeDescription')?.toString() ?? ''
      const myWorkYearsOfActivity = formData.get('myWorkYearsOfActivity')?.toString() ?? ''
      const myWorkOrganicMeat = formData.get('myWorkOrganicMeat')?.toString() ?? ''
      const myWorkAuthenticBrand = formData.get('myWorkAuthenticBrand')?.toString() ?? ''
      const frequentlyAskedQuestionsLabel = formData.getAll('frequentlyAskedQuestionsLabel')
      const frequentlyAskedQuestionsDescription = formData.getAll('frequentlyAskedQuestionsDescription')

      const aboutProductsProducts = aboutProductsProductsLabel.map((item, index) => ({
        title: item,
        description: aboutProductsProductsDescription[index]
      }))

      const ourPositivePointsTips = ourPositivePointsTipsLabel.map((item, index) => ({
        tipsTitle: item,
        tipsDescription: ourPositivePointsTipsDescription[index]
      }))

      const frequentlyAskedQuestions = frequentlyAskedQuestionsLabel.map((item, index) => ({
        question: item,
        answerToTheQuestion: frequentlyAskedQuestionsDescription[index]
      }))

      const dataObj: UpdateLandingReportDataType = {
        headingText: {
          title: headingTextTitle,
          startTitle: headingTextStartTitle,
          clicheTitle: headingTextClicheTitle,
          endTitle: headingTextEndTitle,
          description: headingTextDescription
        },
        aboutProducts: {
          title: aboutProductsTitle,
          descrption: aboutProductsDescrption,
          products: aboutProductsProducts
        },
        singleQuestion: {
          question: singleQuestionQuestion,
          answerToTheQuestion: singleQuestionAnswerToTheQuestion
        },
        ourPositivePoints: {
          title: ourPositivePointsTitle,
          tips: ourPositivePointsTips
        },
        aboutMeAndMyWork: {
          aboutMe: {
            companyName: aboutMeCompanyName,
            title: aboutMeTitle,
            description: aboutMeDescription
          },
          myWork: {
            yearsOfActivity: myWorkYearsOfActivity,
            OrganicMeat: myWorkOrganicMeat,
            authenticBrand: myWorkAuthenticBrand
          }
        },
        frequentlyAskedQuestions: frequentlyAskedQuestions
      }

      const newFormData = new FormData()
      newFormData.append('dataObj', JSON.stringify(dataObj))
      startTransition(() => updateReportAction(newFormData))
      console.log('formData ==>', formData)
      console.log('update landing report dataObj ==>', dataObj)
    }
  }

  useEffect(() => {
    if (updateReportState.success != 'none') {
      toast(updateReportState.message)
    }
  }, [updateReportState])

  useEffect(() => {
    if (tokenValue == '') {
      router.push('/login')
    }
  }, [tokenValue])

  return (
    <div>
      {/* <Button className={`${samimFont.className} bg-primary text-white p-2 px-5 rounded-2xl`}>{btnText}</Button> */}
      <div className='form-control'>
        <form action='' className='' onSubmit={event => submitHandler(event)}>
          <div className='inputs-control flex flex-col gap-14'>
            <div className='headingText-section-controll'>
              <LandingInputComp
                inputData={inputData}
                isTitle
                startNumSlice={0}
                endNumSlide={5}
                titleText='headingText سکشن'
              />
            </div>
            <div className='aboutProducts-section-control'>
              <LandingInputComp
                inputData={inputData}
                isTitle
                startNumSlice={5}
                endNumSlide={8}
                titleText='aboutProducts سکشن'
              />
            </div>
            <div className='singleQuestion-section-control'>
              <LandingInputComp
                inputData={inputData}
                isTitle
                startNumSlice={8}
                endNumSlide={10}
                titleText='singleQuestion سکشن'
              />
            </div>
            <div className='ourPositivePoints-section-control'>
              <LandingInputComp
                inputData={inputData}
                isTitle
                startNumSlice={10}
                endNumSlide={12}
                titleText='ourPositivePoints سکشن'
              />
            </div>
            <div className='aboutMeAndMyWork-section-control'>
              <h3 className='bg-gray-500 text-white p-2 rounded-xl'>{'aboutMeAndMyWork سکشن'}</h3>
              <div className='inputs-control w-full flex max-sm:flex-col gap-3 mt-4'>
                <div className='left w-2/4 max-sm:w-full p-2 border rounded-2xl'>
                  <span className='bg-primary text-white py-1 px-4 my-2 rounded-2xl'>درباره من</span>
                  <LandingInputComp
                    inputData={inputData}
                    isTitle={false}
                    startNumSlice={12}
                    endNumSlide={15}
                    titleText='ourPositivePoints سکشن'
                  />
                </div>
                <div className='right w-2/4 max-sm:w-full p-2 border rounded-2xl'>
                  <span className='bg-primary text-white py-1 px-4 my-2 rounded-2xl'>درباره کار من</span>
                  <LandingInputComp
                    inputData={inputData}
                    isTitle={false}
                    startNumSlice={15}
                    endNumSlide={18}
                    titleText='ourPositivePoints سکشن'
                  />
                </div>
              </div>
            </div>
            <div className='frequentlyAskedQuestions-section-control'>
              <LandingInputComp
                inputData={inputData}
                isTitle
                startNumSlice={18}
                endNumSlide={19}
                titleText='frequentlyAskedQuestions سکشن'
              />
            </div>
          </div>
          <div className='btn-control flex gap-2 mt-8'>
            <Button type='submit' className={`${samimFont.className} bg-primary text-white p-2 px-6 rounded-2xl`}>
              {updateReportPending ? 'درحال ارسال اطلاعات...' : 'ثبت تفییرات'}
            </Button>
            <Button type='reset' className={`${samimFont.className} bg-red-500 text-white p-2 px-6 rounded-2xl`}>
              لغو
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LandingPageClient
