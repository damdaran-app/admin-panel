'use client'
import { FC, startTransition, useActionState, useEffect, useState } from 'react'
import CustomTabel from '@/views/dashboard/Table'
import { CustomDropDown } from '@/components/DropDown'
import { FolderOpen, TrashBin } from '@gravity-ui/icons'
import { deleteType, GetDataType, GetTypeListType, TypeListDataType } from '@/services/get/product-api'
import { toast } from 'sonner'
import { Button } from '@mui/material'
import { samimFont } from '@/assets/fonts'
import { ICustomInput } from './dashboard/CustomInput'
import FormWrapper from './dashboard/custom-form/FormWrapper'
import { CreateProductActionType } from '@/types/pages/main/product/product-type'
import { createTypeAction } from '@/utils/server-actions'
import CustomCard from './CardTabel'

interface TProps {
  data: TypeListDataType[]
  pageName: 'product' | 'news'
  updateTypeList: (endPoint: string) => Promise<GetDataType<GetTypeListType>>
}

const CategoriesPageClient: FC<TProps> = ({ data, pageName, updateTypeList }) => {
  const [typeList, setTypeList] = useState<TypeListDataType[]>(data)
  const [formStatusFlag, setFormStatusFlag] = useState<boolean>(false)
  const [inputData, setInputData] = useState<ICustomInput[]>([
    {
      labelText: 'نام دسته بندی',
      type: 'text',
      name: 'title',
      placeholder: '',
      className: 'w-full',
      itemData: [],
      flags: {
        isGenerateItem: false
      }
    }
  ])

  const [createTypeInitialState] = useState<CreateProductActionType<any>>({ success: 'none', message: '' })
  const [createTypeState, createType, createTypePending] = useActionState(createTypeAction, createTypeInitialState)

  const submitHandler = (formData: FormData) => {
    if (pageName == 'product') {
      formData.append('endPoint', JSON.stringify('/createProductType'))
    } else {
      formData.append('endPoint', JSON.stringify('/createNewsType'))
    }
    startTransition(() => createType(formData))
  }

  const updateList = async () => {
    let newTypeList
    if (pageName == 'product') {
      newTypeList = await updateTypeList('/getProductTypeLists')
      newTypeList.data ? setTypeList(newTypeList.data?.data) : null
    } else {
      newTypeList = await updateTypeList('/getNewsTypeList')
      newTypeList.data ? setTypeList(newTypeList.data?.data) : null
    }
  }

  useEffect(() => {
    if (createTypeState.success == 'true') {
      toast(createTypeState.message)
      updateList()
      setTimeout(() => {
        setFormStatusFlag(false)
      }, 1000)
    } else if (createTypeState.success == 'false') {
      toast(createTypeState.message)
    }
  }, [createTypeState])

  return (
    <>
      {/* {data && ( */}
      <Button
        className={`bg-primary text-white max-md:mb-4 ${samimFont.className}`}
        onClick={() => setFormStatusFlag(true)}
      >
        ساختن دسته بندی جدید
      </Button>
      {!formStatusFlag ? (
        <>
          <CustomTabel
            data={{
              column: typeList,
              headData: ['آیدی', 'نام', 'عملیات'],
              dropDownData: [
                { id: 'x', value: '1 آیتم' },
                { id: 'y', value: '2 آیتم' },
                { id: 't', value: '25 آیتم' }
              ]
            }}
            filtering={{
              isSearch: false,
              isLimit: false
            }}
            fildKeys={[
              {
                type: 'string',
                dataValue: '_id',
                child: { isChild: false }
              },
              { type: 'string', dataValue: 'name', child: { isChild: false } },
              {
                type: 'action',
                dataValue: '',
                child: {
                  isChild: true,
                  renderItem: (value, data) => {
                    return (
                      <CustomDropDown
                        dataMap={[
                          {
                            key: 'delete-product',
                            value: 'حذف دسته بندی',
                            icon: <TrashBin className='h-5 w-5 text-black group-hover:text-white' />,
                            allProps: {
                              className: 'group text-black hover:text-white',
                              onClick: async () => {
                                let deleteResponse
                                if (pageName == 'product') {
                                  deleteResponse = await deleteType(`/deleteProductType/${data._id}`)
                                  if (deleteResponse?.success) {
                                    //   const newTypeList = await updateTypeList('/getProductTypeLists')
                                    //   newTypeList.data ? setTypeList(newTypeList.data?.data) : null
                                    updateList()
                                  }
                                } else {
                                  deleteResponse = await deleteType(`/deleteNewsType/${data._id}`)
                                  if (deleteResponse?.success) {
                                    //   const newTypeList = await updateTypeList('/getNewsTypeList')
                                    //   newTypeList.data ? setTypeList(newTypeList.data?.data) : null
                                    updateList()
                                  }
                                }
                                toast(deleteResponse?.message)
                              }
                            }
                          }
                        ]}
                      />
                    )
                  }
                }
              }
            ]}
          />
          <CustomCard
            data={{
              column: typeList,
              headData: ['آیدی', 'نام', 'عملیات']
            }}
            fildKeys={[
              {
                type: 'string',
                dataValue: '_id',
                child: { isChild: false }
              },
              { type: 'string', dataValue: 'name', child: { isChild: false } },
              {
                type: 'action',
                dataValue: '',
                child: {
                  isChild: true,
                  renderItem: (value, data) => {
                    return (
                      <CustomDropDown
                        dataMap={[
                          {
                            key: 'delete-product',
                            value: 'حذف دسته بندی',
                            icon: <TrashBin className='h-5 w-5 text-black group-hover:text-white' />,
                            allProps: {
                              className: 'group text-black hover:text-white',
                              onClick: async () => {
                                let deleteResponse
                                if (pageName == 'product') {
                                  deleteResponse = await deleteType(`/deleteProductType/${data._id}`)
                                  if (deleteResponse?.success) {
                                    //   const newTypeList = await updateTypeList('/getProductTypeLists')
                                    //   newTypeList.data ? setTypeList(newTypeList.data?.data) : null
                                    updateList()
                                  }
                                } else {
                                  deleteResponse = await deleteType(`/deleteNewsType/${data._id}`)
                                  if (deleteResponse?.success) {
                                    //   const newTypeList = await updateTypeList('/getNewsTypeList')
                                    //   newTypeList.data ? setTypeList(newTypeList.data?.data) : null
                                    updateList()
                                  }
                                }
                                toast(deleteResponse?.message)
                              }
                            }
                          }
                        ]}
                      />
                    )
                  }
                }
              }
            ]}
          />
        </>
      ) : (
        <div className='form-container w-full h-[60vh] flex justify-center items-center'>
          <div className='form-control w-[500px] max-md:w-[80%] max-lg:w-full p-5 py-10 border rounded-2xl'>
            <FormWrapper
              formInitialValues={''}
              formValidation={''}
              inputDatas={inputData}
              btnText={{ submitBtn: createTypePending ? 'درحال ارسال اطلاعات...' : 'ساختن', resetBtn: 'لغو' }}
              submitAction={formData => submitHandler(formData)}
              cancelBtnClick={() => setFormStatusFlag(false)}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default CategoriesPageClient
