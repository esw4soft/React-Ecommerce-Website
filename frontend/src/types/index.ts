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
}

export interface Product {
  products: [Productdet, Productdet, Productdet, Productdet]
}
