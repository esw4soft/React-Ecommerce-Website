interface GetProduct {
  type: string
  payload: any
}

interface AllProductReducerState {
  products: []
  loading: boolean
  error: string
}

interface ProductReducerState {
  product: []
  loading: boolean
  error: string
}

interface AppContextInterface {
  state?: any
}

export type {
  GetProduct,
  ProductReducerState,
  AllProductReducerState,
  AppContextInterface,
}
