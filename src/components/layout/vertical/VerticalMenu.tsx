'use client'
// MUI Imports
import Chip from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ParamValue } from 'next/dist/server/request/params'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }: { scrollMenu: (container: any, isPerfectScrollbar: boolean) => void }) => {
  // Hooks
  const theme = useTheme()
  const { isBreakpointReached, transitionDuration } = useVerticalNav()
  const [targetId, setTargetId] = useState<string>()
  const [stepFlag, setStepFlag] = useState<string>('')
  const params = useParams()
  const searchParams = useSearchParams()

  console.log('params ==>', params)

  useEffect(() => {
    if (params.id) {
      setTargetId(params.id as string)
    }
  }, [params])

  useEffect(() => {
    setStepFlag(searchParams.get('StepFlag') ?? '')
  }, [searchParams])

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        menuItemStyles={menuItemStyles(theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-line' /> }}
        menuSectionStyles={menuSectionStyles(theme)}
      >
        <MenuItem
          href={'/'}
          // suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />}
          // target='_blank'
        >
          مدیریت صفحه Landing
        </MenuItem>
        <SubMenu
          label='مدیریت محصولات'
          icon={<i className='ri-home-smile-line' />}
          // suffix={<Chip label='5' size='small' color='error' />}
        >
          <MenuItem
            href={'/products'}
            // suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />}
            // target='_blank'
          >
            محصولات
          </MenuItem>
          <MenuItem href='/create-product'> ساختن محصول </MenuItem>
          {/* <MenuItem href='/products/id'> جزئیات محصول </MenuItem> */}
        </SubMenu>
        <MenuSection label='مدیریت مقالات'>
          <SubMenu
            label='مدیریت مقالات'
            icon={<i className='ri-home-smile-line' />}
            // suffix={<Chip label='5' size='small' color='error' />}
          >
            <MenuItem
              href={'/news-list'}
              // suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />}
              // target='_blank'
            >
              مقالات
            </MenuItem>
            <MenuItem href={`/create-news`}> ساختن مقاله جدبد </MenuItem>
          </SubMenu>
        </MenuSection>

        <MenuSection label='مدیریت دسته بندی ها'>
          <SubMenu
            label='مدیریت دسته بندی ها'
            icon={<i className='ri-home-smile-line' />}
            // suffix={<Chip label='5' size='small' color='error' />}
          >
            <MenuItem
              href={'/product-categories'}
              // suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />}
              // target='_blank'
            >
              دسته بندی محصولات
            </MenuItem>
            <MenuItem href='/news-categories'> دسته بندی مقاله </MenuItem>
          </SubMenu>
          {/* <MenuItem href='/comment-list'> مدیریت </MenuItem> */}
        </MenuSection>

        <MenuSection label='مدیریت کامنت ها'>
          <SubMenu
            label='مدیریت کامنت ها'
            icon={<i className='ri-home-smile-line' />}
            // suffix={<Chip label='5' size='small' color='error' />}
          >
            <MenuItem
              href={`/product-comment/${!params.id ? 'id' : !targetId?.includes(params.id as string) ? params.id : 'id'}`}
              // suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />}
              // target='_blank'
            >
              کامنت محصولات
            </MenuItem>
            <MenuItem
              href={`/news-comment/${!params.id ? 'id' : !targetId?.includes(params.id as string) ? params.id : 'id'}`}
            >
              کامنت مقالات
            </MenuItem>
          </SubMenu>
          {/* <MenuItem href='/comment-list'> مدیریت </MenuItem> */}
        </MenuSection>
        <MenuSection label='تنظیمات'>
          <SubMenu label='تنظیمات صفحات Auth'>
            <MenuItem href={'/auth-settings'}>تنظیمات</MenuItem>
            <MenuItem href={'/information'}>نمایش محتوا</MenuItem>
          </SubMenu>
        </MenuSection>
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
