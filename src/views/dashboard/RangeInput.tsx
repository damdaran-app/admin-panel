import { Label, Slider } from '@heroui/react'
import { FC, useState } from 'react'

interface TProps {
  label: string
}

export const RangeInput = () => {
  const [finalValue, setFinalValue] = useState<string>('')
  const changeHadndler = (value: number | number[]) => {
    const newValue = new Intl.NumberFormat('fa-IR').format(value as number)
    setFinalValue(newValue)
  }

  return (
    // <Slider className='w-full max-w-xs' defaultValue={30}>
    //   <Label>تومان</Label>
    //   <Slider.Output />
    //   <Slider.Track>
    //     <Slider.Fill />
    //     <Slider.Thumb />
    //   </Slider.Track>
    // </Slider>

    <Slider
      className='w-full max-w-md'
      maxValue={1000000}
      defaultValue={10000}
      onChange={value => changeHadndler(value)}
    >
      <div className='mb-3 flex items-center justify-between'>
        <Label className='text-lg font-semibold text-white'>قیمت</Label>

        <Slider.Output className='text-lg font-semibold text-white'>{finalValue}</Slider.Output>
      </div>

      <Slider.Track
        className='
      relative
      h-3
      w-full
      rounded-full
      bg-[#2A2A2E]
      overflow-visible
    '
      >
        <Slider.Fill
          className='
        absolute
        left-0
        top-0
        h-full
        rounded-full
        bg-[#0A84FF]
      '
        />

        <Slider.Thumb
          className='
        block
        size-6
        cursor-pointer
        mt-1
        rounded-full
        bg-white
        border-[3px]
        border-[#0A84FF]
        shadow-[0_4px_12px_rgba(0,0,0,0.45)]
        outline-none
      '
        />
      </Slider.Track>
    </Slider>
  )
}
