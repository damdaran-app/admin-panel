interface tipsType {
  title: string
  description: string
  _id: string
}

export interface TProductData {
  useInCooking: {
    title: string
    tips: tipsType[]
  }
  _id: string
  title: string
  description: string
  miniDescription: string
  price: string
  imageAddress: string
  photos: null
  quality: string
  xportingCountry: string
  keyPoints: string[]
  type: string
  brand: string[]
  isBones: string
  createAt: string
  updateAt: string
  __v: number
}

export interface TNewsData {
  _id: string
  image: { _id: string; src: string }[]
  title: string
  categoriesList: string[]
  titleCategories: string
  description: string
  googleTitle: string
  updateAt: string
  createAt: string
  useInCooking: {
    title: string
    tips: tipsType[]
  }
  keyPoints: string[]
  studyTime: string
  newsItems: null
  rating: string
  likeCount: string
  dislikeCount: string
}

export interface NewsDataType {
  __v: number
  _id: string
  categoriesList: string[]
  createAt: string
  description: string
  dislikeCount: string
  googleTitle: string
  image: { _id: string; src: string }[]
  keyPoints: string[]
  likeCount: string
  newsItems: null
  rating: string
  studyTime: string
  title: string
  titleCategories: string
  updateAt: string
}

export interface GetProductRsponseType {
  data?: TProductData[]
}

export interface GetNewsResponseType {
  data?: NewsDataType[]
}

export interface CreateProductType {
  title: string
  description: string
  miniDescription: string
  isBones: 'false' | 'true'
  quality: string
  xportingCountry: string
  keyPoints: string[]
  type: string
  brand: string
  price: string
  useInCooking: {
    title: string
    tips: { title: string; description: string }[]
  }
}

export interface CreateNewsType {
  title: string
  googleTitle: string
  description: string
  studyTime: string
  categoriesList: string[]
  titleCategories: string
  useInCooking: {
    title: string
    tips: { title: string; description: string }[]
  }
  keyPoints: string[]
  rating: string
}

export interface CreateProductActionType<T> {
  success: 'true' | 'false' | 'none'
  message: string
  data?: T
}

export interface ProductDataType {
  title: string
  description: string
  miniDescription: string
  useInCooking: {
    title: string
    tips: {
      title: string
      description: string
    }[]
  }
  price: string
  imageAddress: string
  photos: null
  quality: string
  xportingCountry: string
  keyPoints: string[]
  type: string
  brand: string[]
  isBones: string
  createAt: string
  updateAt: string
  _id: string
  __v: number
}

export interface ProductSearchParams {
  PageNumber?: string
  RowsOfPage?: string
  Query?: string
}

export interface NewsSearchParams {
  RowsOfPage?: string
  TypeId?: string
}

export interface CommentObjectType {
  __v: number
  _id: string
  createAt: string
  desLikeCount: string
  description: string
  likeCount: string
  productId: string
  title: string
  userName: string
  userPic: string
}

export interface GetCommentDataType {
  data: CommentObjectType[]
  totalCount: number
}

export interface UpdateLandingReportDataType {
  headingText: {
    title: string
    startTitle: string
    clicheTitle: string
    endTitle: string
    description: string
  }
  aboutProducts: {
    title: string
    descrption: string
    products: any[]
    // products: { title: string; description: string }[]
  }
  singleQuestion: {
    question: string
    answerToTheQuestion: string
  }
  ourPositivePoints: {
    title: string
    tips: any[]
    // tips: { tipsTitle: string; tipsDescription: string }[]
  }
  aboutMeAndMyWork: {
    aboutMe: {
      companyName: string
      title: string
      description: string
    }
    myWork: {
      yearsOfActivity: string
      OrganicMeat: string
      authenticBrand: string
    }
  }
  frequentlyAskedQuestions: any[]
  // frequentlyAskedQuestions: { question: string; answerToTheQuestion: string }[]
}
