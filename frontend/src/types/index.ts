import {
  GetProduct,
  ProductReducerState,
  AllProductReducerState,
} from './reducer'

interface ProductDet {
  numberk: number
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

  loading: boolean
  error: string
  products: []
}

export interface Product {
  products: [ProductDet, ProductDet, ProductDet, ProductDet]
}

export type {
  ProductDet,
  GetProduct,
  ProductReducerState,
  AllProductReducerState,
}
