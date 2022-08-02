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
  const { cart, userInfo } = state
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
            {userInfo ? (
              <>
                {' '}
                <button
                  id="dropdownDefault"
                  data-dropdown-toggle="dropdown"
                  className="inline-flex items-center rounded-lg bg-sky-900 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-sky-900 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Dropdown button{' '}
                  <svg
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                <div
                  id="dropdown"
                  className="z-10 hidden w-44 divide-y divide-gray-100 rounded bg-white shadow dark:bg-gray-700"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefault"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <Link to="/signin" className="ml-5 text-white">
                SignIn
              </Link>
            )}
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
