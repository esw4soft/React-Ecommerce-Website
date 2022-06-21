import React from 'react'
import { useEffect, useState, useReducer } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import logger from 'use-reducer-logger'
import logo from '../../logo.svg'
import { ProductDet, GetProduct, ReducerState } from '../../types'

const reducer = (state: ReducerState, action: GetProduct) => {
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
  const resobj: ReducerState = {
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
        const result = await axios.get('./api/products')
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
      <h1 className="text-3xl font-bold underline">Featured Products</h1>
      <div className="products flex flex-wrap justify-center">
        {loading ? (
          <div>loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product: ProductDet) => (
            <div key={product.numberk} className="product border m-4">
              <Link to={`/product/${product.slug}`}>
                <img
                  className="w-full max-w-sm"
                  src={logo}
                  alt="product.name"
                />
              </Link>
              <div className="product-info p-4">
                <Link to={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </Link>
                <p>{product.price}</p>
                <button>add to card</button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default Homepagea
