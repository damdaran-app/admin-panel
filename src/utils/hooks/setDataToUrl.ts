'use client'

interface IData {
  name: string
  value: string
}

interface IUseSetUrl {
  data?: IData[]
  useRouter: any
  useSearchParams: any
  pathname?: string
}

export const setDataToUrl = ({ useSearchParams, useRouter, data, pathname }: IUseSetUrl) => {
  const params = new URLSearchParams(useSearchParams?.toString() || '')
  data?.forEach(item => params.set(item.name, item.value))
  useRouter.push(`${pathname || ''}?${params.toString()}`, { scroll: false })
}
