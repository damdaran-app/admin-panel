'use client'
import Close from '@/@menu/svg/Close'
import { samimFont } from '@/components/layout/shared/Fonts'
import { FC, ReactNode, useState } from 'react'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { SelectOption } from './SelectOption'

interface TFildKeys {
  type: 'image' | 'action' | 'string'
  child?: {
    isChild: boolean
    renderItem?: (data: boolean | string, rowItem: Record<string, any>) => ReactNode
  }
  dataValue: string
}

type TColumn = Array<Record<string, any>>

interface TProps {
  hasImage?: boolean
  data?: {
    headData: string[]
    column?: TColumn
    dropDownData?: { id: string; value: string }[]
  }
  fildKeys?: TFildKeys[]
  classNames?: {
    table: string
  }
  filtering?: {
    isSearch?: boolean
    isPagination?: boolean
    isLimit?: boolean
  }
  actions?: {
    searchAction?: (searchValue: string) => void
    limitAction?: (limitValue: any) => void
    cardAction?: (cardItem: any) => void
  }
}

const CustomTable: FC<TProps> = ({ data, fildKeys, filtering, actions }) => {
  const [inputValue, setInputValue] = useState('')
  const [dropDownValue, setDropDownValue] = useState(data?.dropDownData?.[0] ?? '')

  if (data?.column && data?.column?.length > 0) {
    return (
      <div className='table-holder w-full max-md:hidden block'>
        <div className='filter-item-control flex gap-x-3'>
          {filtering?.isSearch && (
            <button className='relative bg-transparent border-none outline-none'>
              <input
                type='text'
                placeholder='جست و جو کنید'
                className={`shadow-sm bg-white text-black outline-none border-none px-5 py-3 text-[15px] rounded-2xl ${samimFont.className}`}
                value={inputValue}
                onChange={event => {
                  const value = event.target.value

                  setInputValue(value)
                  actions?.searchAction?.(value)
                }}
              />

              <Close
                accentHeight={100}
                className='absolute top-[20%] left-2 cursor-pointer'
                onClick={() => {
                  setInputValue('')
                  actions?.searchAction?.('')
                }}
              />
            </button>
          )}

          {/* {filtering?.isLimit && (
            <select
              value={dropDownValue}
              onChange={event => {
                const value = event.target.value
  
                setDropDownValue(value)
                actions?.limitAction?.(value)
              }}
              className={`${samimFont.className} outline-none border-2 border-orange-600 bg-orange-400 text-white text-[16px]
              py-1 px-4 rounded-2xl cursor-pointer`}
            >
              {data?.dropDownData?.map((item, index) => (
                <option key={index} value={item} className={samimFont.className}>
                  {item} آیتم
                </option>
              ))}
            </select>
          )} */}
          {filtering?.isLimit && data?.dropDownData ? (
            <SelectOption
              dataMap={data?.dropDownData}
              onClick={data => actions?.limitAction?.(data)}
              selectMode={'single'}
            />
          ) : (
            <></>
          )}
        </div>

        <TableContainer className='w-full mt-5 bg-white rounded-2xl shadow overflow-hidden'>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: '#f97316'
                }}
              >
                {data?.headData?.map((item, index) => (
                  <TableCell
                    key={index}
                    align='center'
                    sx={{
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '16px',
                      borderBottom: 'none',
                      fontFamily: 'inherit'
                    }}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.column?.map((rowItem, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  hover
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f9fafb'
                    }
                  }}
                >
                  {fildKeys?.map((field, colIndex) => {
                    // console.log('rowItem?.[field.dataValue] ==>', rowItem?.[field.dataValue])
                    const value = rowItem?.[field.dataValue]

                    const imageSrc = Array.isArray(value)
                      ? value?.[0]?.src
                      : typeof value === 'string'
                        ? value
                        : (value?.src ?? '')
                    console.log('imageSrc ==>', imageSrc)
                    return (
                      <TableCell key={colIndex} align={'center'} className={`${samimFont.className}`}>
                        {!field.child?.isChild ? (
                          field.type === 'image' ? (
                            <div className='flex justify-center items-center'>
                              <img
                                src={imageSrc}
                                alt='بدون عکس'
                                className='w-[80px] h-[70px] rounded-xl object-cover'
                              />
                            </div>
                          ) : (
                            <span className='text-[16px]'>{rowItem?.[field.dataValue]}</span>
                          )
                        ) : (
                          field.child.renderItem?.(rowItem?.[field.dataValue], rowItem)
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  } else {
    return (
      <div className='w-full h-[70vh] text-control flex justify-center items-center'>
        <span className={`${samimFont.className} text-white bg-black py-3 px-10 text-2xl rounded-xl`}>
          دیتایی وجود ندارد
        </span>
      </div>
    )
  }
}

export default CustomTable
