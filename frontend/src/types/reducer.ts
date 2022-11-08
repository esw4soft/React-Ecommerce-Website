interface GetProduct {
  type: string
  payload?: any
}

interface AllProductReducerState {
  products: []
  loading: boolean
  error: string
}

interface PlaceOrderReducerState {
  loading: boolean
  error?: string
}

interface ProductReducerState {
  product: []
  loading: boolean
  error: string
}

export type {
  GetProduct,
  ProductReducerState,
  AllProductReducerState,
  PlaceOrderReducerState,
}
