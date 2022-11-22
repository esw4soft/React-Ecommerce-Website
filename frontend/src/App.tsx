import React from 'react'
import { useContext } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Store } from './Store'
import { Dropdown } from 'flowbite-react'
import { ToastContainer } from 'react-toastify'
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
import { ProfilePage } from './views/user'
import 'react-toastify/dist/ReactToastify.css'
import './App.scss'

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
  return (
    <BrowserRouter>
      <div className="min-h-[95vh]">
        <ToastContainer position="bottom-left" autoClose={1500} limit={1} />
        <header className="flex justify-start bg-sky-900 p-4">
          <nav className="container mx-auto flex items-center">
            <Link to="/" className="bg-sky-900 text-xl font-bold text-white">
              lowmazon
            </Link>
            <Link to="/cart" className="ml-5 text-xl text-white">
              Cart
              {cart.cartItems.length > 0 && (
                <span className="ml-1 rounded-full bg-red-700 px-1.5 text-xs font-semibold text-red-100 dark:bg-red-900 dark:text-red-200">
                  {cart.cartItems.reduce((pre, item) => pre + item.quantity, 0)}
                </span>
              )}
            </Link>
            {userInfo ? (
              <div id="dropdowmStyle" className="ml-5 text-xl text-white">
                <Dropdown label={userInfo.name} inline={true}>
                  <Link to="/profile">
                    <Dropdown.Item>User Profile</Dropdown.Item>
                  </Link>
                  <Link to="/orderhistory">
                    <Dropdown.Item>Order History</Dropdown.Item>
                  </Link>
                  <Dropdown.Divider />
                  <Link to="/signin" onClick={signoutHandler}>
                    <Dropdown.Item>Sign out</Dropdown.Item>
                  </Link>
                </Dropdown>
              </div>
            ) : (
              <Link to="/signin" className="ml-5 text-xl text-white">
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
