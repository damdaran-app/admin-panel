'use client'
import { Bars, FloppyDisk, FolderOpen, SquarePlus, TrashBin } from '@gravity-ui/icons'
import { Button, Dropdown, Kbd, Label } from '@heroui/react'
import { ComponentProps, FC, ReactNode, useState } from 'react'

interface TProps {
  dataMap: { key: string; value: string; allProps?: ComponentProps<typeof Dropdown.Item>; icon: ReactNode }[]
}

export const CustomDropDown: FC<TProps> = ({ dataMap }) => {
  return (
    <Dropdown>
      <Button aria-label='Menu' className='rounded-full p-2 cursor-pointer text-black outline-none'>
        <Bars className='outline-none' />
      </Button>

      <Dropdown.Popover className='w-[200px] rounded-[30px] border border-gray-300 bg-white shadow overflow-hidden'>
        <Dropdown.Menu aria-label='Actions' className='rounded-xl text-white py-2 flex flex-col justify-center gap-1'>
          {dataMap.map((item, index) => (
            <Dropdown.Item
              key={index}
              id={item.key}
              textValue={item.value}
              {...item.allProps}
              className={`${item.allProps?.className} p-2 hover:bg-gray-600 outline-none cursor-pointer flex items-center gap-1`}
            >
              {item.icon && item.icon}
              <span>{item.value}</span>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
