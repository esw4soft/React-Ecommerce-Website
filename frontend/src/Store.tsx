import React from 'react'
import { createContext, useReducer } from 'react'
import { CartDet, ChildrenProps, ShippingDet } from './types'
// createcontext
const initialState: StateType = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') || '')
    : null,
  cart: {
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress') || '')
      : {},
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems') || '')
      : [],
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
  cart: { cartItems: CartDet[]; shippingAddress: ShippingDet }
  userInfo?: any
}
function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      // ADD TO CART
      const newItem = action.payload

      // 判斷購物車裡東西有沒有新加入的商品
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      )

      // 如果有 迴圈購物車商品 >> 再判斷一次id 有就迴圈新的覆蓋舊的 沒有就迴圈舊的
      // 如果沒有重複 就把新的加入舊的
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
          item._id === existItem._id ? newItem : item
        )
        : [...state.cart.cartItems, newItem]
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }

      // return {
      //   ...state,
      //   cart: {
      //     ...state.cart,
      //     cartItems: [...state.cart.cartItems, action.payload],
      //   },
      // }
    }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      )
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }
    }
    case 'USER_SIGNIN': {
      return { ...state, userInfo: action.payload }
    }
    case 'USER_SIGNOUT': {
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
        },
      }
    }
    case 'SAVE_SHIPPING_ADDRESS': {
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      }
    }
    default:
      return state
  }
}

// store component
export function StorePrivider(props: ChildrenProps) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}
