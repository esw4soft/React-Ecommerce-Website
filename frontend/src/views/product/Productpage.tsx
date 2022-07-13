import React, { useContext } from 'react'
import { useEffect, useReducer } from 'react'
import axios from 'axios'
import { GetProduct, ProductReducerState } from '../../types'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Rating from '../../components/Rating'
import { Loadingcpm, Messagecpm } from '../../components'
import { getError } from '../../utils'
import { Store } from '../../Store'
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
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }
    fetchData()
  }, [slug])

  const { state, dispatch: btnDispatch } = useContext(Store)
  const addToCartHandler = () => {
    btnDispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quntity: 1 } })
  }

  return loading ? (
    <Loadingcpm />
  ) : error ? (
    <Messagecpm>{error}</Messagecpm>
  ) : (
    <>
      <div className="grid grid-cols-1 gap-8 items-start sm:grid-cols-2 lg:grid-cols-4">
        <section className="col-span-2">
          <img className="img-large m-auto" src={logo} alt={product.name} />
        </section>
        <section className="px-3 col-span-2 sm:col-span-1">
          <div className="py-2 px-3 border-b-2">
            <Helmet>
              <title>{product.name}</title>
            </Helmet>
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

        <section className="col-span-2 sm:col-span-1 px-3 py-2 sm:border rounded">
          <div className="flex justify-between px-3 py-2 border-b-2">
            <p>Price:</p>
            <p>${product.price}</p>
          </div>
          <div className="flex justify-between px-3 py-2 mb-1 border-b-2">
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
                <div className="px-3 py-3">
                  <button
                    type="button"
                    onClick={addToCartHandler}
                    className="text-white bg-sky-800 hover:bg-sky-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Add to Cart
                  </button>
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
