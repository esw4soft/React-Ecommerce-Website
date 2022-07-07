import React from 'react'
import { createContext, useReducer } from 'react'
import { AppContextInterface } from './types'
export const Store = createContext<AppContextInterface>()

const initialState = {
  cart: {
    cartItems: [],
  },
}

interface ActionType {
  type: string
  payload: any
}
interface StateType {
  cart: any
}
function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      // ADD TO CART
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [...state.cart.cartItems, action.payload],
        },
      }
    default:
      return state
  }
}

export function StorePrivider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value: any = { state, dispatch }
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}
