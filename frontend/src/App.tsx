import React from 'react'
import { useContext } from 'react'
import './App.scss'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Homepagea from './views/homepage'
import Productpage from './views/product'
import { Store } from './Store.js'

function App() {
  const { state } = useContext(Store)
  const { cart } = state
  return (
    <BrowserRouter>
      <div className="min-h-[95vh]">
        <header className="flex p-4 bg-sky-900">
          <Link
            to="/"
            className="container mx-auto font-bold bg-sky-900 text-white text-xl"
          >
            hollowmazon
          </Link>
          <Link to="/cart">
            Cart
            {cart.cartItems.length > 0 && <div>{cart.cartItems.length}</div>}
          </Link>
        </header>
        <main className="py-4 container mx-auto">
          <Routes>
            <Route path="/products/:slug" element={<Productpage />} />
            <Route path="/" element={<Homepagea />} />
          </Routes>
        </main>
      </div>
      <footer>
        <div className="text-center font-bold">All rights reserved</div>
      </footer>
    </BrowserRouter>
  )
}

export default App
