// import { getNewsList } from '@/services/get/news-api'

import { getProductList } from '@/services/get/product-api'
import { GetNewsResponseType, NewsSearchParams } from '@/types/pages/main/product/product-type'
import NewsPageClient from '@/views/NewsPageClient'

interface TProps {
  searchParams: {
    RowsOfPage?: string
    TypeId?: string
  }
}

const NewsListPage = async ({ searchParams }: TProps) => {
  //   const newsListResponse = await getNewsList()
  //   console.log('newsListResponse ==>', newsListResponse)
  const { RowsOfPage, TypeId } = await searchParams
  const newsListResponse = await getProductList<GetNewsResponseType, NewsSearchParams>({
    endPoint: '/getNewsLists',
    searchParams: searchParams
  })
  console.log('newsListResponse ==>', newsListResponse.data?.data)

  if (newsListResponse.success && newsListResponse.data?.data) {
    return (
      <>
        <NewsPageClient
          data={newsListResponse?.data}
          searchParamsApi={{ RowsOfPage, TypeId }}
          updateNewsList={getProductList}
        />
      </>
    )
  }

  return <div></div>
}

export default NewsListPage
