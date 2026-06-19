'use client'
import { samimFont } from '@/assets/fonts'
import { Key, Label, ListBox, Select } from '@heroui/react'
import { ComponentClass, FC, useState } from 'react'

export type SelectOptionValueType = Key | Key[] | null

interface TProps {
  dataMap: { id: string; value: string }[]
  onClick?: (data: { id: string; value: string }) => void
  onChange?: (value: Key | Key[] | null) => void
  boxStyle?: string
  selectMode: 'multiple' | 'single'
}

export const SelectOption: FC<TProps> = ({ dataMap, onClick, onChange, boxStyle, selectMode }) => {
  // const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  return (
    <Select
      className=''
      placeholder={dataMap[0].value}
      selectionMode={selectMode}
      // onSelectionChange={key => console.log('key ==>', key)}
      onChange={value => onChange?.(value)}
    >
      {/* <Label className='mb-3 block text-[15px] font-semibold text-white'>State</Label> */}
      <Select.Trigger
        className={`
            flex items-center justify-between gap-5 w-full rounded-2xl outline-none border border-gray-300 bg-white px-4 py-3 shadow
            ${samimFont.className}
        `}
      >
        <Select.Value className={`text-black text-[16px]`} />
        <Select.Indicator className='text-black' />
      </Select.Trigger>

      <Select.Popover
        className={`
            mt-0.5 rounded-[24px] border-none border-[#202431] bg-white py-3 transition-all
            shadow-[0_20px_50px_rgba(0,0,0,0.55)] ${boxStyle}
        `}
      >
        <ListBox className='p-2 flex flex-col gap-2 max-h-[150px] overflow-auto'>
          {dataMap.map((item, index) => (
            <ListBox.Item
              key={index}
              id={item.value}
              textValue={item.value}
              className='flex justify-end p-1 px-6 cursor-pointer rounded-xl border-none outline-none text-[18px] font-normal
              text-black data-[hovered]:bg-gray-700 data-[hovered]:text-white
              '
              onClick={() => {
                onClick?.(item)
              }}
            >
              {item.value}
              {/* <ListBox.ItemIndicator /> */}
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  )
}
