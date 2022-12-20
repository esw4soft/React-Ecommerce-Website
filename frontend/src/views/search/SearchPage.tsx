import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getError } from '../../utils'

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'FETCH_REQUEST': {
      return { ...state, loading: true }
    }

    case 'FETCH_SUCCESS': {
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      }
    }

    case 'FETCH_FAIL': {
      return { ...state, loading: false, error: action.payload }
    }

    default:
      return state
  }
}

const SearchPage = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const sp = new URLSearchParams(search) // sp(search params)  , /search?category=shoes
  const category = sp.get('category') || 'all'
  const query = sp.get('query') || 'all'
  const price = sp.get('price') || 'all'
  const rating = sp.get('rating') || 'all'
  const order = sp.get('order') || 'newest'
  const page = sp.get('page') || 1

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        )
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
      }
    }
    fetchData()
  }, [category, error, order, page, price, query, rating])

  const [categories, setCategories] = useState([])
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`)
        setCategories(data)
      } catch (err) {
        toast.error(getError(err))
      }
    }
    fetchCategories()
  }, [dispatch])

  const getFilterUrl = (filter: any) => {
    const filterPage = filter.page || page
    const filterCategory = filter.category || category
    const filterQuery = filter.query || query
    const filterRating = filter.rating || rating
    const filterPrice = filter.price || price
    const filterOrder = filter.order || order
    return `/search?page=${filterPage}&query=${filterQuery}&category=${filterCategory}&price=${filterPrice}&rating=${filterRating}&order=${filterOrder}`
  }

  return (
    <div>
      <Helmet>
        <title>Search Products</title>
      </Helmet>

      <div className="grid grid-cols-4">
        <h3>Department</h3>
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  )
}

export default SearchPage
