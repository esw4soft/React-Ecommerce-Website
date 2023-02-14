import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Store } from './Store'
import { Dropdown } from 'flowbite-react'
import { toast, ToastContainer } from 'react-toastify'
import {
  AiOutlineBars,
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai'

import { getError } from './utils'
import Homepagea from './views/homepage'
import Productpage from './views/product'
import {
  Cartpage,
  PaymenyMethodPage,
  ShippingAddresspage,
  PlaceOrderPage,
  ShowOrderPage,
  OrderHistoryPage,
} from './views/cart'
import Signinpage from './views/signin'
import Signuppage from './views/signup'
import ProfilePage from './views/user'
import 'react-toastify/dist/ReactToastify.css'
import './App.scss'
import axios from 'axios'
import SearchBox from './components/SearchBox'
import SearchPage from './views/search'

function App() {
  const { state, dispatch: btnDispatch } = useContext(Store)
  const { cart, userInfo } = state

  const signoutHandler = () => {
    btnDispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    window.location.href = '/signin'
  }

  const [sidebarIsOpen, setSidebatIsOpen] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`)
        setCategories(data)
      } catch (err) {
        toast.error(getError(err))
      }
    }
    fetchCategories()
  })
  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? 'ml-[240px]  min-h-[95vh] transition-all duration-300'
            : 'ml-0 min-h-[95vh] transition-all duration-300'
        }
      >
        <ToastContainer position="bottom-left" autoClose={1500} limit={1} />
        <header className="flex justify-start bg-sky-900 p-4">
          <nav className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebatIsOpen(!sidebarIsOpen)}
                className="text-2xl  font-bold text-white"
              >
                <AiOutlineBars />
              </button>
              <Link
                to="/"
                className="ml-5 hidden bg-sky-900 text-xl font-bold text-white sm:block"
              >
                Hollowmazon
              </Link>
              <Link
                to="/"
                className="ml-4 text-2xl font-bold text-white sm:hidden"
              >
                <AiOutlineHome />
              </Link>
              <div className="ml-5">
                <SearchBox />
              </div>
            </div>

            <div className="flex items-center">
              <Link
                to="/cart"
                className="ml-5 hidden text-xl text-white sm:flex sm:items-center sm:justify-center"
              >
                購物車
                {cart.cartItems.length > 0 && (
                  <span className="ml-1 rounded-full bg-red-700 px-1.5 pt-[2px] pb-[3px] text-xs font-semibold text-red-100 dark:bg-red-900 dark:text-red-200">
                    {cart.cartItems.reduce(
                      (pre, item) => pre + item.quantity,
                      0
                    )}
                  </span>
                )}
              </Link>
              <Link
                to="/cart"
                className="relative ml-5 flex text-2xl text-white sm:hidden"
              >
                <AiOutlineShoppingCart />
                {cart.cartItems.length > 0 && (
                  <span className="absolute top-[-5px] right-[-5px] ml-1 rounded-full bg-red-700 px-1.5 text-xs font-semibold text-red-100 dark:bg-red-900 dark:text-red-200">
                    {cart.cartItems.reduce(
                      (pre, item) => pre + item.quantity,
                      0
                    )}
                  </span>
                )}
              </Link>
              {userInfo ? (
                <>
                  <div
                    id="dropdowmStyle"
                    className="ml-5 hidden text-xl text-white sm:block"
                  >
                    <Dropdown label={userInfo.name} inline={true}>
                      <Link to="/profile">
                        <Dropdown.Item>個人資料</Dropdown.Item>
                      </Link>
                      <Link to="/orderhistory">
                        <Dropdown.Item>歷史訂單</Dropdown.Item>
                      </Link>
                      <Dropdown.Divider />
                      <Link to="/signin" onClick={signoutHandler}>
                        <Dropdown.Item>登出</Dropdown.Item>
                      </Link>
                    </Dropdown>
                  </div>
                  <div
                    id="dropdowmStyle"
                    className="ml-5 flex items-center text-2xl text-white sm:hidden"
                  >
                    <AiOutlineUser />
                    <Dropdown label={''} inline={true}>
                      <Link to="/profile">
                        <Dropdown.Item>個人資料</Dropdown.Item>
                      </Link>
                      <Link to="/orderhistory">
                        <Dropdown.Item>歷史訂單</Dropdown.Item>
                      </Link>
                      <Dropdown.Divider />
                      <Link to="/signin" onClick={signoutHandler}>
                        <Dropdown.Item>登出</Dropdown.Item>
                      </Link>
                    </Dropdown>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="ml-5 hidden text-xl text-white sm:block"
                  >
                    登入
                  </Link>
                  <Link
                    to="/signin"
                    className="ml-5 text-2xl text-white sm:hidden"
                  >
                    <AiOutlineUser />
                  </Link>
                </>
              )}
            </div>
          </nav>
        </header>
        <div
          className={
            sidebarIsOpen
              ? 'absolute left-0 top-0 flex h-full w-[240px] flex-col flex-wrap justify-between bg-sky-900 transition-all duration-500'
              : 'absolute left-[-300px] top-0 flex h-full w-[240px] flex-col flex-wrap justify-between bg-sky-900 transition-all duration-500'
          }
        >
          <div>
            <strong>Categories</strong>
            {categories.map((category: any) => (
              <Link
                key={category}
                to={`/search?category=${category}`}
                onClick={() => setSidebatIsOpen(false)}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
        <main className="container mx-auto py-4">
          <Routes>
            <Route path="/products/:slug" element={<Productpage />} />
            <Route path="/cart" element={<Cartpage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/signin" element={<Signinpage />} />
            <Route path="/signup" element={<Signuppage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/shipping" element={<ShippingAddresspage />} />
            <Route path="/payment" element={<PaymenyMethodPage />} />
            <Route path="/placeorder" element={<PlaceOrderPage />} />
            <Route path="/orders/:id" element={<ShowOrderPage />} />
            <Route path="/orderhistory" element={<OrderHistoryPage />} />
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
