'use client'
import { GetCommentDataType } from '@/types/pages/main/product/product-type'
import { FC, useState } from 'react'
import CustomTabel from '@/views/dashboard/Table'
import { CustomDropDown } from '@/components/DropDown'
import { TrashBin } from '@gravity-ui/icons'
import { deleteComment, GetDataType } from '@/services/get/product-api'
import { toast } from 'sonner'
import CustomCard from './CardTabel'

interface TProps {
  pageName: 'product' | 'news'
  id: string
  data: GetCommentDataType
  updateCommentList: (endPoint: string) => Promise<GetDataType<GetCommentDataType>>
}

const CommentPageClient: FC<TProps> = ({ pageName, id, data, updateCommentList }) => {
  const [commentDataList, setCommentDataList] = useState<GetCommentDataType>(data)

  const updateList = async () => {
    let newCommentDataList
    if (pageName == 'product') {
      newCommentDataList = await updateCommentList(`/getAllProductCommentList/${id}`)
      newCommentDataList.data ? setCommentDataList(newCommentDataList.data) : null
    } else {
      newCommentDataList = await updateCommentList(`/getNewsCommentList/${id}`)
      newCommentDataList.data ? setCommentDataList(newCommentDataList.data) : null
    }
  }

  return (
    <>
      {commentDataList.data && (
        <CustomTabel
          data={{
            column: commentDataList.data,
            headData: ['نام کاربر', 'عنوان کامنت', 'کپشن کامنت', 'تعداد لایک', 'تعداد دیسلایک', 'تاریخ ثبت', 'عملیات'],
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
            // { type: 'string', dataValue: 'productId', child: { isChild: false } },
            {
              type: 'string',
              dataValue: 'userName',
              child: { isChild: false }
            },
            { type: 'string', dataValue: 'title', child: { isChild: false } },
            { type: 'string', dataValue: 'description', child: { isChild: false } },
            {
              type: 'string',
              dataValue: 'likeCount',
              child: {
                isChild: true,
                renderItem: data => <span className='bg-green-600 text-white p-2 rounded-full'>{data}</span>
              }
            },
            {
              type: 'string',
              dataValue: 'desLikeCount',
              child: {
                isChild: true,
                renderItem: data => <span className='bg-red-500 text-white p-2 rounded-full'>{data}</span>
              }
            },
            { type: 'string', dataValue: 'createAt', child: { isChild: false } },
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
                          value: 'حذف کامنت',
                          icon: <TrashBin className='h-5 w-5 text-black group-hover:text-white' />,
                          allProps: {
                            className: 'group text-black hover:text-white',
                            onClick: async () => {
                              let deleteResponse
                              if (pageName == 'product') {
                                deleteResponse = await deleteComment(`/deleteComment/${data._id}`)
                                if (deleteResponse?.success) {
                                  //   const newTypeList = await updateTypeList('/getProductTypeLists')
                                  //   newTypeList.data ? setTypeList(newTypeList.data?.data) : null
                                  updateList()
                                }
                              } else {
                                deleteResponse = await deleteComment(`/deleteNewsComment/${data._id}`)
                                if (deleteResponse?.success) {
                                  updateList()
                                }
                                // deleteResponse = await deleteComment(`/deleteNewsType/${data._id}`)
                                // if (deleteResponse?.success) {
                                //   //   const newTypeList = await updateTypeList('/getNewsTypeList')
                                //   //   newTypeList.data ? setTypeList(newTypeList.data?.data) : null
                                //   updateList()
                                // }
                              }
                              toast(deleteResponse?.message)
                              // const response = await deleteComment(`/deleteComment/${data._id}`)
                              // toast(response.message)
                              // if (response.success) {
                              //   const newCommentDataList = await
                              // }
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
      )}
      <CustomCard
        data={{
          column: commentDataList.data,
          headData: ['نام کاربر', 'عنوان کامنت', 'کپشن کامنت', 'تعداد لایک', 'تعداد دیسلایک', 'تاریخ ثبت', 'عملیات']
        }}
        fildKeys={[
          // { type: 'string', dataValue: 'productId', child: { isChild: false } },
          {
            type: 'string',
            dataValue: 'userName',
            child: { isChild: false }
          },
          { type: 'string', dataValue: 'title', child: { isChild: false } },
          { type: 'string', dataValue: 'description', child: { isChild: false } },
          {
            type: 'string',
            dataValue: 'likeCount',
            child: {
              isChild: true,
              renderItem: data => <span className='bg-green-600 text-white p-2 rounded-full'>{data}</span>
            }
          },
          {
            type: 'string',
            dataValue: 'desLikeCount',
            child: {
              isChild: true,
              renderItem: data => <span className='bg-red-500 text-white p-2 rounded-full'>{data}</span>
            }
          },
          { type: 'string', dataValue: 'createAt', child: { isChild: false } },
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
                        value: 'حذف کامنت',
                        icon: <TrashBin className='h-5 w-5 text-black group-hover:text-white' />,
                        allProps: {
                          className: 'group text-black hover:text-white',
                          onClick: async () => {
                            let deleteResponse
                            if (pageName == 'product') {
                              deleteResponse = await deleteComment(`/deleteComment/${data._id}`)
                              if (deleteResponse?.success) {
                                //   const newTypeList = await updateTypeList('/getProductTypeLists')
                                //   newTypeList.data ? setTypeList(newTypeList.data?.data) : null
                                updateList()
                              }
                            } else {
                              deleteResponse = await deleteComment(`/deleteNewsComment/${data._id}`)
                              if (deleteResponse?.success) {
                                updateList()
                              }
                              // deleteResponse = await deleteComment(`/deleteNewsType/${data._id}`)
                              // if (deleteResponse?.success) {
                              //   //   const newTypeList = await updateTypeList('/getNewsTypeList')
                              //   //   newTypeList.data ? setTypeList(newTypeList.data?.data) : null
                              //   updateList()
                              // }
                            }
                            toast(deleteResponse?.message)
                            // const response = await deleteComment(`/deleteComment/${data._id}`)
                            // toast(response.message)
                            // if (response.success) {
                            //   const newCommentDataList = await
                            // }
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

export default CommentPageClient
