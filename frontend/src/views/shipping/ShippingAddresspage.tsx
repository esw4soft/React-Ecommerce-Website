import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'

function ShippingAddresspage() {
  const [fullName, setFullName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')
  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
  }
  return (
    <>
      <div>
        <Helmet>
          <title>Shippting Address</title>
        </Helmet>
        <h1 className="mb-6 px-10">Shipping Address</h1>
        <form onSubmit={submitHandler} className="px-10">
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
              className="d block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
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
