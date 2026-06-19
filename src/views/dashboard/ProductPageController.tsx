'use client'
import { CustomDropDown } from '@/components/DropDown'
import { deleteProductHadnler, GetDataType, GetProductListParamsType } from '@/services/get/product-api'
import { GetProductRsponseType, ProductSearchParams } from '@/types/pages/main/product/product-type'
import { setDataToUrl } from '@/utils/hooks/setDataToUrl'
import CustomTabel from '@/views/dashboard/Table'
import { Comment, CommentFill, FloppyDisk, FolderOpen, SquarePlus, TrashBin } from '@gravity-ui/icons'
import { Modal, ModalBody, ModalHeader, toast } from '@heroui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import CustomCard from '../CardTabel'

interface TProps {
  data: GetProductRsponseType
  searchParamsApi: {
    PageNumber: string
    RowsOfPage: string
  }
  updateProductList: ({}: GetProductListParamsType<ProductSearchParams>) => Promise<GetDataType<GetProductRsponseType>>
}

const ProductPageController: FC<TProps> = ({ data, updateProductList, searchParamsApi }) => {
  const [producList, setProductList] = useState<GetProductRsponseType>(data)
  const searchParams = useSearchParams()
  const router = useRouter()

  // delete product
  const productDeleteHandler = async (productId: string) => {
    const response = await deleteProductHadnler(`/DeleteProduct/${productId}`)
    console.log(response)
    if (response.success) {
      const newProductData = await updateProductList({ endPoint: '/getProductLists', searchParams: searchParamsApi })
      newProductData.data ? setProductList(newProductData.data) : null
    }
    toast(response.message)
  }

  useEffect(() => {
    setDataToUrl({
      useSearchParams: searchParams,
      useRouter: router,
      data: [
        { name: 'RowsOfPage', value: '7' },
        { name: 'PageNumber', value: '1' }
      ]
    })
  }, [])

  console.log('producList ==>', producList.data)

  return (
    <>
      <div className='tabel-control w-full max-md:hidden block'>
        {producList?.data && (
          <CustomTabel
            data={{
              column: producList?.data,
              headData: ['عکس محصول', 'عنوان محصول', 'وضعیت استخان', 'امتیاز', 'عملیات'],
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
                dataValue: 'imageAddress',
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
                dataValue: 'quality',
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
                              onClick: () => router.push(`/products/${data._id}`)
                            }
                          },
                          {
                            key: 'open-comment',
                            value: 'دیدن کامنت ها',
                            icon: <Comment className='h-5 w-5 text-black group-hover:text-white' />,
                            allProps: {
                              className: 'group text-black hover:text-white',
                              onClick: () => router.push(`/product-comment/${data._id}`)
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
                            value: 'حذف محصول',
                            icon: <TrashBin className='h-5 w-5 text-black group-hover:text-white' />,
                            allProps: {
                              className: 'group text-black hover:text-white',
                              onClick: () => productDeleteHandler(data._id)
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
                setDataToUrl({
                  useSearchParams: searchParams,
                  useRouter: router,
                  data: [{ name: 'RowsOfPage', value: limitValue.id == 'x' ? '1' : limitValue.id == 'y' ? '2' : '10' }]
                })
                console.log('limitValue ==>', limitValue)
              },
              searchAction: searchValue => {
                // console.log('searchValue ==>', )
                setDataToUrl({
                  useSearchParams: searchParams,
                  useRouter: router,
                  data: [{ name: 'Query', value: searchValue }]
                })
              }
            }}
          />
        )}
      </div>
      <CustomCard
        data={{ headData: ['عکس محصول', 'عنوان محصول', 'وضعیت استخان', 'عملیات'], column: producList.data }}
        fildKeys={[
          {
            type: 'image',
            dataValue: 'imageAddress',
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
                          onClick: () => router.push(`/products/${data._id}`)
                        }
                      },
                      {
                        key: 'open-comment',
                        value: 'دیدن کامنت ها',
                        icon: <Comment className='h-5 w-5 text-black group-hover:text-white' />,
                        allProps: {
                          className: 'group text-black hover:text-white',
                          onClick: () => router.push(`/product-comment/${data._id}`)
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
                        value: 'حذف محصول',
                        icon: <TrashBin className='h-5 w-5 text-black group-hover:text-white' />,
                        allProps: {
                          className: 'group text-black hover:text-white',
                          onClick: () => productDeleteHandler(data._id)
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

export default ProductPageController
