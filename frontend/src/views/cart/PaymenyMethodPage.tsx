import React, { useContext, useEffect, useState } from 'react'
import { CheckoutSteps } from '../../components'
import { Helmet } from 'react-helmet-async'
import { Store } from '../../Store'
import { useNavigate } from 'react-router'

const PaymenyMethodPage = () => {
  const navigate = useNavigate()
  const { state, dispatch: btnDispatch } = useContext(Store)

  const {
    cart: { shippingAddress, paymentMethod },
  } = state

  const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || '')

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping')
    }
  }, [shippingAddress, navigate])

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    btnDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName })
    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethodName))
    navigate('/placeorder')
  }
  return (
    <div>
      <Helmet>
        <title>Payment Method</title>
      </Helmet>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <h1 className="mb-6 px-10 md:mx-auto md:w-1/2">Payment Method</h1>
      <form onSubmit={submitHandler} className="px-10 md:m-auto md:w-1/2">
        <div className="mb-6">
          <div className="mb-4 flex items-center">
            <input
              id="Stripe"
              type="radio"
              value="Stripe"
              name="default-radio"
              className="h-4 w-4 border-gray-300 bg-gray-100 text-sky-800 focus:ring-2 focus:ring-blue-800 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label
              htmlFor="Stripe"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Stripe
            </label>
          </div>

          <div className="mb-10 flex items-center">
            <input
              id="PayPal"
              type="radio"
              value="PayPal"
              name="default-radio"
              className="h-4 w-4 border-gray-300 bg-gray-100 text-sky-800 focus:ring-2 focus:ring-blue-800 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              checked={paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label
              htmlFor="PayPal"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              PayPal
            </label>
          </div>

          <button
            type="submit"
            className="mb-4 w-full rounded-lg bg-sky-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-sky-900 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  )
}

export default PaymenyMethodPage
