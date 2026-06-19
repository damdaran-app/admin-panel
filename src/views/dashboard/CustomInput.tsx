'use client'
import Close from '@/@menu/svg/Close'
import { samimFont } from '@/components/layout/shared/Fonts'
import { TextArea } from '@heroui/react'
import { Button, Input } from '@mui/material'
import { ChangeEvent, ComponentPropsWithoutRef, FC, useState } from 'react'
import gregorian from 'react-date-object/calendars/gregorian'
import english from 'react-date-object/locales/gregorian_en'
import persian_fa from 'react-date-object/locales/persian_fa'
import DatePicker from 'react-multi-date-picker'
import { SelectOption, SelectOptionValueType } from './SelectOption'
import { RangeInput } from './RangeInput'
import { ChangNumber } from '@/utils/hooks/ChangNumber'
import { toast } from 'sonner'

export type InputTypes = 'text' | 'range' | 'select' | 'date' | 'description' | 'miniDescription' | 'text-range'
export interface TSelectOptionValue {
  id: string
  value: string
}

export interface ICustomInputEvent {
  rangeNum: number[]
  name: string
  selectOption: {
    name: string
    value: string
  }
  target?: ChangeEvent<HTMLInputElement> | HTMLSelectElement | EventTarget | HTMLInputElement
  search: string
  date: string
}

export interface ICustomInput extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  type: InputTypes
  placeholder?: string
  labelText?: string
  name?: string
  urlValue?: string
  parentWidth?: number
  itemData: TSelectOptionValue[]
  rangeMinValue?: number
  rangeMaxValue?: number
  rangeSteper?: number
  rangeDefaultValue?: number[]
  onChange?: (event: ICustomInputEvent) => void
  formInputChangeHandelr?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  dataAos?: string
  inputBgColor?: string
  errorMessage?: any
  flags?: {
    isGenerateItem?: boolean
    isTitle?: boolean
    showTitle?: boolean
    selectMode?: 'multiple' | 'single'
  }
  generateItemData?: {
    title?: string
    label?: string
    placeholder?: string
  }
  max?: {
    generatItemLength?: number
  }
}

interface TGenerateItemLength {
  id: number
}

const CustomInput: FC<ICustomInput> = ({
  type,
  labelText,
  placeholder,
  name,
  itemData,
  rangeMinValue,
  rangeMaxValue,
  rangeSteper,
  rangeDefaultValue,
  onChange,
  formInputChangeHandelr,
  dataAos,
  className,
  inputBgColor,
  errorMessage,
  flags,
  generateItemData,
  max
}) => {
  const [selectState, setSelectState] = useState<string | SelectOptionValueType>('')
  const [dateState, setDateState] = useState<string>('')
  const [rangeState, setRangeState] = useState<number[] | number>([])
  const [priceChangeState, setPriceChangeState] = useState<string>('0')
  const [priceState, setPriceState] = useState<string>('')
  const [inputData, setInputData] = useState<{ title: string; desc: string }[]>([{ title: '', desc: '' }])
  const [generateItemLength, setGenerateItemLength] = useState<TGenerateItemLength[]>([])

  const removeInputItemHandler = (id: number) => {
    const filteredData = generateItemLength.filter(el => el.id != id)
    setGenerateItemLength(filteredData)
  }

  return (
    <div
      dir='rtl'
      data-aos={dataAos}
      className={`flex flex-col ${!flags?.isGenerateItem && className} ${flags?.isGenerateItem || type == 'description' ? 'w-full' : ''} shrink-0 items-start justify-center`}
    >
      {flags?.isGenerateItem ? (
        <>
          <Button
            type='button'
            className={`${samimFont.className} outline-none bg-primary text-white py-2 px-4 text-[14px] rounded-2xl cursor-pointer`}
            onClick={() => {
              if (max?.generatItemLength) {
                if (generateItemLength.length < max.generatItemLength) {
                  setGenerateItemLength(prev => [...prev, { id: generateItemLength.length + 1 }])
                } else {
                  toast(`بیشتر از ${max.generatItemLength} مورد نمیتوانید بسازید`)
                }
              } else {
                if (generateItemLength.length < 5) {
                  setGenerateItemLength(prev => [...prev, { id: generateItemLength.length + 1 }])
                } else {
                  toast('بیشتر از 5 مورد نمیتوانید بسازید')
                }
              }
            }}
          >
            {`آیتم خود را اضافه کنید (${generateItemData?.label})`}
          </Button>
          {generateItemLength.length == 0 ? (
            <input type='hidden' name={name} />
          ) : (
            <>
              {flags?.isTitle && !flags.showTitle ? (
                <div className='w-full mt-6'>
                  <span>عنوان</span>
                  <Input
                    placeholder='عنوان'
                    name={`${name}Title`}
                    className={`${samimFont.className} outline-none border w-full text-right
                    text-dark p-3 text-[14px] rounded-xl focus:border-orange-500 focus:shadow  ${labelText ? 'mt-3' : 'mt-0'}`}
                    onChange={formInputChangeHandelr}
                  />
                </div>
              ) : (
                <></>
              )}
              {generateItemLength.map((item, index) => (
                <div key={index} className='generate-input-control w-full mt-3 relative'>
                  <span>{`${generateItemData?.label} شماره (${index + 1})`}</span>
                  {flags?.isTitle ? (
                    <div className='inputs-control flex gap-2'>
                      <Input
                        type='text'
                        name={`${name}Label`}
                        placeholder={generateItemData?.placeholder}
                        className={`${inputBgColor ? inputBgColor : ''} ${samimFont.className} outline-none border w-full text-right
                          text-dark p-3 text-[14px] rounded-xl focus:border-orange-500 focus:shadow  ${labelText ? 'mt-3' : 'mt-0'}`}
                        // onChange={event => setInputData(prev => [...prev, { title: event.target.value, desc: '' }])}
                        onChange={formInputChangeHandelr}
                      />
                      <Input
                        type='text'
                        name={`${name}Description`}
                        placeholder={generateItemData?.placeholder}
                        className={`${inputBgColor ? inputBgColor : ''} ${samimFont.className} outline-none border w-full text-right
                          text-dark p-3 text-[14px] rounded-xl focus:border-orange-500 focus:shadow  ${labelText ? 'mt-3' : 'mt-0'}`}
                        // onChange={event => setInputData(prev => [...prev, { title: '', desc: event.target.value }])}
                        onChange={formInputChangeHandelr}
                      />
                    </div>
                  ) : (
                    <Input
                      type='text'
                      name={`${name}`}
                      placeholder={generateItemData?.placeholder}
                      className={`${inputBgColor ? inputBgColor : ''} ${samimFont.className} outline-none border w-full text-right
                      text-dark p-3 text-[14px] rounded-xl focus:border-orange-500 focus:shadow  ${labelText ? 'mt-3' : 'mt-0'}`}
                      onChange={formInputChangeHandelr}
                    />
                  )}
                  <Close
                    className={`absolute ${flags?.isTitle ? 'top-0' : 'top-[50%]'} left-3 cursor-pointer bg-gray-800 text-white rounded-2xl`}
                    onClick={() => removeInputItemHandler(item.id)}
                  />
                </div>
              ))}
              {/* <input type='hidden' value={JSON.stringify(inputData)} name={`${name}Data`} /> */}
            </>
          )}
        </>
      ) : (
        <>
          <div className='label-control flex'>
            <span className={`text-dark font-bold text-[15px] "mr-1`}>{labelText}</span>
            {type == 'text-range' && <span>: {priceChangeState}</span>}
          </div>
          {type === 'select' ? (
            // <button className="w-full mt-2">
            <div className='w-full mt-2 relative'>
              <SelectOption
                dataMap={itemData}
                boxStyle='w-[210px]'
                // onClick={data => {
                //   flags?.selectMode == 'single' ? setSelectState(data) : null
                // }}
                selectMode={flags?.selectMode ?? 'single'}
                onChange={value => {
                  // flags?.selectMode == 'multiple' ? setSelectState(value) : null
                  setSelectState(value)
                }}
              />
              <input
                type='hidden'
                name={name}
                value={Array.isArray(selectState) ? JSON.stringify(selectState) : selectState?.toString()}
                onChange={formInputChangeHandelr}
              />
            </div>
          ) : type === 'date' ? (
            <>
              <DatePicker
                calendar={gregorian}
                locale={persian_fa}
                format={'YYYY/MM/DD'}
                onChange={value => {
                  if (!value) return

                  const gregorianDate = value.convert(gregorian, english)

                  const formattedDate = gregorianDate.format('YYYY-MM-DD')

                  onChange?.({
                    name: 'date',
                    rangeNum: [],
                    search: '',
                    selectOption: { name: '', value: '' },
                    date: formattedDate
                  })

                  setDateState(formattedDate)
                }}
                className='w-full'
                inputClass={`${inputBgColor ?? 'bg-lightGray'} outline-0 z-50 text-left
                border w-full text-gray text-[16px] py-2 px-5 rounded-xl mt-3`}
                placeholder={placeholder}
              />
              <input type='hidden' name={name} value={dateState} />
            </>
          ) : type == 'description' ? (
            <TextArea
              name={name}
              className={`
              resize-none w-full h-[150px] outline-none border-none p-3 overflow-auto mt-3 shadow rounded-2xl
              ${samimFont.className} text-[14px] font-medium
            `}
              onChange={formInputChangeHandelr}
            ></TextArea>
          ) : type == 'range' ? (
            <RangeInput />
          ) : type == 'text-range' ? (
            <div className='w-full'>
              {/* <div className='price-label-input-control'>
                <span>{labelText}</span>
                <span>{priceChangeState}</span>
              </div> */}
              <Input
                type={type}
                placeholder={placeholder}
                name={name}
                value={priceState}
                className={`${inputBgColor ? inputBgColor : ''} ${samimFont.className} outline-none border w-full text-right
                text-dark p-3 py-2 text-[14px] rounded-xl focus:border-orange-500 focus:shadow  ${labelText ? 'mt-3' : 'mt-0'}`}
                onChange={event => {
                  console.log(event.target.value)
                  if (!isNaN(Number(event.target.value))) {
                    setPriceState(event.target.value)
                    const newPrice = ChangNumber(Number(event.target.value))
                    setPriceChangeState(newPrice)
                    onChange?.({
                      name: event.target.name,
                      target: event.target,
                      rangeNum: [],
                      search: event.target.value,
                      selectOption: { name: '', value: '' },
                      date: ''
                    })
                  } else {
                    toast('لطفا عدد وارد کنید')
                  }
                  formInputChangeHandelr?.(event)
                }}
              />
            </div>
          ) : (
            <Input
              type={type}
              placeholder={placeholder}
              name={name}
              className={`${inputBgColor ? inputBgColor : ''} ${samimFont.className} outline-none border w-full text-right
                text-dark p-3 py-2 text-[14px] rounded-xl focus:border-orange-500 focus:shadow  ${labelText ? 'mt-3' : 'mt-0'}`}
              onChange={event => {
                onChange?.({
                  name: event.target.name,
                  target: event.target,
                  rangeNum: [],
                  search: event.target.value,
                  selectOption: { name: '', value: '' },
                  date: ''
                })
                formInputChangeHandelr?.(event)
              }}
            />
          )}
          {errorMessage && Object.keys(errorMessage).length != 0 ? (
            <span className='text-red-500'>{errorMessage[name ?? '']}</span>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  )
}

export default CustomInput
