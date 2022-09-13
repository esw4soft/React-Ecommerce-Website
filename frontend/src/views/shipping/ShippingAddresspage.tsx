import React, { useContext, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { CheckoutSteps } from '../../components'
import { Store } from '../../Store'

function ShippingAddresspage() {
  const navigate = useNavigate()
  const { state, dispatch: btnDispatch } = useContext(Store)
  const {
    userInfo,
    cart: { shippingAddress },
  } = state

  const [fullName, setFullName] = useState(shippingAddress.fullName || '')
  const [address, setAddress] = useState(shippingAddress.address || '')
  const [city, setCity] = useState(shippingAddress.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
  const [country, setCountry] = useState(shippingAddress.country || '')

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping')
    }
  }, [userInfo, navigate])

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    btnDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    })
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    )
    navigate('/payment')
  }
  return (
    <>
      <div>
        <Helmet>
          <title>Shippting Address</title>
        </Helmet>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <h1 className="mb-6 px-10 md:mx-auto md:w-1/2">Shipping Address</h1>
        <form onSubmit={submitHandler} className="px-10 md:m-auto md:w-1/2">
          <div className="mb-6">
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              fullName
            </label>
            <input
              type="text"
              id="fullName"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="address"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="city"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="postalCode"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              PostalCode
            </label>
            <input
              type="text"
              id="postalCode"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
              required
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="country"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mb-4 w-full rounded-lg bg-sky-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-sky-900 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default ShippingAddresspage
