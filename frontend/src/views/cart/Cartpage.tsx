import React from 'react'
import { useContext } from 'react'
import { Store } from '../../Store'
import { Helmet } from 'react-helmet-async'

function Cartpage() {
  const { state, dispatch: btnDispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
    </div>
  )
}

export default Cartpage
