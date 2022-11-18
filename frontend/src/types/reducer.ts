interface GetProduct {
  type: string
  payload?: any
}

interface AllProductReducerState {
  products: []
  loading: boolean
  error: string
}

interface ShowOrderReducerState {
  loading: boolean
  error?: string
  order: any
  successPay: boolean
  loadingPay: boolean
}
interface OrderHistoryReducerState {
  loading: boolean
  error?: string
  orders?: any
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
  ShowOrderReducerState,
  OrderHistoryReducerState,
}
