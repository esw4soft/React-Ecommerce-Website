import React, { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Button } from 'flowbite-react'
import { Store } from '../../Store'
import { CheckoutSteps } from '../../components'
import logo from '../../logo.svg'

const PlaceOrderPage = () => {
  const navigate = useNavigate()
  const { state, dispatch: btnDispatch } = useContext(Store)
  const { cart, userInfo } = state

  // 商品價錢計算
  // Number.EPSILON 解決誤差範圍: ex 0.1+0.2=0.3的誤差
  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  )
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10)
  cart.taxPrice = Math.round(round2(0.1 * cart.itemsPrice))
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

  const placeOrderHandler = async () => {
    console.log('aaa')
  }

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment')
    }
  }, [cart, navigate])
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="mb-6 px-10 text-center md:w-1/2 md:text-left">
        Preview Order
      </h1>
      <div className="gap-4 sm:grid sm:grid-cols-3">
        <div className="sm:col-span-2">
          <div className="mb-6 px-10 md:mx-auto">
            <Card>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Shipping
              </h5>
              <strong>
                Name:{' '}
                <span className="font-normal text-gray-700 dark:text-gray-400">
                  {cart.shippingAddress.fullName}
                </span>
              </strong>

              <strong>
                Address:{' '}
                <span className="font-normal text-gray-700 dark:text-gray-400">
                  {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                  {cart.shippingAddress.postalCode},{' '}
                  {cart.shippingAddress.country}
                </span>
              </strong>

              <Link className="text-sky-800 underline" to="/shipping">
                Edit
              </Link>
            </Card>
          </div>
          <div className="mb-6 px-10 md:mx-auto">
            <Card>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Payment
              </h5>
              <strong>
                Method:{' '}
                <span className="font-normal text-gray-700 dark:text-gray-400">
                  {cart.paymentMethod}
                </span>
              </strong>

              <Link className="text-sky-800 underline" to="/payment">
                Edit
              </Link>
            </Card>
          </div>
          <div className="mb-6 px-10 md:mx-auto">
            <Card>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Items
              </h5>
              <table className="w-full text-left text-sm text-gray-500 ">
                <tbody>
                  {cart.cartItems.map((item) => (
                    <tr
                      key={item._id}
                      className="grid grid-cols-4 border-b bg-gray-50 sm:grid-cols-9"
                    >
                      <td className="col-span-2 m-auto w-32  sm:col-span-2">
                        <img src={logo} alt={item.name} />
                      </td>

                      <td className="col-span-2 self-center font-semibold text-gray-900 sm:col-span-2">
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </td>

                      <td className="col-span-2 m-auto py-3 px-3 sm:col-span-3">
                        <div className="flex items-center space-x-3">
                          <div>
                            <span
                              id="first_product"
                              className="block w-14 rounded-lg bg-gray-50 px-2.5 py-1 text-center text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                            >
                              {item.quantity}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="col-span-2 m-auto py-3 px-3 font-semibold text-gray-900">
                        ${item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Link className="text-sky-800 underline" to="/cart">
                Edit
              </Link>
            </Card>
          </div>
        </div>
        <div className="sm:col-span-1">
          <div className="mb-6 px-10 md:mx-auto">
            <Card>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Order Summary
              </h5>
              <strong>
                Items:{' '}
                <span className="font-normal text-gray-700 dark:text-gray-400">
                  ${cart.itemsPrice.toFixed(2)}
                </span>
              </strong>

              <strong>
                Shipping:{' '}
                <span className="font-normal text-gray-700 dark:text-gray-400">
                  ${cart.shippingPrice.toFixed(2)}
                </span>
              </strong>

              <strong>
                Tax:{' '}
                <span className="font-normal text-gray-700 dark:text-gray-400">
                  ${cart.taxPrice.toFixed(2)}
                </span>
              </strong>

              <strong>
                Order Total:{' '}
                <span className="font-normal text-gray-700 dark:text-gray-400">
                  ${cart.totalPrice.toFixed(2)}
                </span>
              </strong>

              <Button
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Place Order
                <svg
                  className="ml-2 -mr-1 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrderPage
