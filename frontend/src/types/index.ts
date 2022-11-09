import {
  GetProduct,
  ProductReducerState,
  AllProductReducerState,
  ShowOrderReducerState,
} from './reducer'

import { ChildrenProps } from './preset'

interface ProductDet {
  _id: string
  name: string
  slug: string
  category: string
  image: string
  price: number
  countInStock: number
  brand: string
  rating: number
  numReviews: number
  description: string
  quantity: number

  loading: boolean
  error: string
  products: []
}

interface CartDet {
  _id: string
  name: string
  slug: string
  category: string
  image: string
  price: number
  countInStock: number
  brand: string
  rating: number
  numReviews: number
  description: string
  quantity: number
}

interface ShippingDet {
  fullName: string
  address: string
  city: string
  postalCode: string
  country: string
}

interface ProductsProps {
  product: ProductDet
}
export interface Product {
  products: [ProductDet, ProductDet, ProductDet, ProductDet]
}

export type {
  ProductDet,
  ProductsProps,
  GetProduct,
  ProductReducerState,
  AllProductReducerState,
  CartDet,
  ChildrenProps,
  ShippingDet,
  ShowOrderReducerState,
}
