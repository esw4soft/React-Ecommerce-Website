import React from 'react'
import { useEffect, useState, useReducer } from 'react'
import axios from 'axios'
import { ProductDet, GetProduct, ProductReducerState } from '../../types'
import { useParams } from 'react-router-dom'
import Rating from '../../components/Rating'
import logo from '../../logo.svg'

const reducer = (state: ProductReducerState, action: GetProduct) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, product: action.payload }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

function Productpage() {
  const params = useParams()
  const { slug } = params

  const resobj: ProductReducerState = {
    product: [],
    loading: true,
    error: '',
  }
  const [{ loading, error, product }, dispatch] = useReducer(reducer, resobj)

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST', payload: '' })

      try {
        const result = await axios.get(`/api/products/slug/${slug}`)
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (err: any) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message })
      }
    }
    fetchData()
  }, [slug])

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <>
      <div className="grid grid-cols-4 gap-4">
        <section className="col-span-2">
          <img className="img-large" src={logo} alt={product.name} />
        </section>
        <section>
          <div className="py-2 px-3 border-b-2">
            <h1>{product.name}</h1>
          </div>
          <div className="py-2 px-3 border-b-2">
            <Rating
              rating={product.rating}
              numReviews={product.numReviews}
            ></Rating>
          </div>
          <div className="py-2 px-3 border-b-2">Price : ${product.price}</div>
          <div className="py-2 px-3">
            Description: <p>{product.description}</p>
          </div>
        </section>
        <section className="px-3 py-2 border">
          <div className="flex justify-between px-3 py-2 border-b-2">
            <p>Price:</p>
            <p>${product.price}</p>
          </div>
          <div className="flex justify-between px-3 py-2 border-b-2">
            <p>Status:</p>
            <p>
              {product.countInStock > 0 ? (
                <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                  In Stock
                </span>
              ) : (
                <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
                  Unavailable
                </span>
              )}
            </p>
          </div>
          <div>
            {product.countInStock > 0 && (
              <div className="flex justify-around">
                <div>
                  <button type="button">Add to Cart</button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}

export default Productpage
