'use client'

import { CircleArrowLeft, Bars } from '@gravity-ui/icons'
// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

const NavToggle = () => {
  // Hooks
  const { toggleVerticalNav, isBreakpointReached } = useVerticalNav()

  const handleClick = () => {
    toggleVerticalNav()
  }

  return (
    <>
      {/* <i className='ri-menu-line text-xl cursor-pointer' onClick={handleClick} /> */}
      {/* Comment following code and uncomment above code in order to toggle menu on desktop screens as well */}
      {isBreakpointReached && <Bars className='w-[28px] h-[28px] cursor-pointer' onClick={handleClick}/>}
      {/* {isBreakpointReached && <i className='ri-menu-line text-xl cursor-pointer' onClick={handleClick} />} */}
    </>
  )
}

export default NavToggle
