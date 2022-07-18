import React from 'react'
import { useContext } from 'react'
import { Store } from '../../Store'
import { Helmet } from 'react-helmet-async'
import { Messagecpm } from '../../components'
import { Link } from 'react-router-dom'
import logo from '../../logo.svg'
import { MdDeleteForever } from 'react-icons/md'

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
      <h1 className="text-center sm:text-left">Shopping Cart</h1>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="col-span-3 sm:col-span-2 ">
          {cartItems.length === 0 ? (
            <Messagecpm>
              Cart is empty. <Link to="/">Go shopping</Link>
            </Messagecpm>
          ) : (
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                      className=" border-b dark:bg-gray-800 dark:border-gray-700 bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="p-4 w-32">
                        <img src={logo} alt={item.name} />
                      </td>
                      <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <button
                            className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                            disabled={item.quantity === 1}
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-4 h-4"
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
                              className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              {item.quantity}
                            </span>
                          </div>
                          <button
                            className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                            disabled={item.quantity === item.countInStock}
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-4 h-4"
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
                      <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                        {item.price}
                      </td>
                      <td className="py-4 px-6">
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
          <section className="col-span-2 sm:col-span-1 px-3 py-2 sm:border rounded-md shadow-md">
            <div className="flex justify-between px-3 py-2 border-b-2">
              <h2 className="font-bold text-2xl">
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
                <div className="px-3 py-3 flex flex-grow">
                  <button
                    type="button"
                    className="flex-grow text-white bg-sky-800 hover:bg-sky-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
