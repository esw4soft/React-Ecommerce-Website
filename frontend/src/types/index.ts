import { getProduct } from './reducer'

interface Productdet {
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
  products: [Productdet, Productdet, Productdet, Productdet]
}

export type { Productdet, getProduct }
