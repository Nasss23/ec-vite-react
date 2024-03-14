export interface IBackendRes<T> {
  error?: string | string[]
  message: string
  statusCode: number | string
  data?: T
}

export interface IMeta {
  current: null
  pageSize: null
  pages: number
  total: number
}

export interface IAccount {
  access_token: string
  user: {
    _id: string
    email: string
    name: string
    role: string
  }
}

export interface IUser {
  _id?: string
  name: string
  email: string
  password?: string
  role?: string
  createdBy?: string
  isDeleted?: boolean
  deletedAt?: boolean | null
  createdAt?: string
  updatedAt?: string
}

export interface IGetAccount extends Omit<IAccount, 'access_token'> {}

export interface IProduct {
  _id: string
  name: string
  price: number
  image: string
  brand: {
    _id?: string
    name: string
    description: string
    category: string
  }
  description: string
  slug: string
  quantity: number
  discount: number
  sold: number
  discountStartDate: Date | null
  discountEndDate: Date | null
}

export interface ICatagory {
  _id: string
  name: string
  description: string
  brand: {
    _id: string
    name: string
    description: string
  }[]
}

export interface IBrand {
  _id: string
  name: string
  description: string
  category: {
    _id: string
    name: string
    description: string
    brand: string[]
  }
  product?: {
    _id: string
    name: string
    description: string
  }[]
}

export interface ICart {
  _id: string
  quantity: number
  product?: {
    _id: string
    name: string
    price: number
    image: string
    slug?: string
  }
}

export interface IUserCart {
  _id?: string
  name?: string
  cart: {
    _id: string
    quatity?: number
    product: IProduct
  }[]
}
