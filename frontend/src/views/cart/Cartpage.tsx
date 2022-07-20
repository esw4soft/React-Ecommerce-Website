import React from 'react'
import { useContext } from 'react'
import { Store } from '../../Store'
import { Helmet } from 'react-helmet-async'
import { Messagecpm } from '../../components'
import { Link } from 'react-router-dom'
import logo from '../../logo.svg'
import { MdDeleteForever } from 'react-icons/md'
import axios from 'axios'

function Cartpage() {
  const { state, dispatch: btnDispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  const updataCartHandler = async (item: any, quantity: number) => {
    const { data } = await axios.get(`/api/products/${item.numberk}`)

    if (data.countInStock < quantity) {
      window.alert('sorry, product is out of stock')
      return
    }
    btnDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } })
  }
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1 className="text-center sm:text-left">Shopping Cart</h1>
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="col-span-3 sm:col-span-2 ">
          {cartItems.length === 0 ? (
            <Messagecpm msgcode={1}>
              Cart is empty.{' '}
              <Link to="/" className="border-b-2 border-blue-400">
                Go shopping
              </Link>
            </Messagecpm>
          ) : (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                {/* <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Product
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Qty
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Price
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Action
                    </th>
                  </tr>
                </thead> */}
                <tbody>
                  {cartItems.map((item) => (
                    <tr
                      key={item.numberk}
                      className="grid grid-cols-4 border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600 sm:grid-cols-9"
                    >
                      <td className="col-span-2 m-auto w-32 p-2 sm:col-span-2">
                        <img src={logo} alt={item.name} />
                      </td>
                      <td className="col-span-2 self-center py-3 px-3 font-semibold text-gray-900 dark:text-white sm:col-span-2">
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </td>
                      <td className="col-span-2 m-auto py-3 px-3 sm:col-span-3">
                        <div className="flex items-center space-x-3">
                          <button
                            className="inline-flex items-center rounded-full border border-gray-300 bg-white p-1 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                            type="button"
                            disabled={item.quantity === 1}
                            onClick={() =>
                              updataCartHandler(item, item.quantity - 1)
                            }
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="h-4 w-4"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </button>
                          <div>
                            <span
                              id="first_product"
                              className="block w-14 rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-1 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            >
                              {item.quantity}
                            </span>
                          </div>
                          <button
                            className="inline-flex items-center rounded-full border border-gray-300 bg-white p-1 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                            type="button"
                            disabled={item.quantity === item.countInStock}
                            onClick={() =>
                              updataCartHandler(item, item.quantity + 1)
                            }
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="h-4 w-4"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="m-auto py-3 px-3 font-semibold text-gray-900 dark:text-white sm:col-span-1">
                        ${item.price}
                      </td>
                      <td className="m-auto py-3 px-3 sm:col-span-1">
                        <a href="#" className=" hover:text-red-700">
                          <MdDeleteForever className="text-center text-2xl" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="col-span-3 sm:col-span-1">
          <section className="col-span-2 rounded-md px-3 py-2 shadow-md sm:col-span-1 sm:border">
            <div className="flex justify-between border-b-2 px-3 py-2">
              <h2 className="m-auto text-2xl font-bold sm:m-0">
                Subtotal (
                {cartItems.reduce((pre, item) => pre + item.quantity, 0)} item)
                : $
                {cartItems.reduce(
                  (pre, item) => pre + item.quantity * item.price,
                  0
                )}
              </h2>
            </div>
            <div>
              <div className="flex justify-around">
                <div className="flex flex-grow px-3 py-3">
                  <button
                    type="button"
                    className="text-md mr-2 mb-2 flex-grow rounded-lg bg-sky-800 py-2 font-medium text-white hover:bg-sky-900 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Cartpage
