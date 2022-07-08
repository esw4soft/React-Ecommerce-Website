import React from 'react'
import { createContext, useReducer } from 'react'
// import { AppContextInterface } from './types'

const initialState = {
  cart: {
    cartItems: [],
  },
}
interface AppContextInterface {
  state: any
  dispatch: any
}
export const Store = createContext<AppContextInterface>({
  state: initialState,
  dispatch: 1,
})

interface ActionType {
  type: string
  payload: any
}
interface StateType {
  cart: Record<string, unknown>
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

interface ChildrenProps {
  children: React.ReactNode
}

export function StorePrivider(props: ChildrenProps) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}
