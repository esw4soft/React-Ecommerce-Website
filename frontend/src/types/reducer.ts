interface GetProduct {
  type: string
  payload: any
}

interface ReducerState {
  products: []
  loading: boolean
  error: string
}

export type { GetProduct, ReducerState }
