import React from 'react'
import { useEffect, useState, useReducer } from 'react'
import axios from 'axios'
import { ProductDet, GetProduct, ProductReducerState } from '../../types'
import { useParams } from 'react-router-dom'

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
    <div>{product.name}</div>
  )
}

export default Productpage
