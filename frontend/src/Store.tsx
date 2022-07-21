import React from 'react'
import { createContext, useReducer } from 'react'
import { CartDet } from './types'
// createcontext
const initialState: StateType = {
  cart: {
    cartItems: [],
  },
}
interface AppContextInterface {
  state: StateType
  dispatch: any
}

export const Store = createContext<AppContextInterface>({
  state: initialState,
  dispatch: { type: '', payload: '' },
})

//  reducer
interface ActionType {
  type: string
  payload: any
}
interface StateType {
  cart: { cartItems: CartDet[] }
}
function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      // ADD TO CART
      const newItem = action.payload

      // 判斷購物車裡東西有沒有新加入的商品
      const existItem = state.cart.cartItems.find(
        (item) => item.numberk === newItem.numberk
      )

      // 如果有 迴圈購物車商品 >> 再判斷一次id 有就迴圈新的覆蓋舊的 沒有就迴圈舊的
      // 如果沒有重複 就把新的加入舊的
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.numberk === existItem.numberk ? newItem : item
          )
        : [...state.cart.cartItems, newItem]
      return { ...state, cart: { ...state.cart, cartItems } }

      // return {
      //   ...state,
      //   cart: {
      //     ...state.cart,
      //     cartItems: [...state.cart.cartItems, action.payload],
      //   },
      // }
    }
    default:
      return state
  }
}

// store component
interface ChildrenProps {
  children: React.ReactNode
}

export function StorePrivider(props: ChildrenProps) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}
