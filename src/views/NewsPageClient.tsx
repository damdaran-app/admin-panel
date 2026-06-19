'use client'

import { CustomDropDown } from '@/components/DropDown'
import { deleteProductHadnler, GetDataType, GetProductListParamsType } from '@/services/get/product-api'
import { GetNewsResponseType, NewsSearchParams } from '@/types/pages/main/product/product-type'
import { setDataToUrl } from '@/utils/hooks/setDataToUrl'
import CustomTabel from '@/views/dashboard/Table'
import { Comment, FolderOpen, TrashBin, Picture } from '@gravity-ui/icons'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { toast } from 'sonner'
import CustomCard from './CardTabel'

interface TProps {
  data: GetNewsResponseType
  searchParamsApi: NewsSearchParams
  updateNewsList: ({}: GetProductListParamsType<NewsSearchParams>) => Promise<GetDataType<GetNewsResponseType>>
}

const NewsPageClient: FC<TProps> = ({ data, updateNewsList, searchParamsApi }) => {
  const [newsList, setNewsList] = useState<GetNewsResponseType>(data)
  const router = useRouter()
  return (
    <>
      {newsList.data && (
        <CustomTabel
          data={{
            column: newsList?.data,
            headData: ['عکس مقاله', 'عنوان مقاله', 'وضعیت استخان', 'امتیاز', 'عملیات'],
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
              type: 'image',
              dataValue: 'image',
              child: { isChild: false }
            },
            { type: 'string', dataValue: 'title', child: { isChild: false } },
            {
              type: 'string',
              dataValue: 'isBones',
              child: {
                isChild: true,
                renderItem: data => {
                  return (
                    <span
                      className={`text-[14px] p-2.5 px-4 rounded-2xl ${data ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
                    >
                      {data ? 'استخان دارد' : 'استخان ندارد'}
                    </span>
                  )
                }
              }
            },
            {
              type: 'string',
              dataValue: 'rating',
              child: {
                isChild: true,
                renderItem: dataValue => {
                  return (
                    <span className='text-[16px] bg-orange-600 text-white py-1.5 px-3 rounded-full'>{dataValue}</span>
                  )
                }
              }
            },
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
                          key: 'open-detailPage',
                          value: 'دیدن جزئیات',
                          icon: <FolderOpen className='h-5 w-5 text-black group-hover:text-white' />,
                          allProps: {
                            className: 'group text-black hover:text-white',
                            onClick: () => router.push(`/news-list/${data._id}`)
                          }
                        },
                        {
                          key: 'open-comment',
                          value: 'دیدن کامنت ها',
                          icon: <Comment className='h-5 w-5 text-black group-hover:text-white' />,
                          allProps: {
                            className: 'group text-black hover:text-white',
                            onClick: () => router.push(`/news-comment/${data._id}`)
                          }
                        },
                        {
                          key: 'add-photo',
                          value: 'افزودن عکس',
                          icon: <Picture className='h-5 w-5 text-black group-hover:text-white' />,
                          allProps: {
                            className: 'group text-black hover:text-white',
                            onClick: () => router.push(`/create-news?id=${data._id}&StepFlag=true`)
                          }
                        },
                        // {
                        //   key: 'edite-product',
                        //   value: 'ویرایش محصول',
                        //   icon: <FloppyDisk className='h-5 w-5 text-black group-hover:text-white' />,
                        //   allProps: {
                        //     className: 'group text-black hover:text-white',
                        //     onClick: () => console.log('data ==>', data)
                        //   }
                        // },
                        {
                          key: 'delete-product',
                          value: 'حذف مقاله',
                          icon: <TrashBin className='h-5 w-5 text-black group-hover:text-white' />,
                          allProps: {
                            className: 'group text-black hover:text-white',
                            onClick: async () => {
                              const response = await deleteProductHadnler(`/deleteNews/${data._id}`)
                              toast(response.message)
                              if (response.success) {
                                const newNewsList = await updateNewsList({
                                  endPoint: '/getNewsLists',
                                  searchParams: searchParamsApi
                                })
                                newNewsList?.data ? setNewsList(newNewsList?.data) : null
                              }
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
          actions={{
            limitAction: limitValue => {
              //   setDataToUrl({
              //     useSearchParams: searchParams,
              //     useRouter: router,
              //     data: [{ name: 'RowsOfPage', value: limitValue.id == 'x' ? '1' : limitValue.id == 'y' ? '2' : '10' }]
              //   })
              console.log('limitValue ==>', limitValue)
            },
            searchAction: searchValue => {
              // console.log('searchValue ==>', )
              //   setDataToUrl({
              //     useSearchParams: searchParams,
              //     useRouter: router,
              //     data: [{ name: 'Query', value: searchValue }]
              //   })
            }
          }}
        />
      )}
      <CustomCard
        data={{ headData: ['عکس مقاله', 'عنوان مقاله', 'وضعیت استخان', 'امتیاز', 'عملیات'], column: newsList.data }}
        fildKeys={[
          {
            type: 'image',
            dataValue: 'image',
            child: { isChild: false }
          },
          { type: 'string', dataValue: 'title', child: { isChild: false } },
          {
            type: 'string',
            dataValue: 'isBones',
            child: {
              isChild: true,
              renderItem: data => {
                return (
                  <span
                    className={`text-[14px] p-2.5 px-4 rounded-2xl ${data ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
                  >
                    {data ? 'استخان دارد' : 'استخان ندارد'}
                  </span>
                )
              }
            }
          },
          {
            type: 'string',
            dataValue: 'rating',
            child: {
              isChild: true,
              renderItem: dataValue => {
                return (
                  <span className='text-[16px] bg-orange-600 text-white py-1.5 px-3 rounded-full'>{dataValue}</span>
                )
              }
            }
          },
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
                        key: 'open-detailPage',
                        value: 'دیدن جزئیات',
                        icon: <FolderOpen className='h-5 w-5 text-black group-hover:text-white' />,
                        allProps: {
                          className: 'group text-black hover:text-white',
                          onClick: () => router.push(`/news-list/${data._id}`)
                        }
                      },
                      {
                        key: 'open-comment',
                        value: 'دیدن کامنت ها',
                        icon: <Comment className='h-5 w-5 text-black group-hover:text-white' />,
                        allProps: {
                          className: 'group text-black hover:text-white',
                          onClick: () => router.push(`/news-comment/${data._id}`)
                        }
                      },
                      {
                        key: 'add-photo',
                        value: 'افزودن عکس',
                        icon: <Picture className='h-5 w-5 text-black group-hover:text-white' />,
                        allProps: {
                          className: 'group text-black hover:text-white',
                          onClick: () => router.push(`/create-news?id=${data._id}&StepFlag=true`)
                        }
                      },
                      // {
                      //   key: 'edite-product',
                      //   value: 'ویرایش محصول',
                      //   icon: <FloppyDisk className='h-5 w-5 text-black group-hover:text-white' />,
                      //   allProps: {
                      //     className: 'group text-black hover:text-white',
                      //     onClick: () => console.log('data ==>', data)
                      //   }
                      // },
                      {
                        key: 'delete-product',
                        value: 'حذف مقاله',
                        icon: <TrashBin className='h-5 w-5 text-black group-hover:text-white' />,
                        allProps: {
                          className: 'group text-black hover:text-white',
                          onClick: async () => {
                            const response = await deleteProductHadnler(`/deleteNews/${data._id}`)
                            toast(response.message)
                            if (response.success) {
                              const newNewsList = await updateNewsList({
                                endPoint: '/getNewsLists',
                                searchParams: searchParamsApi
                              })
                              newNewsList?.data ? setNewsList(newNewsList?.data) : null
                            }
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
  )
}

export default NewsPageClient
