import React, { useContext } from 'react'
import { useEffect, useReducer } from 'react'
import axios from 'axios'
import { GetProduct, ProductReducerState } from '../../types'
import { useNavigate, useParams } from 'react-router-dom'
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
  const navigate = useNavigate()
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
  const { cart } = state
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((item) => item._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    const { data } = await axios.get(`/api/products/${product._id}`)
    if (data.countInStock < quantity) {
      window.alert('sorry, product is out of stock')
      return
    }
    btnDispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
    navigate('/cart')
  }

  return loading ? (
    <Loadingcpm />
  ) : error ? (
    <Messagecpm msgcode={0}>{error}</Messagecpm>
  ) : (
    <>
      <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <section className="col-span-2">
          <img className="img-large m-auto" src={logo} alt={product.name} />
        </section>
        <section className="col-span-2 px-3 sm:col-span-1">
          <div className="border-b-2 py-2 px-3">
            <Helmet>
              <title>{product.name}</title>
            </Helmet>
            <h1>{product.name}</h1>
          </div>
          <div className="border-b-2 py-2 px-3">
            <Rating
              rating={product.rating}
              numReviews={product.numReviews}
            ></Rating>
          </div>
          <div className="border-b-2 py-2 px-3">價格 : ${product.price}</div>
          <div className="py-2 px-3">
            詳細內容: <p>{product.description}</p>
          </div>
        </section>

        <section className="col-span-2 rounded px-3 py-2 sm:col-span-1 sm:border">
          <div className="flex justify-between border-b-2 px-3 py-2">
            <p>價格:</p>
            <p>${product.price}</p>
          </div>
          <div className="mb-1 flex justify-between border-b-2 px-3 py-2">
            <p>狀態:</p>
            <p>
              {product.countInStock > 0 ? (
                <span className="rounded bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 dark:bg-green-200 dark:text-green-900">
                  有庫存
                </span>
              ) : (
                <span className="rounded bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800 dark:bg-red-200 dark:text-red-900">
                  缺貨中
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
                    className="mr-2 mb-2 rounded-lg bg-sky-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-900 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    加入購物車
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
