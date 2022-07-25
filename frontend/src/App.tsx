import React from 'react'
import { useContext } from 'react'
import './App.scss'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Homepagea from './views/homepage'
import Productpage from './views/product'
import Cartpage from './views/cart'
import Signinpage from './views/signin'
import { Store } from './Store'

function App() {
  const { state } = useContext(Store)
  const { cart } = state
  return (
    <BrowserRouter>
      <div className="min-h-[95vh]">
        <header className="flex justify-start bg-sky-900 p-4">
          <nav className="container mx-auto ">
            <Link to="/" className="bg-sky-900 text-xl font-bold text-white">
              lowmazon
            </Link>
            <Link to="/cart" className="ml-5 text-white">
              Cart
              {cart.cartItems.length > 0 && (
                <span className="ml-1 rounded-full bg-red-700 px-1.5 text-xs font-semibold text-red-100 dark:bg-red-900 dark:text-red-200">
                  {cart.cartItems.reduce((pre, item) => pre + item.quantity, 0)}
                </span>
              )}
            </Link>
          </nav>
        </header>
        <main className="container mx-auto py-4">
          <Routes>
            <Route path="/products/:slug" element={<Productpage />} />
            <Route path="/cart" element={<Cartpage />} />
            <Route path="/signin" element={<Signinpage />} />
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
