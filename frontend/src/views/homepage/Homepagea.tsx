import React from 'react'
import { useEffect, useReducer } from 'react'
import axios from 'axios'
import logger from 'use-reducer-logger'
import { ProductDet, GetProduct, AllProductReducerState } from '../../types'
import { Helmet } from 'react-helmet-async'
import { Loadingcpm, Messagecpm } from '../../components'
import Product from '../../components/Products'

const reducer = (state: AllProductReducerState, action: GetProduct) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

const Homepagea = () => {
  const resobj: AllProductReducerState = {
    products: [],
    loading: true,
    error: '',
  }
  const [{ loading, error, products }, dispatch] = useReducer(
    logger(reducer),
    resobj
  )
  // const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST', payload: '' })

      try {
        const result = await axios.get('/api/products')
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (err: any) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message })
      }

      // setProducts(result.data)
    }
    fetchData()
  }, [])

  return (
    <>
      <h1 className="text-3xl font-bold text-center sm:text-left">
        Featured Products
      </h1>
      <Helmet>
        <title>hollowmazon</title>
      </Helmet>
      <div className="products flex flex-wrap justify-center">
        {loading ? (
          <Loadingcpm />
        ) : error ? (
          <Messagecpm>{error}</Messagecpm>
        ) : (
          // <div>{error}</div>
          products.map((product: ProductDet) => (
            <Product key={product.slug} product={product}></Product>
          ))
        )}
      </div>
    </>
  )
}

export default Homepagea
