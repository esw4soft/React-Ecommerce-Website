import React from 'react'
import { useContext } from 'react'
import './App.scss'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Homepagea from './views/homepage'
import Productpage from './views/product'
import Cartpage from './views/cart'
import { Store } from './Store'

function App() {
  const { state } = useContext(Store)
  const { cart } = state
  return (
    <BrowserRouter>
      <div className="min-h-[95vh]">
        <header className="flex justify-start p-4 bg-sky-900">
          <nav className="container mx-auto ">
            <Link to="/" className="font-bold bg-sky-900 text-white text-xl">
              hollowmazon
            </Link>
            <Link to="/cart" className="text-white ml-5">
              Cart
              {cart.cartItems.length > 0 && (
                <span className="bg-red-700 text-red-100 text-xs font-semibold ml-1 px-1.5 rounded-full dark:bg-red-900 dark:text-red-200">
                  {cart.cartItems.reduce((pre, item) => pre + item.quantity, 0)}
                </span>
              )}
            </Link>
          </nav>
        </header>
        <main className="py-4 container mx-auto">
          <Routes>
            <Route path="/products/:slug" element={<Productpage />} />
            <Route path="/cart" element={<Cartpage />} />
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
